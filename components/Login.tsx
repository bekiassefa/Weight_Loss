import React, { useState } from 'react';
import { Language } from '../types';
import { LOGIN_TRANSLATIONS } from '../constants';
import { supabase } from '../services/supabaseClient';
import { Button } from './Button';
import { Lock, User, AlertCircle, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
  language: Language;
  toggleLanguage: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, language, toggleLanguage }) => {
  const t = LOGIN_TRANSLATIONS[language];
  const [username, setUsername] = useState('');
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    
    if (!username.trim() || !passkey.trim()) {
      setError(t.errorEmpty);
      return;
    }

    setIsLoading(true);

    try {
      // Query Supabase for the user
      // Note: This relies on a table named 'users' with columns: username, passkey, is_active
      const { data, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username.trim())
        .eq('passkey', passkey.trim())
        .single();

      if (dbError || !data) {
        // If data is null or error exists, credentials are invalid
        console.error("Login error:", dbError);
        setError(t.errorInvalid);
        setIsLoading(false);
        return;
      }

      // Check if active on another device
      if (data.is_active) {
        setError(t.errorTaken);
        setIsLoading(false);
        return;
      }

      // Mark user as active
      const { error: updateError } = await supabase
        .from('users')
        .update({ is_active: true })
        .eq('id', data.id);

      if (updateError) {
        console.error("Update status error:", updateError);
        // We still let them in, but logging the error is good
      }

      onLogin(data.username);

    } catch (err) {
      console.error("Unexpected error:", err);
      setError(t.errorNetwork || "Connection Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-rose-600 flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-gray-800">
        
        {/* Header */}
        <div className="bg-primary/10 p-8 text-center relative">
          <div className="absolute top-4 right-4">
             <button 
                onClick={toggleLanguage}
                className="px-3 py-1 bg-white/50 backdrop-blur-sm rounded-lg text-xs font-bold text-primary hover:bg-white"
              >
                {language === Language.ENGLISH ? '🇺🇸 EN' : '🇪🇹 AM'}
              </button>
          </div>
          <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-lg shadow-pink-200">
            JD
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-sm text-gray-500 mt-2">{t.subtitle}</p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-start gap-2 animate-in slide-in-from-top-2">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 ml-1">{t.username}</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder={t.username}
              />
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-bold text-gray-600 ml-1">{t.passkey}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input 
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="••••••"
              />
            </div>
          </div>

          <Button fullWidth onClick={handleLogin} disabled={isLoading} className="py-3 text-lg shadow-xl shadow-pink-200 flex items-center justify-center gap-2">
             {isLoading ? <Loader2 className="animate-spin" /> : null}
             {t.loginBtn}
          </Button>

          <div className="text-center pt-2">
            <a href="#" className="text-xs text-primary hover:underline font-medium">
              {t.contactAdmin}
            </a>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 text-center text-xs text-gray-400 border-t border-gray-100">
           {t.footer}
        </div>
      </div>
    </div>
  );
};
