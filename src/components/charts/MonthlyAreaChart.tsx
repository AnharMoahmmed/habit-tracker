import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: { date: string; completed: number }[];
}

export const MonthlyAreaChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-80">
      <h3 className="text-lg font-bold text-gray-800 mb-6">30-Day Activity Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} minTickGap={20} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} allowDecimals={false} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};