import React from 'react';
import type { Habit } from '../types';
import { format } from 'date-fns';
import { Edit2, Trash2, Power } from 'lucide-react';
import { calculateStreak } from '../utils/dateUtils';

interface Props {
  habits: Habit[];
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}

export const HabitTable: React.FC<Props> = ({ habits, onEdit, onDelete, onToggleActive }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hidden md:block">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
          <tr>
            <th className="p-4 font-medium">Habit Name</th>
            <th className="p-4 font-medium">Created Date</th>
            <th className="p-4 font-medium">Streak</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {habits.map((habit) => (
            <tr key={habit.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium text-gray-800">{habit.name}</td>
              <td className="p-4 text-gray-500 text-sm">{format(new Date(habit.createdAt), 'MMM d, yyyy')}</td>
              <td className="p-4 text-gray-500 text-sm">{calculateStreak(habit.completedDates)} days</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${habit.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {habit.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-4 flex justify-end gap-2">
                <button onClick={() => onToggleActive(habit.id)} className="p-2 text-gray-400 hover:text-blue-600 transition" title={habit.isActive ? "Deactivate" : "Activate"}>
                  <Power size={18} className={habit.isActive ? "" : "text-gray-300"} />
                </button>
                <button onClick={() => onEdit(habit)} className="p-2 text-gray-400 hover:text-blue-600 transition" title="Edit">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => onDelete(habit.id)} className="p-2 text-gray-400 hover:text-red-600 transition" title="Delete">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};