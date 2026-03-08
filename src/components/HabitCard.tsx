import React from 'react';
import type { Habit } from '../types';
import { Edit2, Trash2, Power } from 'lucide-react';

interface Props {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}

export const HabitCard: React.FC<Props> = ({ habit, onEdit, onDelete, onToggleActive }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm md:hidden mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-800">{habit.name}</h3>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${habit.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {habit.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 mt-2">
        <button onClick={() => onToggleActive(habit.id)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
          <Power size={16} /> {habit.isActive ? 'Deactivate' : 'Activate'}
        </button>
        <button onClick={() => onEdit(habit)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
          <Edit2 size={16} /> Edit
        </button>
        <button onClick={() => onDelete(habit.id)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600">
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
};