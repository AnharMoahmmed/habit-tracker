import React from 'react';
import type { Habit } from '../types';
import { format, subDays } from 'date-fns';

interface Props {
  habits: Habit[];
}

export const ProgressChart: React.FC<Props> = ({ habits }) => {
  // Generate the last 7 days
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = subDays(new Date(), 6 - i);
    return format(d, 'yyyy-MM-dd');
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h3 className="text-gray-800 font-bold mb-4">Weekly Progress</h3>
      <div className="flex justify-between items-end h-24 gap-2">
        {last7Days.map((date, index) => {
          // Count how many habits were completed on this specific day
          const completedCount = habits.filter(h => h.completedDates.includes(date)).length;
          const totalHabits = habits.length;
          const heightPercent = totalHabits === 0 ? 0 : (completedCount / totalHabits) * 100;

          return (
            <div key={date} className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full bg-blue-100 rounded-t-md h-full flex items-end overflow-hidden">
                <div 
                  className="w-full bg-blue-500 transition-all duration-500" 
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {format(new Date(date), 'EEEEE')} {/* e.g., M, T, W */}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};