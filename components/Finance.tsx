import React from 'react';
import { Language, UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';
import { Wallet, Heart, Lock, Gift } from 'lucide-react';
import { Button } from './Button';

interface FinanceProps {
  user: UserProfile;
  language: Language;
}

export const Finance: React.FC<FinanceProps> = ({ user, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.finance}</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* User Wallet */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-yellow-100 p-3 rounded-full mb-3">
             <Wallet className="text-yellow-600 w-6 h-6" />
          </div>
          <span className="text-xs text-gray-500 uppercase tracking-wide">{t.wallet}</span>
          <span className="text-2xl font-bold text-gray-800 mt-1">{user.coins} ETB</span>
        </div>

        {/* Charity/Penalty Pot */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-red-100 p-3 rounded-full mb-3">
             <Heart className="text-red-600 w-6 h-6" />
          </div>
          <span className="text-xs text-gray-500 uppercase tracking-wide">{t.penalty}</span>
          <span className="text-2xl font-bold text-gray-800 mt-1">{user.charityPool} ETB</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-700">Rewards Shop</h3>
        
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
           <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
             <Gift />
           </div>
           <div className="flex-1">
             <h4 className="font-bold text-gray-800">Cheat Meal Pass</h4>
             <p className="text-xs text-gray-500">Skip one diet penalty</p>
           </div>
           <Button variant="secondary" className="text-xs">
             50 ETB
           </Button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 opacity-75">
           <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
             <Lock size={20} />
           </div>
           <div className="flex-1">
             <h4 className="font-bold text-gray-800">New Recipe Pack</h4>
             <p className="text-xs text-gray-500">Unlocks at Level 5</p>
           </div>
           <Button disabled variant="outline" className="text-xs">
             {t.locked}
           </Button>
        </div>
      </div>
      
      <div className="bg-red-50 p-4 rounded-xl text-sm text-red-800 border border-red-100">
         <strong>Accountability Check:</strong> You missed yesterday's workout. 20 ETB has been moved to the Charity Pot.
      </div>
    </div>
  );
};