import { useState, useEffect } from 'react';
import type { UserSettings } from '../types';

const defaultSettings: UserSettings = {
  theme: 'system',
  notificationsEnabled: false,
  reminderTime: '09:00',
  language: 'en',
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('user-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // Save settings whenever they change
  useEffect(() => {
    localStorage.setItem('user-settings', JSON.stringify(settings));
  }, [settings]);

  // Apply Dark Mode to the HTML document
  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (theme: 'light' | 'dark' | 'system') => {
      root.classList.remove('light', 'dark');
      
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    };

    applyTheme(settings.theme);
  }, [settings.theme]);

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return { settings, updateSetting };
}