import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Habits } from './pages/Habits';
import { Statistics } from './pages/Statistics';
import { Settings } from './pages/Settings'; // <-- NEW IMPORT
import { LayoutDashboard, CheckCircle, ListChecks, BarChart2, Settings as SettingsIcon } from 'lucide-react'; // <-- NEW ICON
import { useSettings } from './hooks/useSettings'; // <-- NEW IMPORT
import { useHabits } from './hooks/useHabits';
import { useReminders } from './hooks/useReminders';


function App() {
  // Call useSettings here so the theme effect runs at the app's root!
  useSettings();

  // NEW: Grab habits and start the reminder engine!
  const { habits } = useHabits();
  useReminders(habits);


  return (
    <BrowserRouter>
      {/* Added dark:bg-slate-900 to support dark mode on the background */}
      <div className="flex h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-200 font-sans overflow-hidden">
        
        {/* Persistent Sidebar */}
        <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 p-6 flex flex-col hidden md:flex transition-colors">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-2xl mb-10">
            <CheckCircle size={28} />
            <span>HabitFlow</span>
          </div>
          
          <nav className="space-y-2 flex-1 flex flex-col">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
            >
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
            
            <NavLink 
              to="/habits" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
            >
              <ListChecks size={20} /> Manage Habits
            </NavLink>

            <NavLink 
              to="/statistics" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
            >
              <BarChart2 size={20} /> Statistics
            </NavLink>

            {/* Spacer to push Settings to bottom */}
            <div className="flex-1"></div>

            {/* NEW SETTINGS LINK */}
            <NavLink 
              to="/settings" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
            >
              <SettingsIcon size={20} /> Settings
            </NavLink>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/statistics" element={<Statistics />} />
            {/* NEW SETTINGS ROUTE */}
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;