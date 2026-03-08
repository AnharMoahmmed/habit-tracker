import React from 'react';
import { useHabits } from '../hooks/useHabits';
import { calculateStreak, calculateCompletionRate, generateChartData } from '../utils/dateUtils';
import { WeeklyBarChart } from '../components/charts/WeeklyBarChart';
import { MonthlyAreaChart } from '../components/charts/MonthlyAreaChart';
import { Activity, Target, Trophy, TrendingUp } from 'lucide-react';

export const Statistics: React.FC = () => {
  const { habits } = useHabits();

  // Generate Data for Charts
  const weeklyData = generateChartData(habits, 7);
  const monthlyData = generateChartData(habits, 30);

  // Calculate Overall Statistics
  const totalCompletions = habits.reduce((sum, habit) => sum + habit.completedDates.length, 0);
  
  const activeHabits = habits.filter(h => h.isActive);
  const avgCompletionRate = activeHabits.length > 0 
    ? Math.round(activeHabits.reduce((sum, h) => sum + calculateCompletionRate(h.completedDates, h.createdAt), 0) / activeHabits.length)
    : 0;

  const bestOverallStreak = habits.length > 0 
    ? Math.max(...habits.map(h => calculateStreak(h.completedDates))) 
    : 0;

  // Top Habits by Streak
  const topHabits = [...habits]
    .map(h => ({ ...h, streak: calculateStreak(h.completedDates) }))
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 3); // Top 3

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Progress</h1>
        <p className="text-gray-500 mt-1">Track your consistency over time.</p>
      </header>

      {habits.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <Activity size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-700">Not enough data</h3>
          <p className="text-gray-500">Create and complete habits to see your statistics.</p>
        </div>
      ) : (
        <>
          {/* Overview Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-4 bg-purple-100 text-purple-600 rounded-xl"><Target size={28}/></div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Avg. Completion Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">{avgCompletionRate}%</h3>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-xl"><Activity size={28}/></div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Completions</p>
                <h3 className="text-2xl font-bold text-gray-900">{totalCompletions}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-4 bg-orange-100 text-orange-600 rounded-xl"><Trophy size={28}/></div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Best Overall Streak</p>
                <h3 className="text-2xl font-bold text-gray-900">{bestOverallStreak} <span className="text-sm font-normal text-gray-500">days</span></h3>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <WeeklyBarChart data={weeklyData} />
            <MonthlyAreaChart data={monthlyData} />
          </div>

          {/* Top Streaks Leaderboard */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-green-500" /> Streak Leaderboard
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topHabits.map((habit, index) => (
                <div key={habit.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-bold">#{index + 1}</span>
                    <span className="font-medium text-gray-800 truncate max-w-[120px]" title={habit.name}>{habit.name}</span>
                  </div>
                  <div className="font-bold text-orange-500">{habit.streak} 🔥</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};