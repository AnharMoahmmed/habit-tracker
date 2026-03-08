import React from 'react';
import { Flame } from 'lucide-react';

interface Props {
  bestStreak: number;
}

export const StreakCard: React.FC<Props> = ({ bestStreak }) => {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-2xl shadow-sm text-white flex items-center justify-between">
      <div>
        <p className="text-white/80 text-sm font-medium mb-1">Longest Streak</p>
        <h3 className="text-3xl font-bold">{bestStreak} <span className="text-lg font-normal opacity-80">days</span></h3>
      </div>
      <div className="p-4 bg-white/20 rounded-full">
        <Flame size={32} className="text-white" />
      </div>
    </div>
  );
};