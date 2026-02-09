import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Button } from './Button';

interface OnboardingProps {
  language: Language;
  onComplete: (profile: Partial<UserProfile>) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ language, onComplete }) => {
  const t = TRANSLATIONS[language];
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    age: 25,
    weight: 70,
    height: 165,
    targetWeight: 60,
    medicalHistory: ''
  });

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-center max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">Doctor JD</h1>
        <p className="text-gray-500">{t.onboarding.title}</p>
        <div className="flex gap-2 justify-center mt-6">
          {[1, 2, 3].map(i => (
             <div key={i} className={`h-2 rounded-full transition-all ${i === step ? 'w-8 bg-primary' : 'w-2 bg-gray-200'}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.onboarding.name}</label>
              <input 
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-primary outline-none"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.onboarding.age}</label>
              <input 
                type="number"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-primary outline-none"
                value={formData.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.onboarding.weight}</label>
              <input 
                type="number"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-primary outline-none"
                value={formData.weight}
                onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.onboarding.height}</label>
              <input 
                type="number"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-primary outline-none"
                value={formData.height}
                onChange={(e) => handleChange('height', parseFloat(e.target.value))}
              />
            </div>
          </>
        )}

        {step === 3 && (
           <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.onboarding.target}</label>
              <input 
                type="number"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-primary outline-none"
                value={formData.targetWeight}
                onChange={(e) => handleChange('targetWeight', parseFloat(e.target.value))}
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.onboarding.history}</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-primary outline-none h-24"
                value={formData.medicalHistory}
                onChange={(e) => handleChange('medicalHistory', e.target.value)}
                placeholder="Any conditions we should know about?"
              />
            </div>
          </>
        )}
      </div>

      <Button onClick={handleNext} fullWidth className="mt-6">
        {step === 3 ? t.onboarding.submit : 'Next'}
      </Button>
    </div>
  );
};