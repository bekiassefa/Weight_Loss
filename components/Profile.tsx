
import React, { useState } from 'react';
import { Language, UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';
import { Settings, FileText, ClipboardList, ChevronLeft, TrendingUp, TrendingDown, Activity, Utensils, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ProfileProps {
  user: UserProfile;
  language: Language;
}

export const Profile: React.FC<ProfileProps> = ({ user, language }) => {
  const t = TRANSLATIONS[language];
  const [view, setView] = useState<'overview' | 'report'>('overview');
  
  // State for BMI Calculator
  const [weight, setWeight] = useState(user.weight.toString());
  const [height, setHeight] = useState(user.height.toString());

  // --- BMI Logic ---
  const hM = parseFloat(height) / 100;
  const wKg = parseFloat(weight);
  let bmiVal = 0;
  if (hM > 0 && wKg > 0) {
    bmiVal = wKg / (hM * hM);
  }
  const bmi = bmiVal.toFixed(1);

  let category = '';
  let colorClass = '';
  if (bmiVal < 18.5) {
    category = t.underweight;
    colorClass = 'text-yellow-500'; 
  } else if (bmiVal < 25) {
    category = t.healthy;
    colorClass = 'text-green-500';
  } else if (bmiVal < 30) {
    category = t.overweight;
    colorClass = 'text-yellow-600';
  } else {
    category = t.obese;
    colorClass = 'text-red-500';
  }

  const minIdeal = (18.5 * hM * hM).toFixed(1);
  const maxIdeal = (24.9 * hM * hM).toFixed(1);
  const position = Math.max(0, Math.min(100, ((bmiVal - 10) / 30) * 100));

  // --- Report Logic ---
  const renderReport = () => {
    // 1. Calculate Date Range (Last 7 Days)
    const today = new Date();
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      last7Days.push(d.toISOString().split('T')[0]);
    }

    // 2. Aggregate Stats
    let dietSuccessCount = 0;
    let workoutSuccessCount = 0;
    
    last7Days.forEach(date => {
      const dayData = user.dailyHistory[date];
      if (dayData?.diet) dietSuccessCount++;
      if (dayData?.workout) workoutSuccessCount++;
    });

    const dietPercent = Math.round((dietSuccessCount / 7) * 100);
    const workoutPercent = Math.round((workoutSuccessCount / 7) * 100);
    
    // 3. Weight Stats
    const totalLoss = user.startWeight - user.weight;
    const totalLossPercent = ((totalLoss / user.startWeight) * 100).toFixed(1);
    const isLoss = totalLoss > 0;

    // 4. Refinement Logic (Simple AI)
    let refinementTitle = "";
    let refinementText = "";
    
    // Helper to get advice based on conditions
    if (dietPercent < 50 && workoutPercent < 50) {
      if (language === Language.AMHARIC) {
        refinementTitle = "እንደገና እንጀምር";
        refinementText = "ይህ ሳምንት ከባድ ነበር። ለሚቀጥለው ሳምንት በቀን 3 ሊትር ውሃ መጠጣት እና ጤናማ ቁርስ መብላት ላይ ብቻ ያተኩሩ።";
      } else {
        refinementTitle = "Reset & Restart";
        refinementText = "It looks like a tough week. For next week, focus solely on drinking 3L of water and eating a healthy breakfast. Ignore the rest until you build momentum.";
      }
    } else if (dietPercent < 60) {
      if (language === Language.AMHARIC) {
        refinementTitle = "አመጋገብ ላይ ትኩረት";
        refinementText = "ስፖርትዎ ጥሩ ነው፤ ነገር ግን አመጋገብዎ ክፍተት አለው። በሚቀጥለው ሳምንት ምግቦን ቀድመው ያዘጋጁ።";
      } else {
        refinementTitle = "Kitchen Focus Needed";
        refinementText = "Your workouts are good, but the diet is slipping. Next week, try meal prepping on Sunday so you don't have to make decisions when you are hungry.";
      }
    } else if (workoutPercent < 60) {
      if (language === Language.AMHARIC) {
        refinementTitle = "እንቅስቃሴ ይጨምሩ";
        refinementText = "አመጋገብዎ በጣም ጥሩ ነው! እንቅስቃሴ ስለሌለ ግን ክብደትዎ አልቀነሰም። በሚቀጥለው ሳምንት በቀን 15 ደቂቃ ለመራመድ ይሞክሩ።";
      } else {
        refinementTitle = "Move More";
        refinementText = "Your nutrition is on point! The weight isn't moving because movement is low. Commit to just 15 minutes of walking daily next week.";
      }
    } else {
      if (language === Language.AMHARIC) {
        refinementTitle = "በጣም ጎበዝ!";
        refinementText = "በጣም ውጤታማ ሳምንት ነበር። በሚቀጥለው ሳምንት የስፖርት ክብደት ይጨምሩ ወይም የመመገቢያ ሰዓትን በ 1 ሰዓት ይቀንሱ።";
      } else {
        refinementTitle = "Level Up";
        refinementText = "Incredible week! You are crushing it. Next week, try adding 1kg weights to your workout or reducing your eating window by 1 hour.";
      }
    }

    const chartData = (user.weightHistory || []).slice(-7).map(h => ({
      day: h.date.slice(5),
      weight: h.weight
    }));

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setView('overview')} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-primary">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-gray-800">{t.report.title}</h2>
        </div>

        {/* Weight Analysis Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
           <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-4">{t.report.analysisTitle}</h3>
           <div className="flex items-end gap-4 mb-4">
              <div>
                <span className={`text-4xl font-extrabold ${isLoss ? 'text-green-500' : 'text-gray-800'}`}>
                  {isLoss ? '-' : '+'}{Math.abs(Number(totalLossPercent))}%
                </span>
                <p className="text-xs text-gray-400 font-medium mt-1">{t.report.totalWeight}</p>
              </div>
              <div className="flex-1 h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorW" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip cursor={false} content={<></>} />
                    <Area type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorW)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>
           <div className="p-3 bg-gray-50 rounded-xl flex items-start gap-3">
              {isLoss ? <TrendingDown className="text-green-500 shrink-0" /> : <TrendingUp className="text-red-500 shrink-0" />}
              <p className="text-sm text-gray-600">
                {t.report.startMessage} <span className="font-bold">{user.startWeight}kg</span>. 
                {isLoss ? ` ${t.report.trendGood}` : ` ${t.report.trendBad}`}
              </p>
           </div>
        </div>

        {/* Success vs Failure Stats */}
        <div className="grid grid-cols-2 gap-4">
          {/* Diet Card */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 opacity-10">
               <Utensils size={40} />
             </div>
             <p className="text-xs text-gray-400 font-bold uppercase mb-2">{t.report.dietTitle}</p>
             <div className="flex items-baseline gap-1 mb-2">
               <span className="text-2xl font-bold text-gray-800">{dietPercent}%</span>
               <span className="text-xs text-gray-500">{t.report.success}</span>
             </div>
             <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
               <div className={`h-full rounded-full ${dietPercent > 70 ? 'bg-teal-500' : 'bg-yellow-500'}`} style={{width: `${dietPercent}%`}}></div>
             </div>
             <div className="mt-3 text-xs text-gray-500">
               {7 - dietSuccessCount} {t.report.missedMeals}
             </div>
          </div>

          {/* Workout Card */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 opacity-10">
               <Activity size={40} />
             </div>
             <p className="text-xs text-gray-400 font-bold uppercase mb-2">{t.report.workoutTitle}</p>
             <div className="flex items-baseline gap-1 mb-2">
               <span className="text-2xl font-bold text-gray-800">{workoutPercent}%</span>
               <span className="text-xs text-gray-500">{t.report.success}</span>
             </div>
             <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
               <div className={`h-full rounded-full ${workoutPercent > 70 ? 'bg-pink-500' : 'bg-yellow-500'}`} style={{width: `${workoutPercent}%`}}></div>
             </div>
             <div className="mt-3 text-xs text-gray-500">
               {7 - workoutSuccessCount} {t.report.missedWorkouts}
             </div>
          </div>
        </div>

        {/* Refinement Section */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
           <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                 <ClipboardList size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-lg">{t.report.refinementTitle}</h3>
           </div>
           
           <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10 mb-2">
              <h4 className="font-bold text-indigo-100 mb-1 flex items-center gap-2">
                {dietPercent < 50 || workoutPercent < 50 ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                {refinementTitle}
              </h4>
              <p className="text-sm text-indigo-50 leading-relaxed opacity-90">
                {refinementText}
              </p>
           </div>
        </div>
      </div>
    );
  };

  if (view === 'report') {
    return (
      <div className="p-4">
        {renderReport()}
      </div>
    );
  }

  // --- Overview View ---
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-3xl">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.age} Years Old</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">{t.bmi} Calculator</h3>
        
        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Weight (kg)</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Height (cm)</label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* BMI Result Display */}
        <div className="bg-soft p-4 rounded-xl text-center mb-6">
           <span className="text-sm text-gray-600 block mb-1">Your BMI is</span>
           <div className={`text-4xl font-extrabold ${colorClass} mb-1`}>{bmi}</div>
           <span className={`text-sm font-bold ${colorClass} uppercase tracking-wide`}>
             {category}
           </span>
        </div>

        {/* Visual Gauge */}
        <div className="relative mb-6">
          <div className="h-3 w-full rounded-full flex overflow-hidden">
             <div className="w-[28%] bg-yellow-400 h-full"></div>
             <div className="w-[22%] bg-green-500 h-full"></div>
             <div className="w-[17%] bg-yellow-500 h-full"></div>
             <div className="w-[33%] bg-red-500 h-full"></div>
          </div>
          <div 
            className="absolute -top-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-gray-800 transition-all duration-500"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          ></div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
            <span>10</span><span className="pl-4">18.5</span><span className="pl-2">25</span><span className="pl-2">30</span><span>40</span>
          </div>
        </div>

        <div className="border border-green-200 bg-green-50 rounded-lg p-3 flex justify-between items-center">
           <span className="text-sm font-medium text-green-800">{t.idealWeight}</span>
           <span className="text-lg font-bold text-green-700">{minIdeal} - {maxIdeal} kg</span>
        </div>
      </div>

      <div className="space-y-2">
        {/* NEW: Report Button */}
        <button 
          onClick={() => setView('report')}
          className="w-full p-4 bg-white rounded-xl flex items-center justify-between shadow-sm border border-gray-100 hover:bg-gray-50 group"
        >
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-50 text-blue-500 rounded-lg group-hover:bg-blue-100 transition-colors">
                <ClipboardList size={20} />
             </div>
             <div className="text-left">
               <span className="font-bold text-gray-700 block">{t.report.title}</span>
               <span className="text-xs text-gray-400">{t.report.subtitle}</span>
             </div>
          </div>
          <ChevronLeft className="rotate-180 text-gray-300" size={20} />
        </button>

        <button className="w-full p-4 bg-white rounded-xl flex items-center justify-between shadow-sm border border-gray-100 hover:bg-gray-50 group">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-pink-50 text-pink-500 rounded-lg group-hover:bg-pink-100 transition-colors">
                <FileText size={20} />
             </div>
             <span className="font-medium text-gray-700">Download Guidelines</span>
          </div>
        </button>

        <button className="w-full p-4 bg-white rounded-xl flex items-center justify-between shadow-sm border border-gray-100 hover:bg-gray-50 group">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-gray-50 text-gray-500 rounded-lg group-hover:bg-gray-200 transition-colors">
                <Settings size={20} />
             </div>
             <span className="font-medium text-gray-700">Settings</span>
          </div>
        </button>
      </div>
    </div>
  );
};
