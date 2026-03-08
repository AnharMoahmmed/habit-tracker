import React from 'react';
import type { Habit } from '../types';
import { HabitItem } from './HabitItem';

interface Props {
  title: string;
  habits: Habit[];
  toggleHabit: (id: string) => void;
  togglePin: (id: string) => void;
  emptyMessage?: string;
}

export const HabitList: React.FC<Props> = ({ title, habits, toggleHabit, togglePin, emptyMessage = "No habits here!" }) => {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>
      {habits.length === 0 ? (
        <div className="text-center py-6 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} toggleHabit={toggleHabit} togglePin={togglePin} />
          ))}
        </div>
      )}
    </section>
  );
};