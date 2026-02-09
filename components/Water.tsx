
import React, { useEffect, useState } from 'react';
import { Language, UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';
import { Bell, BellOff, Droplets, Check, Info } from 'lucide-react';
import { Button } from './Button';

interface WaterProps {
  user: UserProfile;
  language: Language;
  onToggleWater: (hour: number) => void;
  currentHour: number;
}

// Ethiopian time conversion helpers
const getEthiopianTime = (hour: number) => {
  // 8:00 (International) -> 2:00 (Ethiopian Morning)
  // 19:00 (International) -> 1:00 (Ethiopian Evening)
  let ethiopianHour = hour - 6;
  if (ethiopianHour <= 0) ethiopianHour += 12;
  if (ethiopianHour > 12) ethiopianHour -= 12;
  return ethiopianHour;
};

const getPeriod = (hour: number, language: Language) => {
  const t = TRANSLATIONS[language];
  if (hour < 12) return t.morning;
  if (hour < 17) return t.afternoon;
  return t.evening;
};

export const Water: React.FC<WaterProps> = ({ user, language, onToggleWater, currentHour }) => {
  const t = TRANSLATIONS[language];
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  
  // Hours to track: 8 AM to 7 PM (International)
  const schedule = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const today = new Date().toISOString().split('T')[0];
  const completedHours = new Set(user.waterLog[today] || []);
  
  const progress = Math.round((completedHours.size / schedule.length) * 100);

  const requestNotification = () => {
    Notification.requestPermission().then((permission) => {
      setNotificationPermission(permission);
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{t.water}</h2>
        <button 
          onClick={requestNotification}
          className={`p-2 rounded-full transition-colors ${
            notificationPermission === 'granted' 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {notificationPermission === 'granted' ? <Bell size={20} /> : <BellOff size={20} />}
        </button>
      </div>

      {/* Main Progress Card */}
      <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
        {/* Background Bubbles Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-5 -mb-5 blur-xl"></div>

        <div className="flex flex-col items-center justify-center relative z-10">
           {/* Circular Progress */}
           <div className="relative w-40 h-40 mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="transparent" />
                <circle 
                  cx="80" cy="80" r="70" 
                  stroke="white" 
                  strokeWidth="12" 
                  fill="transparent" 
                  strokeDasharray={440} 
                  strokeDashoffset={440 - (440 * progress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{completedHours.size}</span>
                <span className="text-sm opacity-80">/ {schedule.length}</span>
                <span className="text-xs font-medium uppercase mt-1">{t.glass}</span>
              </div>
           </div>

           <p className="text-center font-medium opacity-90">
             {progress === 100 ? "🎉 Daily Goal Reached!" : t.hydrationTips}
           </p>
        </div>
      </div>

      {/* Notification prompt if not enabled */}
      {notificationPermission !== 'granted' && (
        <div 
          onClick={requestNotification}
          className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center gap-3 cursor-pointer"
        >
          <Info className="text-blue-500" size={20} />
          <span className="text-sm text-blue-700 font-medium">{t.enableNotifs}</span>
        </div>
      )}

      {/* Hourly Schedule List */}
      <div className="space-y-3">
         <h3 className="font-bold text-gray-700">{t.dailyGoal}</h3>
         <div className="grid gap-3">
            {schedule.map((hour) => {
              const isCompleted = completedHours.has(hour);
              const isCurrent = hour === currentHour;
              const isPast = hour < currentHour;
              const ethiopianHour = getEthiopianTime(hour);
              const period = getPeriod(hour, language);

              return (
                <div 
                  key={hour}
                  onClick={() => onToggleWater(hour)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer active:scale-98 ${
                    isCompleted 
                      ? 'bg-blue-50 border-blue-200 shadow-inner' 
                      : isCurrent 
                        ? 'bg-white border-blue-400 shadow-md shadow-blue-100 ring-2 ring-blue-100'
                        : 'bg-white border-gray-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                       isCompleted ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-300'
                    }`}>
                       {isCompleted ? <Check size={20} /> : <Droplets size={20} />}
                    </div>
                    <div>
                       <h4 className={`text-lg font-bold ${isCompleted ? 'text-blue-800' : 'text-gray-700'}`}>
                         {ethiopianHour}:00 <span className="text-xs font-normal text-gray-400">{period}</span>
                       </h4>
                       {isCurrent && !isCompleted && (
                         <span className="text-xs text-blue-500 font-bold animate-pulse">
                           {t.reminderBody}
                         </span>
                       )}
                    </div>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                     isCompleted ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-200'
                  }`}>
                     {isCompleted && <Check size={14} />}
                  </div>
                </div>
              );
            })}
         </div>
      </div>
    </div>
  );
};
