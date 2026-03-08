import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { Moon, Sun, Monitor, Bell, Clock, Globe, BellOff } from 'lucide-react';
import { requestNotificationPermission } from '../utils/notifications';

export const Settings: React.FC = () => {
  const { settings, updateSetting } = useSettings();

  const handleNotificationToggle = async () => {
    const newValue = !settings.notificationsEnabled;
    if (newValue) {
      // If turning on, ask browser for permission
      await requestNotificationPermission();
      if (Notification.permission !== "granted") {
        alert("Please allow notifications in your browser settings to use this feature.");
        return;
      }
    }
    updateSetting('notificationsEnabled', newValue);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto w-full dark:text-gray-100 transition-colors duration-200">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your app preferences and notifications.</p>
      </header>

      <div className="space-y-8">
        
        {/* App Preferences Section */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm transition-colors">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-700 pb-4">
            App Preferences
          </h2>
          
          <div className="space-y-6">
            {/* Theme Selector */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Moon size={18} /> Theme
              </label>
              <div className="flex bg-gray-100 dark:bg-slate-900 p-1 rounded-lg w-fit">
                {(['light', 'dark', 'system'] as const).map((themeType) => (
                  <button
                    key={themeType}
                    onClick={() => updateSetting('theme', themeType)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium capitalize transition ${
                      settings.theme === themeType 
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    {themeType === 'light' && <Sun size={16} />}
                    {themeType === 'dark' && <Moon size={16} />}
                    {themeType === 'system' && <Monitor size={16} />}
                    {themeType}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Globe size={18} /> Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
                className="w-full max-w-xs px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white transition-colors"
              >
                <option value="en">English (US)</option>
                <option value="es">Español (ES)</option>
                <option value="fr">Français (FR)</option>
                <option value="de">Deutsch (DE)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm transition-colors">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-700 pb-4">
            Notifications
          </h2>

          <div className="space-y-6">
            {/* Enable Notifications Toggle */}
            <div className="flex items-center justify-between max-w-md">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${settings.notificationsEnabled ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' : 'bg-gray-100 text-gray-500 dark:bg-slate-700'}`}>
                  {settings.notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Daily Reminders</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications to complete your habits.</p>
                </div>
              </div>
              
              {/* Custom Toggle Switch */}
              <button 
                onClick={handleNotificationToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.notificationsEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            {/* Reminder Time */}
            <div className={`transition-opacity ${!settings.notificationsEnabled ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Clock size={18} /> Reminder Time
              </label>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={(e) => updateSetting('reminderTime', e.target.value)}
                disabled={!settings.notificationsEnabled}
                className="w-full max-w-xs px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white transition-colors"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                We'll remind you at {settings.reminderTime} every day.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};