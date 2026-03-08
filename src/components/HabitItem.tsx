import React from 'react';
import type { Habit } from '../types';
import { calculateStreak, isCompletedToday } from '../utils/dateUtils';
import { CheckCircle2, Circle, Flame, Pin } from 'lucide-react';

interface Props {
  habit: Habit;
  toggleHabit: (id: string) => void;
  togglePin: (id: string) => void;
}

export const HabitItem: React.FC<Props> = ({ habit, toggleHabit, togglePin }) => {
  const completedToday = isCompletedToday(habit.completedDates);
  const streak = calculateStreak(habit.completedDates);

  return (
    <div className={`p-4 rounded-xl border transition-all flex items-center justify-between ${completedToday ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
      <div className="flex items-center gap-3">
        <button onClick={() => toggleHabit(habit.id)} className="transition-transform active:scale-90">
          {completedToday ? <CheckCircle2 size={26} className="text-green-500" /> : <Circle size={26} className="text-gray-300 hover:text-blue-500" />}
        </button>
        <span className={`font-medium ${completedToday ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
          {habit.name}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-sm text-gray-500" title="Current Streak">
          <Flame size={16} className={streak > 0 ? "text-orange-500" : ""} />
          {streak}
        </div>
        <button onClick={() => togglePin(habit.id)} className="ml-2 outline-none">
          <Pin size={18} className={habit.isPinned ? "text-blue-600 fill-blue-600" : "text-gray-300 hover:text-gray-500"} />
        </button>
      </div>
    </div>
  );
};