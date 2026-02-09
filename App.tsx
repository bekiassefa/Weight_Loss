
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Diet } from './components/Diet';
import { ExercisePage } from './components/Exercise';
import { Finance } from './components/Finance';
import { Profile } from './components/Profile';
import { Water } from './components/Water';
import { Onboarding } from './components/Onboarding';
import { Login } from './components/Login';
import { UserProfile, Language, Page, DayOfWeek } from './types';
import { INITIAL_PROFILE, WEEKLY_MEAL_PLAN, TRANSLATIONS } from './constants';
import { supabase } from './services/supabaseClient';
import { Button } from './components/Button';
import { LogOut } from 'lucide-react';

const BASE_STORAGE_KEY = 'jd_weight_loss_data';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  // User State - initially null until login
  const [user, setUser] = useState<UserProfile>(INITIAL_PROFILE);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDayKey, setCurrentDayKey] = useState<DayOfWeek>('Monday');
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  // Notification Tracking
  const lastNotifiedHour = useRef<number | null>(null);

  // Load Date & Initial Auth Check
  useEffect(() => {
    const dayIndex = new Date().getDay(); 
    const map = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setCurrentDayKey(map[dayIndex] as DayOfWeek);
    
    // Check if there is an active session
    const storedUsername = localStorage.getItem('jd_active_user');
    if (storedUsername) {
      loadUserData(storedUsername);
    } else {
      setIsLoading(false);
    }
  }, []); // Run once on mount

  // Timer for Clock and Notifications
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      
      setCurrentHour(hour);
      
      // Notification Logic:
      // Schedule: 8 AM (Ethiopian 2:00) to 7 PM (Ethiopian 1:00)
      if (hour >= 8 && hour <= 19) {
         // Trigger at the top of the hour (minute 0)
         // We use a broader check (minute < 1) with a ref to ensure we trigger it once per hour
         if (minute === 0 && lastNotifiedHour.current !== hour) {
             
             // Check permission first
             if (Notification.permission === 'granted') {
                 // Check if user already drank water for this hour to avoid annoyance
                 // We read directly from local state 'user' inside the closure? 
                 // No, 'user' state might be stale in setInterval closure depending on how React schedules.
                 // We'll read from localStorage to be safe and "advanced".
                 const today = new Date().toISOString().split('T')[0];
                 const storageKey = currentUsername ? `${BASE_STORAGE_KEY}_${currentUsername}` : null;
                 let alreadyDrank = false;
                 
                 if (storageKey) {
                   try {
                     const stored = localStorage.getItem(storageKey);
                     if (stored) {
                       const parsed = JSON.parse(stored);
                       const todayLog = parsed.waterLog?.[today] || [];
                       if (todayLog.includes(hour)) alreadyDrank = true;
                     }
                   } catch (e) {
                     console.warn("Could not check storage for water log");
                   }
                 }

                 if (!alreadyDrank) {
                    const title = language === Language.ENGLISH ? "💧 Drink Water" : "💧 ውሃ ይጠጡ";
                    const body = language === Language.ENGLISH 
                      ? `It's ${hour > 12 ? hour - 12 : hour}:00. Time for a glass of water!` 
                      : `ሰዓቱ ${hour > 12 ? hour - 12 : hour}:00 ነው:: እባክዎ አንድ ብርጭቆ ውሃ ይጠጡ::`;

                    const notif = new Notification(title, {
                        body: body,
                        icon: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png', // Generic water icon URL
                        tag: 'water-reminder',
                        requireInteraction: true // Keeps notification until user interacts
                    });
                    
                    notif.onclick = () => {
                      window.focus();
                      setCurrentPage(Page.WATER);
                      notif.close();
                    };
                 }
             }
             
             // Mark this hour as notified so we don't spam
             lastNotifiedHour.current = hour;
         }
      } else {
        // Reset outside hours just in case
        if (lastNotifiedHour.current !== null) lastNotifiedHour.current = null;
      }
    };

    // Check every 10 seconds to ensure we hit the 0th minute mark accurately without missing it
    const intervalId = setInterval(checkTime, 10000);
    checkTime(); // Initial check

    return () => clearInterval(intervalId);
  }, [currentUsername, language]); // Re-bind if user/language changes

  // Persistence Effect
  useEffect(() => {
    if (!isLoading && isAuthenticated && currentUsername) {
      localStorage.setItem(`${BASE_STORAGE_KEY}_${currentUsername}`, JSON.stringify(user));
    }
  }, [user, isLoading, isAuthenticated, currentUsername]);

  // Penalty Logic Effect
  useEffect(() => {
    if (isLoading || !isAuthenticated || !user.onboardingComplete) return;

    const today = new Date().toISOString().split('T')[0];
    const lastDate = user.lastActiveDate || today;

    if (lastDate === today) return;

    let penaltyApplied = false;
    let newCoins = user.coins;
    let newPenaltyPool = user.charityPool;
    const newDailyHistory = { ...user.dailyHistory };

    const addDays = (d: string, days: number) => {
      const date = new Date(d);
      date.setDate(date.getDate() + days);
      return date.toISOString().split('T')[0];
    };

    let checkDate = lastDate;
    while (checkDate < today) {
       const status = newDailyHistory[checkDate];
       if (!status || (!status.rewarded && !status.penalized)) {
          newCoins -= 100;
          newPenaltyPool += 100;
          newDailyHistory[checkDate] = {
            ...(status || { diet: false, workout: false, rewarded: false }),
            penalized: true
          };
          penaltyApplied = true;
       }
       checkDate = addDays(checkDate, 1);
    }

    if (penaltyApplied || lastDate !== today) {
       setUser(prev => ({
         ...prev,
         coins: newCoins,
         charityPool: newPenaltyPool,
         dailyHistory: newDailyHistory,
         lastActiveDate: today
       }));
    }
  }, [isLoading, isAuthenticated, user.onboardingComplete]);

  const loadUserData = (username: string) => {
    try {
      const storedData = localStorage.getItem(`${BASE_STORAGE_KEY}_${username}`);
      if (storedData) {
        // Merge with initial profile to ensure new fields (like waterLog) exist
        const parsed = JSON.parse(storedData);
        setUser({ ...INITIAL_PROFILE, ...parsed });
      } else {
        // New user or first time login for this specific user
        setUser(INITIAL_PROFILE);
      }
      setCurrentUsername(username);
      setIsAuthenticated(true);
    } catch (e) {
      console.error("Failed to load user", e);
      setUser(INITIAL_PROFILE);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (username: string) => {
    // Note: The Login component handles the API call to check credentials and sets 'is_active' to true.
    setIsLoading(true);
    localStorage.setItem('jd_active_user', username);
    loadUserData(username);
  };

  const handleLogout = async () => {
    if (currentUsername) {
      try {
        // Release the active session in Supabase
        await supabase
          .from('users')
          .update({ is_active: false })
          .eq('username', currentUsername);
      } catch (err) {
        console.error("Failed to release session", err);
      }
    }

    localStorage.removeItem('jd_active_user');
    setIsAuthenticated(false);
    setCurrentUsername(null);
    setUser(INITIAL_PROFILE);
    setCurrentPage(Page.DASHBOARD);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === Language.ENGLISH ? Language.AMHARIC : Language.ENGLISH);
  };

  const handleOnboardingComplete = (data: Partial<UserProfile>) => {
    const today = new Date().toISOString().split('T')[0];
    const initialWeight = data.weight || 0;
    const initialHistory = [{ date: today, weight: initialWeight }];
    setUser(prev => ({ 
      ...prev, 
      ...data, 
      startWeight: initialWeight || prev.weight,
      weightHistory: initialHistory,
      onboardingComplete: true,
      lastActiveDate: today 
    }));
    setCurrentPage(Page.DASHBOARD);
  };

  const checkAndApplyDailyReward = (currentUser: UserProfile) => {
    const today = new Date().toISOString().split('T')[0];
    const dayHistory = currentUser.dailyHistory[today] || { diet: false, workout: false, rewarded: false, penalized: false };
    if (dayHistory.diet && dayHistory.workout && !dayHistory.rewarded) {
      return {
        ...currentUser,
        coins: currentUser.coins + 100,
        dailyHistory: {
          ...currentUser.dailyHistory,
          [today]: { ...dayHistory, rewarded: true }
        }
      };
    }
    return currentUser;
  };

  const toggleMeal = (day: DayOfWeek, mealId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const key = `${day}_${mealId}`;
    
    setUser(prev => {
      const newCompleted = new Set(prev.completedMeals);
      if (newCompleted.has(key)) newCompleted.delete(key);
      else newCompleted.add(key);

      const updatedCompletedMeals = Array.from(newCompleted);
      const todaysMeals = WEEKLY_MEAL_PLAN[day];
      const allMealsDone = todaysMeals.every(m => newCompleted.has(`${day}_${m.id}`));
      const currentDayHistory = prev.dailyHistory[today] || { diet: false, workout: false, rewarded: false, penalized: false };
      
      let updatedUser = {
        ...prev,
        completedMeals: updatedCompletedMeals,
        dailyHistory: {
          ...prev.dailyHistory,
          [today]: { ...currentDayHistory, diet: allMealsDone }
        }
      };
      updatedUser = checkAndApplyDailyReward(updatedUser);
      return updatedUser;
    });
  };

  const toggleChallengeDay = (day: number) => {
    const today = new Date().toISOString().split('T')[0];
    setUser(prev => {
      const newCompleted = new Set(prev.completedChallengeDays);
      if (newCompleted.has(day)) newCompleted.delete(day);
      else newCompleted.add(day);

      const updatedCompletedDays = Array.from(newCompleted);
      const isWorkoutDone = newCompleted.has(day); 
      const currentDayHistory = prev.dailyHistory[today] || { diet: false, workout: false, rewarded: false, penalized: false };

      let updatedUser = {
        ...prev,
        completedChallengeDays: updatedCompletedDays,
        dailyHistory: {
           ...prev.dailyHistory,
           [today]: { ...currentDayHistory, workout: isWorkoutDone ? true : currentDayHistory.workout } 
        }
      };
      updatedUser = checkAndApplyDailyReward(updatedUser);
      return updatedUser;
    });
  };

  const handleToggleWater = (hour: number) => {
    const today = new Date().toISOString().split('T')[0];
    setUser(prev => {
       const currentLog = new Set(prev.waterLog[today] || []);
       if (currentLog.has(hour)) currentLog.delete(hour);
       else currentLog.add(hour);
       
       return {
         ...prev,
         waterLog: {
           ...prev.waterLog,
           [today]: Array.from(currentLog)
         }
       };
    });
  };

  const handleLogWeight = (newWeight: number) => {
    const today = new Date().toISOString().split('T')[0];
    setUser(prev => {
      const newHistory = [...(prev.weightHistory || [])];
      let coinChange = 0;
      let charityChange = 0;
      
      const sortedHistory = [...newHistory].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const previousEntries = sortedHistory.filter(h => h.date !== today);
      const lastEntry = previousEntries.length > 0 ? previousEntries[previousEntries.length - 1] : null;

      if (lastEntry) {
         const diff = newWeight - lastEntry.weight;
         if (diff < -0.1) coinChange = 50; 
         else if (diff > 0.1) charityChange = 20; 
      }

      const existingIndex = newHistory.findIndex(h => h.date === today);
      if (existingIndex >= 0) newHistory[existingIndex].weight = newWeight;
      else newHistory.push({ date: today, weight: newWeight });
      
      newHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      return {
        ...prev,
        weight: newWeight,
        weightHistory: newHistory,
        coins: prev.coins + coinChange,
        charityPool: prev.charityPool + charityChange
      };
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white text-primary">
         <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
               <span className="text-2xl font-bold">JD</span>
            </div>
            <p className="font-semibold text-gray-400">Loading...</p>
         </div>
      </div>
    );
  }

  // Not Authenticated -> Show Login
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} language={language} toggleLanguage={toggleLanguage} />;
  }

  // Authenticated but not onboarded -> Show Onboarding
  if (!user.onboardingComplete) {
    return <Onboarding language={language} onComplete={handleOnboardingComplete} />;
  }

  // Authenticated and Onboarded -> Show App
  const renderPage = () => {
    const completedMealsSet = new Set(user.completedMeals);
    const completedChallengeDaysSet = new Set(user.completedChallengeDays);

    switch (currentPage) {
      case Page.DASHBOARD:
        return (
          <Dashboard 
            user={user} 
            language={language} 
            onNavigate={setCurrentPage}
            completedMealsCount={Array.from(completedMealsSet).filter((k: string) => k.startsWith(currentDayKey)).length}
            completedExercisesCount={completedChallengeDaysSet.size} 
            currentDay={currentDayKey}
            onLogWeight={handleLogWeight}
          />
        );
      case Page.DIET:
        return (
          <Diet 
            language={language} 
            currentDay={currentDayKey} 
            completedMeals={completedMealsSet}
            onToggleMeal={toggleMeal}
            onDayChange={setCurrentDayKey}
          />
        );
      case Page.EXERCISE:
        return (
          <ExercisePage 
            language={language}
            completedDays={completedChallengeDaysSet}
            onToggleDay={toggleChallengeDay}
          />
        );
      case Page.WATER:
        return (
           <Water 
             user={user} 
             language={language} 
             onToggleWater={handleToggleWater} 
             currentHour={currentHour}
           />
        );
      case Page.FINANCE:
        return <Finance user={user} language={language} />;
      case Page.PROFILE:
        return (
          <div className="relative">
            <Profile user={user} language={language} />
            <div className="p-4 pt-0">
               <Button variant="outline" className="w-full border-red-200 text-red-500 hover:bg-red-50" onClick={handleLogout}>
                 <LogOut size={18} className="mr-2 inline" /> Sign Out
               </Button>
            </div>
          </div>
        );
      default:
        return <Dashboard user={user} language={language} onNavigate={setCurrentPage} onLogWeight={handleLogWeight} 
        /* ADD THESE LINES BELOW */
  completedMealsCount={Array.from(completedMealsSet).filter((k: string) => k.startsWith(currentDayKey)).length}
  completedExercisesCount={completedChallengeDaysSet.size} 
  currentDay={currentDayKey}
        />;
    }
  };

  return (
    <Router>
      <Layout 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        language={language}
        toggleLanguage={toggleLanguage}
      >
        {renderPage()}
      </Layout>
    </Router>
  );
};

export default App;