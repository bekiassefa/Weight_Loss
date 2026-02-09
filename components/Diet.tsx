import React, { useState } from 'react';
import { Language, DayOfWeek } from '../types';
import { TRANSLATIONS, WEEKLY_MEAL_PLAN, DAYS_OF_WEEK, ALLOWED_SNACKS, FORBIDDEN_FOODS } from '../constants';
import { CheckCircle, Circle, Info, ChevronRight, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './Button';

interface DietProps {
  language: Language;
  currentDay: DayOfWeek;
  completedMeals: Set<string>;
  onToggleMeal: (day: DayOfWeek, mealId: string) => void;
  onDayChange: (day: DayOfWeek) => void;
}

export const Diet: React.FC<DietProps> = ({ language, currentDay, completedMeals, onToggleMeal, onDayChange }) => {
  const t = TRANSLATIONS[language];
  const meals = WEEKLY_MEAL_PLAN[currentDay];
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedMeal(expandedMeal === id ? null : id);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{t.diet}</h2>
        <div className="flex gap-2">
           <button className="bg-white p-2 rounded-full shadow-sm text-gray-500">
             <ShoppingCart size={20} />
           </button>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex overflow-x-auto no-scrollbar space-x-2 pb-2">
        {DAYS_OF_WEEK.map((day) => {
           const isSelected = day.key === currentDay;
           return (
             <button
               key={day.key}
               onClick={() => onDayChange(day.key)}
               className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                 isSelected 
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-200' 
                  : 'bg-white text-gray-500 border border-gray-100'
               }`}
             >
               {language === Language.AMHARIC ? day.labelAm : day.labelEn}
             </button>
           );
        })}
      </div>

      {/* Meals List */}
      <div className="space-y-4">
        {meals.map((meal) => {
          const isCompleted = completedMeals.has(`${currentDay}_${meal.id}`);
          const isExpanded = expandedMeal === meal.id;
          const name = language === Language.AMHARIC ? meal.nameAm : meal.nameEn;
          const ingredients = language === Language.AMHARIC ? meal.ingredientsAm : meal.ingredientsEn;

          return (
            <div 
              key={meal.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isCompleted ? 'bg-teal-50 border-teal-100' : 'bg-white border-gray-100 shadow-sm'
              }`}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => onToggleMeal(currentDay, meal.id)}
                    className={`transition-colors ${isCompleted ? 'text-teal-500' : 'text-gray-300 hover:text-teal-400'}`}
                  >
                    {isCompleted ? <CheckCircle size={26} className="fill-current" /> : <Circle size={26} />}
                  </button>
                  <div onClick={() => toggleExpand(meal.id)} className="cursor-pointer">
                    <h4 className={`font-bold text-lg ${isCompleted ? 'text-teal-800 line-through opacity-70' : 'text-gray-800'}`}>
                      {name}
                    </h4>
                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                      {meal.type} • {meal.calories} kcal
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => toggleExpand(meal.id)}
                  className="p-2 text-gray-400"
                >
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {/* Expanded Ingredients */}
              {isExpanded && (
                <div className="px-4 pb-4 animate-in slide-in-from-top-2">
                   <div className="h-px bg-gray-100 mb-3 w-full"></div>
                   <p className="text-xs font-bold text-gray-400 uppercase mb-2">{t.ingredients}</p>
                   <ul className="space-y-2">
                     {ingredients.map((ing, idx) => (
                       <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0"></span>
                         {ing}
                       </li>
                     ))}
                   </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Notes Section */}
      <div className="grid grid-cols-1 gap-4 mt-6">
        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
           <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
             <CheckCircle size={16} /> {t.allowedFoods}
           </h4>
           <div className="flex flex-wrap gap-2">
             {(language === Language.AMHARIC ? ALLOWED_SNACKS.am : ALLOWED_SNACKS.en).map((f, i) => (
               <span key={i} className="text-xs bg-white px-2 py-1 rounded-md text-green-700 shadow-sm border border-green-100">{f}</span>
             ))}
           </div>
        </div>

        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
           <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
             <Info size={16} /> {t.forbiddenFoods}
           </h4>
           <div className="flex flex-wrap gap-2">
             {(language === Language.AMHARIC ? FORBIDDEN_FOODS.am : FORBIDDEN_FOODS.en).map((f, i) => (
               <span key={i} className="text-xs bg-white px-2 py-1 rounded-md text-red-700 shadow-sm border border-red-100">{f}</span>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};