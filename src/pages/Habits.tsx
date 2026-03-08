import React, { useState } from 'react';
import { useHabits } from '../hooks/useHabits';
import type { Habit } from '../types';
import { Plus } from 'lucide-react';
import { HabitTable } from '../components/HabitTable';
import { HabitCard } from '../components/HabitCard';
import { HabitForm } from '../components/HabitForm';

export const Habits: React.FC = () => {
  const { habits, addHabit, editHabit, deleteHabit, toggleActive } = useHabits();
  
  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const handleOpenCreate = () => {
    setEditingHabit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsFormOpen(true);
  };

  const handleSubmit = (name: string) => {
    if (editingHabit) {
      editHabit(editingHabit.id, name);
    } else {
      addHabit(name);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Habits</h1>
          <p className="text-gray-500 mt-1">Create, edit, or remove your habits here.</p>
        </div>
        
        <button onClick={handleOpenCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition shadow-sm w-full md:w-auto justify-center">
          <Plus size={20} /> Create Habit
        </button>
      </header>

      {habits.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <h3 className="text-lg font-bold text-gray-700 mb-2">No habits found</h3>
          <p className="text-gray-500 mb-6">You haven't created any habits yet.</p>
          <button onClick={handleOpenCreate} className="text-blue-600 font-medium hover:underline">
            + Create your first habit
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <HabitTable 
            habits={habits} 
            onEdit={handleOpenEdit} 
            onDelete={deleteHabit} 
            onToggleActive={toggleActive} 
          />

          {/* Mobile Card View */}
          <div>
            {habits.map(habit => (
              <HabitCard 
                key={habit.id} 
                habit={habit} 
                onEdit={handleOpenEdit} 
                onDelete={deleteHabit} 
                onToggleActive={toggleActive} 
              />
            ))}
          </div>
        </>
      )}

      {/* Shared Create/Edit Modal */}
      <HabitForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleSubmit} 
        initialName={editingHabit?.name}
        title={editingHabit ? "Edit Habit" : "Create New Habit"}
      />
    </div>
  );
};