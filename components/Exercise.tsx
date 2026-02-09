import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, THIRTY_DAY_PLAN } from '../constants';
import { PlayCircle, Clock, CheckCircle, Circle, ArrowLeft, ArrowRight, Zap, Coffee, Film, ExternalLink, Play } from 'lucide-react';
import { Button } from './Button';

interface ExerciseProps {
  language: Language;
  completedDays: Set<number>;
  onToggleDay: (day: number) => void;
}

export const ExercisePage: React.FC<ExerciseProps> = ({ language, completedDays, onToggleDay }) => {
  const t = TRANSLATIONS[language];
  // Default to the first uncompleted day, or day 1 if all are uncompleted, or last day if all completed
  const firstUncompleted = THIRTY_DAY_PLAN.find(d => !completedDays.has(d.day))?.day || 1;
  const [currentDay, setCurrentDay] = useState<number>(firstUncompleted);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const plan = THIRTY_DAY_PLAN.find(d => d.day === currentDay);
  
  // Reset video index and playing state when day changes
  useEffect(() => {
    setActiveVideoIndex(0);
    setIsPlaying(false);
  }, [currentDay]);

  if (!plan) return null;

  const isCompleted = completedDays.has(currentDay);
  const totalDays = THIRTY_DAY_PLAN.length;
  const completedCount = completedDays.size;
  const progressPercent = (completedCount / totalDays) * 100;
  const videoIds = plan.videoIds || [];
  const activeVideoId = videoIds[activeVideoIndex];

  const handlePrev = () => {
    if (currentDay > 1) setCurrentDay(currentDay - 1);
  };

  const handleNext = () => {
    if (currentDay < totalDays) setCurrentDay(currentDay + 1);
  };

  const handleVideoSelect = (index: number) => {
    setActiveVideoIndex(index);
    setIsPlaying(false);
  };

  const title = language === Language.AMHARIC ? plan.titleAm : plan.titleEn;
  const exercises = language === Language.AMHARIC ? plan.exercisesAm : plan.exercisesEn;
  const description = language === Language.AMHARIC ? plan.descriptionAm : plan.descriptionEn;
  
  // Construct Thumbnail URL
  const thumbnailUrl = activeVideoId 
    ? `https://img.youtube.com/vi/${activeVideoId}/hqdefault.jpg` 
    : null;

  // Safe Origin for Embed
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'http://localhost';

  return (
    <div className="p-4 space-y-6">
      {/* Header with Progress */}
      <div className="flex justify-between items-end">
         <div>
           <h2 className="text-2xl font-bold text-gray-800">30 Day Challenge</h2>
           <p className="text-sm text-gray-500">{t.day} {currentDay} / {totalDays}</p>
         </div>
         <div className="w-16 h-16 relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="#f3f4f6" strokeWidth="6" fill="transparent" />
              <circle 
                cx="32" cy="32" r="28" 
                stroke="#f43f5e" 
                strokeWidth="6" 
                fill="transparent" 
                strokeDasharray={175.9} 
                strokeDashoffset={175.9 - (progressPercent / 100) * 175.9}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-rose-600 font-bold text-xs">
              {Math.round(progressPercent)}%
            </div>
         </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Video Player Section */}
        {activeVideoId && !plan.isRest ? (
          <div className="relative pt-[56.25%] bg-black group">
            {!isPlaying ? (
              // Thumbnail Cover with Play Button
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center group overflow-hidden focus:outline-none"
              >
                <img 
                  src={thumbnailUrl || ''} 
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                
                <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border-2 border-white/60 shadow-xl group-hover:scale-110 group-hover:bg-rose-500 group-hover:border-rose-500 transition-all duration-300">
                   <Play className="fill-current w-6 h-6 ml-1" />
                </div>
              </button>
            ) : (
              // Actual Iframe (Loads only on click)
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1&origin=${origin}`}
                title={title}
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
          </div>
        ) : (
          <div className="bg-rose-50 h-48 flex flex-col items-center justify-center text-rose-300">
             {plan.isRest ? <Coffee size={64} /> : <Zap size={64} />}
             <span className="mt-2 text-sm font-medium">{plan.isRest ? t.restDay : "No Video"}</span>
          </div>
        )}

        {/* Fallback Link Bar (Always visible if video exists) */}
        {activeVideoId && !plan.isRest && (
           <div className="bg-rose-50 px-4 py-3 border-b border-rose-100 flex justify-between items-center">
              <span className="text-xs text-rose-800 font-medium">Video not playing?</span>
              <a 
                href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-white text-rose-600 px-3 py-1.5 rounded-full border border-rose-200 font-bold hover:bg-rose-100 flex items-center gap-1.5 shadow-sm transition-colors"
              >
                Open YouTube <ExternalLink size={12} />
              </a>
           </div>
        )}

        {/* Multi-video Selector */}
        {videoIds.length > 1 && (
           <div className="flex gap-2 p-3 bg-gray-50 overflow-x-auto no-scrollbar">
              {videoIds.map((vid, idx) => (
                <button
                  key={vid}
                  onClick={() => handleVideoSelect(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                    idx === activeVideoIndex 
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-200' 
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  <Film size={12} /> 
                  {idx === 0 ? t.video : `Short ${idx}`}
                </button>
              ))}
           </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
             <div>
               <div className="text-rose-500 text-xs font-bold uppercase tracking-wider mb-1">
                 {t.week} {plan.week} • {plan.isRest ? t.restDay : t.workouts}
               </div>
               <h3 className="text-2xl font-bold text-gray-800 leading-tight">{title}</h3>
             </div>
             {plan.duration > 0 && (
               <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600 flex items-center gap-1">
                 <Clock size={14} /> {plan.duration} {t.minutes}
               </div>
             )}
          </div>

          <div className="space-y-3 mb-8">
             {exercises.map((ex, i) => (
               <div key={i} className="flex items-start gap-3">
                  <div className="bg-rose-100 p-1 rounded-full mt-0.5 shrink-0">
                    <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-600 leading-snug">{ex}</span>
               </div>
             ))}
             {description && <p className="text-sm text-gray-500 italic mt-2">{description}</p>}
          </div>

          <Button 
            fullWidth 
            onClick={() => onToggleDay(currentDay)}
            variant={isCompleted ? "secondary" : "primary"}
            className="flex items-center justify-center gap-2 text-lg py-4"
          >
            {isCompleted ? <CheckCircle /> : <Circle />}
            {isCompleted ? t.completed : t.complete}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center px-2">
        <button 
          onClick={handlePrev} 
          disabled={currentDay === 1}
          className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <span className="font-bold text-gray-400">Day {currentDay}</span>

        <button 
          onClick={handleNext}
          disabled={currentDay === totalDays}
          className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ArrowRight size={24} />
        </button>
      </div>
      
      {/* Disclaimer / Note */}
      <div className="bg-blue-50 p-4 rounded-xl text-xs text-blue-800 border border-blue-100 text-center">
         Consult your doctor before starting any exercise routine, especially post-C-section.
      </div>
    </div>
  );
};