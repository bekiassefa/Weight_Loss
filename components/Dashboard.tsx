
import React, { useState } from 'react';
import { Language, UserProfile, Page, DayOfWeek } from '../types';
import { TRANSLATIONS, DAYS_OF_WEEK } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getHealthAdvice } from '../services/geminiService';
import { Button } from './Button';
import { Sparkles, Plus, Save, TrendingDown, TrendingUp, Minus, Target, Flag, ChevronRight } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  language: Language;
  onNavigate: (page: Page) => void;
  completedMealsCount: number;
  completedExercisesCount: number;
  currentDay: DayOfWeek;
  onLogWeight: (weight: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  user, language, onNavigate, completedMealsCount, completedExercisesCount, currentDay, onLogWeight 
}) => {
  const t = TRANSLATIONS[language];
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [newWeight, setNewWeight] = useState(user.weight.toString());

  const currentDayLabel = language === Language.ENGLISH 
    ? DAYS_OF_WEEK.find(d => d.key === currentDay)?.labelEn 
    : DAYS_OF_WEEK.find(d => d.key === currentDay)?.labelAm;

  const heightM = user.height / 100;
  const bmi = (user.weight / (heightM * heightM)).toFixed(1);

  // Weight History Logic
  const sortedHistory = [...(user.weightHistory || [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Use the static startWeight from profile
  const startWeight = user.startWeight;
  
  // Progress Calculation
  const totalToLose = startWeight - user.targetWeight;
  const lostSoFar = startWeight - user.weight;
  
  // Progress is 0 if no weight lost or gained, caps at 100. Handles weight gain gracefully.
  let progressPercent = 0;
  if (totalToLose > 0) {
      progressPercent = (lostSoFar / totalToLose) * 100;
  }
  // Clamp between 0 and 100 for the visual bar
  const visualProgress = Math.min(100, Math.max(0, progressPercent));
  
  const isOnTrack = user.weight < startWeight;

  // Prepare chart data (Last 7 entries)
  const chartData = sortedHistory.slice(-7).map(entry => {
    const dateObj = new Date(entry.date);
    const label = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
    return { name: label, weight: entry.weight };
  });

  if (chartData.length === 0) {
    chartData.push({ name: 'Start', weight: user.weight });
  }

  const mealProgress = Math.min(100, (completedMealsCount / 3) * 100);
  const exerciseProgress = Math.min(100, (completedExercisesCount / 30) * 100);

  const handleAskAi = async () => {
    if (!aiQuery.trim()) return;
    setLoadingAi(true);
    setAiResponse('');
    try {
      const context = `User is ${user.age} years old female, ${user.weight}kg, ${user.height}cm tall. Goal: ${user.targetWeight}kg.`;
      const response = await getHealthAdvice(aiQuery, language, context);
      setAiResponse(response);
    } finally {
      setLoadingAi(false);
    }
  };

  const saveWeight = () => {
    const w = parseFloat(newWeight);
    if (!isNaN(w) && w > 0) {
      onLogWeight(w);
      setShowWeightInput(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* 1. Header & Welcome */}
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800">{t.welcome}, {user.name.split(' ')[0]}</h2>
          <p className="text-gray-500 text-sm font-medium">{t.subtitle}</p>
        </div>
        <div className="bg-white border border-pink-100 shadow-sm px-4 py-2 rounded-2xl text-center min-w-[80px]">
           <span className="block text-xs text-gray-400 font-bold uppercase">{t.day}</span>
           <span className="block text-lg font-bold text-primary">{currentDayLabel}</span>
        </div>
      </div>

      {/* 2. Weight Journey Infographic Card */}
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-6 text-white shadow-xl shadow-pink-200 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-10 -mb-10 blur-xl"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-pink-100 text-xs font-bold tracking-wider uppercase mb-1">{t.totalLoss}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight">
                  {lostSoFar > 0 ? '-' : lostSoFar < 0 ? '+' : ''}{Math.abs(lostSoFar).toFixed(1)}
                </span>
                <span className="text-lg font-medium opacity-90">kg</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/30 flex items-center gap-2">
               {isOnTrack ? <TrendingDown size={16} className="text-white" /> : <TrendingUp size={16} className="text-white" />}
               <span className="text-xs font-bold">{isOnTrack ? t.onTrack : t.offTrack}</span>
            </div>
          </div>

          {/* Timeline Infographic */}
          <div className="relative pt-2 pb-4">
             {/* Labels */}
             <div className="flex justify-between text-xs font-medium text-pink-100 mb-2">
                <span>{t.startingWeight}</span>
                <span>{t.targetWeight}</span>
             </div>
             
             {/* The Track */}
             <div className="h-3 bg-black/20 rounded-full w-full relative">
                {/* The Progress Fill */}
                <div 
                  className="absolute top-0 left-0 h-full bg-white/90 rounded-full shadow-lg transition-all duration-1000 ease-out"
                  style={{ width: `${visualProgress}%` }}
                ></div>
                
                {/* Points on the track */}
                {/* Start Point */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-pink-200 rounded-full"></div>
                {/* End Point */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-pink-200 rounded-full"></div>

                {/* The Current Indicator (Bubble) */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-pink-500 shadow-lg flex items-center justify-center transition-all duration-1000 ease-out z-10"
                  style={{ left: `${visualProgress}%`, transform: 'translate(-50%, -50%)' }}
                >
                   <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping absolute opacity-75"></div>
                   <div className="w-2.5 h-2.5 bg-pink-600 rounded-full relative"></div>
                </div>
             </div>

             {/* Values below track */}
             <div className="flex justify-between mt-2">
                <div className="text-sm font-bold">{startWeight}kg</div>
                <div className="text-sm font-bold opacity-75">{user.weight}kg Now</div>
                <div className="text-sm font-bold">{user.targetWeight}kg</div>
             </div>
          </div>
        </div>
      </div>

      {/* 3. Action Buttons & Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        {/* Diet Status */}
        <div 
          onClick={() => onNavigate(Page.DIET)}
          className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 cursor-pointer group hover:border-teal-200 transition-all"
        >
          <div className="flex justify-between items-start">
             <div className="bg-teal-50 p-2.5 rounded-full text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
               <Target size={20} />
             </div>
             <span className="text-xl font-bold text-gray-800">{Math.round(mealProgress)}%</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-700">{t.diet}</h4>
            <p className="text-xs text-gray-400">{completedMealsCount} / 3 {t.meals}</p>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
             <div className="h-full bg-teal-500 rounded-full" style={{width: `${mealProgress}%`}}></div>
          </div>
        </div>

        {/* Workout Status */}
        <div 
          onClick={() => onNavigate(Page.EXERCISE)}
          className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 cursor-pointer group hover:border-pink-200 transition-all"
        >
          <div className="flex justify-between items-start">
             <div className="bg-pink-50 p-2.5 rounded-full text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
               <Flag size={20} />
             </div>
             <span className="text-xl font-bold text-gray-800">{Math.round(exerciseProgress)}%</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-700">{t.exercise}</h4>
            <p className="text-xs text-gray-400">{completedExercisesCount} / 30 Days</p>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
             <div className="h-full bg-pink-500 rounded-full" style={{width: `${exerciseProgress}%`}}></div>
          </div>
        </div>
      </div>

      {/* 4. Chart & Log Section */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{t.weightTracker}</h3>
            <p className="text-xs text-gray-400">Last 7 Entries</p>
          </div>
          {!showWeightInput ? (
            <button 
              onClick={() => setShowWeightInput(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-gray-200 hover:bg-black transition-colors"
            >
              <Plus size={16} /> {t.logWeight}
            </button>
          ) : (
             <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
                <input 
                  type="number" 
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="w-20 px-3 py-2 text-sm border-2 border-pink-100 rounded-xl focus:outline-none focus:border-pink-500 font-bold text-gray-700 bg-pink-50/50"
                  placeholder="kg"
                  autoFocus
                />
                <button 
                  onClick={saveWeight}
                  className="bg-pink-500 text-white p-2.5 rounded-xl hover:bg-pink-600 shadow-md shadow-pink-200"
                >
                  <Save size={18} />
                </button>
             </div>
          )}
        </div>

        {/* Smooth Chart */}
        <div className="h-48 w-full -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 500}} 
                dy={10}
              />
              <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '8px 12px' }}
                itemStyle={{ color: '#ec4899', fontWeight: 'bold' }}
                cursor={{ stroke: '#ec4899', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area 
                type="monotone" 
                dataKey="weight" 
                stroke="#ec4899" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorWeight)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Micro History Timeline */}
        <div className="mt-6 border-t border-gray-100 pt-4">
           <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t.history}</span>
              <ChevronRight size={14} className="text-gray-300" />
           </div>
           <div className="space-y-3">
             {sortedHistory.slice(-3).reverse().map((entry, idx, arr) => {
               let prevWeight = entry.weight;
               if (idx < arr.length - 1) {
                  prevWeight = arr[idx + 1].weight;
               } else {
                  const fullIndex = sortedHistory.findIndex(h => h.date === entry.date);
                  if (fullIndex > 0) prevWeight = sortedHistory[fullIndex - 1].weight;
               }
               const diff = entry.weight - prevWeight;
               const isLoss = diff < 0;

               return (
                 <div key={entry.date} className="flex justify-between items-center group">
                   <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${isLoss ? 'bg-green-400' : diff > 0 ? 'bg-red-400' : 'bg-gray-300'}`}></div>
                      <span className="text-sm font-medium text-gray-600">{entry.date}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-800">{entry.weight} kg</span>
                      <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                        isLoss ? 'bg-green-100 text-green-700' : diff > 0 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                         {diff === 0 ? '-' : `${diff > 0 ? '+' : ''}${diff.toFixed(1)}`}
                      </span>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>
      </div>

      {/* 5. AI Coach - Chat Bubble Style */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-1 rounded-3xl shadow-lg shadow-purple-200">
        <div className="bg-white rounded-[20px] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-xl text-purple-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{t.aiCoach}</h3>
              <p className="text-xs text-gray-400">Powered by Gemini AI</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {aiResponse ? (
               <div className="bg-purple-50 p-4 rounded-2xl rounded-tl-none text-sm text-gray-700 leading-relaxed animate-in fade-in slide-in-from-left-2">
                  {aiResponse}
               </div>
            ) : (
               <div className="text-sm text-gray-400 italic pl-2">
                  "How many calories in Doro Wat?"
               </div>
            )}
            
            <div className="flex gap-2 relative">
              <input 
                type="text" 
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder={t.askAiPlaceholder}
                className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all pl-4 pr-12"
              />
              <button 
                onClick={handleAskAi} 
                disabled={loadingAi}
                className="absolute right-1 top-1 bottom-1 bg-purple-600 text-white rounded-xl w-10 flex items-center justify-center hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                 {loadingAi ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Sparkles size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
