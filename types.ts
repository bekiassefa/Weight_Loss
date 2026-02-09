
export enum Language {
  ENGLISH = 'en',
  AMHARIC = 'am',
}

export enum Page {
  DASHBOARD = 'dashboard',
  DIET = 'diet',
  EXERCISE = 'exercise',
  WATER = 'water',
  FINANCE = 'finance',
  PROFILE = 'profile',
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface Credential {
  username: string;
  passkey: string;
  isActive: boolean; // Simulator for "taken" status
}

export interface WeightLog {
  date: string; // YYYY-MM-DD
  weight: number;
}

export interface DayStatus {
  diet: boolean;
  workout: boolean;
  rewarded: boolean;
  penalized: boolean;
}

export interface UserProfile {
  name: string;
  age: number;
  weight: number; // Current dynamic weight
  startWeight: number; // Static starting weight
  height: number; // in cm
  targetWeight: number;
  medicalHistory: string;
  coins: number; // Virtual currency
  charityPool: number; // Penalty money
  weightHistory: WeightLog[];
  onboardingComplete: boolean;
  
  // New fields for daily tracking
  completedMeals: string[]; // List of meal IDs completed (all time)
  completedChallengeDays: number[]; // List of challenge days completed
  dailyHistory: Record<string, DayStatus>; // Map of YYYY-MM-DD to status
  lastActiveDate: string; // YYYY-MM-DD of last app usage
  
  // Water Tracking: Map of YYYY-MM-DD to array of completed hours (0-23)
  waterLog: Record<string, number[]>;
}

export interface Meal {
  id: string;
  nameEn: string;
  nameAm: string;
  calories: number;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredientsEn: string[];
  ingredientsAm: string[];
}

export interface WorkoutDay {
  day: number;
  week: number;
  titleEn: string;
  titleAm: string;
  duration: number; // minutes
  exercisesEn: string[];
  exercisesAm: string[];
  videoIds?: string[]; // Changed to array to support multiple videos
  isRest: boolean;
  descriptionEn?: string;
  descriptionAm?: string;
}

export interface DailyLog {
  date: string; // ISO date string YYYY-MM-DD
  completedMeals: string[]; // IDs of meals eaten
  completedExercises: string[]; // IDs of exercises done
  weight?: number;
}