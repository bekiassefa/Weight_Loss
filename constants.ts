
import { Language, Meal, WorkoutDay, DayOfWeek, Credential } from './types';

export const LOGIN_TRANSLATIONS = {
  [Language.ENGLISH]: {
    title: "Member Login",
    subtitle: "Enter your unique credentials to access the challenge.",
    username: "Username",
    passkey: "Passkey",
    loginBtn: "Login",
    contactAdmin: "Don't have a passkey? Contact Admin",
    errorEmpty: "Please enter username and passkey.",
    errorInvalid: "Invalid Username or Passkey.",
    errorTaken: "This user is already active on another device. Please contact admin.",
    errorNetwork: "Connection error. Please check your internet.",
    footer: "Doctor JD Weight Loss Challenge"
  },
  [Language.AMHARIC]: {
    title: "ወደ መተግበሪያ ይግቡ",
    subtitle: "ቻሌንጁን ለመጀመር የተሰጠዎትን መለያ ያስገቡ።",
    username: "የተጠቃሚ ስም",
    passkey: "የይለፍ ቃል",
    loginBtn: "ግባ",
    contactAdmin: "መለያ የለዎትም? አድሚኑን ያናግሩ",
    errorEmpty: "እባክዎ የተጠቃሚ ስም እና የይለፍ ቃል ያስገቡ።",
    errorInvalid: "የተሳሳተ የተጠቃሚ ስም ወይም የይለፍ ቃል።",
    errorTaken: "ይህ መለያ በሌላ ሰው ተይዟል። እባክዎ አድሚኑን ያናግሩ።",
    errorNetwork: "የኢንተርኔት ግንኙነት ችግር አጋጥሟል።",
    footer: "ዶክተር ጄዲ የክብደት መቀነስ ቻሌንጅ"
  }
};

export const TRANSLATIONS = {
  [Language.ENGLISH]: {
    welcome: "Welcome back",
    subtitle: "Let's hit your goals today.",
    start: "Get Started",
    dashboard: "Dashboard",
    diet: "Diet Plan",
    exercise: "Workouts",
    water: "Hydration",
    finance: "Rewards",
    profile: "Profile",
    currentWeight: "Current Weight",
    targetWeight: "Goal",
    bmi: "BMI",
    dailyProgress: "Today's Progress",
    calories: "Calories",
    meals: "Meals",
    workouts: "Workouts",
    penalty: "Penalty Pot",
    wallet: "My Rewards",
    aiCoach: "Ask Dr. JD AI",
    askAiPlaceholder: "Ask about nutrition, form, or motivation...",
    save: "Save",
    logWeight: "Log Weight",
    complete: "Mark Complete",
    completed: "Completed",
    locked: "Locked",
    buyReward: "Redeem",
    streak: "Streak",
    ingredients: "Ingredients",
    allowedFoods: "Allowed Snacks",
    forbiddenFoods: "Forbidden Foods",
    reset: "Reset Day",
    week: "Week",
    day: "Day",
    restDay: "Rest / Recovery",
    minutes: "min",
    watchVideo: "Watch Instruction",
    video: "Video",
    idealWeight: "Ideal Weight",
    underweight: "Underweight",
    healthy: "Healthy Weight",
    overweight: "Overweight",
    obese: "Obese",
    weightTracker: "Weekly Weight Tracker",
    enterWeight: "Enter today's weight",
    progress: "Overall Progress",
    startingWeight: "Start", 
    history: "History",
    onTrack: "On Track",
    offTrack: "Needs Focus",
    change: "Change",
    totalLoss: "Total Loss",
    drinkWater: "Drink Water",
    nextDrink: "Next Drink",
    dailyGoal: "Daily Goal",
    glass: "Glass",
    reminderBody: "Time to drink your water!",
    enableNotifs: "Enable Reminders",
    hydrationTips: "Drinking water boosts metabolism and suppresses appetite.",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    report: {
      title: "Weekly Report",
      subtitle: "View progress & refinements",
      analysisTitle: "Weight Loss Analysis",
      totalWeight: "Total Body Weight",
      dietTitle: "Diet Plan",
      workoutTitle: "Workout",
      success: "Success",
      missedMeals: "meals missed",
      missedWorkouts: "sessions missed",
      refinementTitle: "Next Week's Focus",
      startMessage: "You started at",
      trendGood: "Great job keeping the trend downward!",
      trendBad: "We need to reverse this trend next week.",
    },
    onboarding: {
      title: "Let's get to know you",
      name: "Name",
      age: "Age",
      weight: "Current Weight (kg)",
      height: "Height (cm)",
      target: "Target Weight (kg)",
      history: "Medical History",
      submit: "Create Profile"
    }
  },
  [Language.AMHARIC]: {
    welcome: "እንኳን ደህና መጡ",
    subtitle: "የጤና ግብዎን እናሳካ።",
    start: "ጀምር",
    dashboard: "ዳሽቦርድ",
    diet: "የምግብ ዕቅድ",
    exercise: "ስፖርት",
    water: "ውሃ መጠጣት",
    finance: "ሽልማቶች",
    profile: "መገለጫ",
    currentWeight: "ያሁኑ ክብደት",
    targetWeight: "ግብ",
    bmi: "ቢኤምአይ",
    dailyProgress: "የዛሬ ሂደት",
    calories: "ካሎሪዎች",
    meals: "ምግቦች",
    workouts: "መልመጃዎች",
    penalty: "የቅጣት ሳጥን",
    wallet: "የእኔ ሽልማቶች",
    aiCoach: "ዶክተር ጄዲ ኤአይ ይጠይቁ",
    askAiPlaceholder: "ስለ አመጋገብ ወይም ስፖርት ይጠይቁ...",
    save: "አስቀምጥ",
    logWeight: "ክብደት ይመዝግቡ",
    complete: "ጨርሻለሁ",
    completed: "ተጠናቋል",
    locked: "ተቆልፏል",
    buyReward: "ሽልማት",
    streak: "ተከታታይ ቀናት",
    ingredients: "ግብዓቶች",
    allowedFoods: "የተፈቀዱ መክሰሶች",
    forbiddenFoods: "የተከለከሉ ምግቦች",
    reset: "ቀን አስጀምር",
    week: "ሳምንት",
    day: "ቀን",
    restDay: "እረፍት / ማገገሚያ",
    minutes: "ደቂቃ",
    watchVideo: "ቪዲዮውን ይመልከቱ",
    video: "ቪዲዮ",
    idealWeight: "ተስማሚ ክብደት",
    underweight: "ክብደት ማነስ",
    healthy: "ጤናማ ክብደት",
    overweight: "ከመጠን በላይ ክብደት",
    obese: "ከፍተኛ ውፍረት",
    weightTracker: "የክብደት መከታተያ",
    enterWeight: "የዛሬን ክብደት ያስገቡ",
    progress: "ጠቅላላ ሂደት",
    startingWeight: "መነሻ",
    history: "ታሪክ",
    onTrack: "በጥሩ ሁኔታ ላይ",
    offTrack: "ትኩረት ያስፈልጋል",
    change: "ለውጥ",
    totalLoss: "ጠቅላላ ቅናሽ",
    drinkWater: "ውሃ ይጠጡ",
    nextDrink: "ቀጣይ ተራ",
    dailyGoal: "የቀን ዕቅድ",
    glass: "ብርጭቆ",
    reminderBody: "ውሃ የሚጠጡበት ሰዓት ደርሷል!",
    enableNotifs: "ማስታወሻ ይፍቀዱ",
    hydrationTips: "ውሃ መጠጣት የምግብ መፈጨትን በማፋጠን ለክብደት ቅነሳ ይረዳል።",
    morning: "ጠዋት",
    afternoon: "ከሰዓት",
    evening: "ማታ",
    report: {
      title: "የሳምንቱ ሪፖርት",
      subtitle: "ሂደትዎን እና ምክሮችን ይመልከቱ",
      analysisTitle: "የክብደት ለውጥ ትንታኔ",
      totalWeight: "ጠቅላላ የሰውነት ክብደት",
      dietTitle: "የምግብ ዕቅድ",
      workoutTitle: "ስፖርት",
      success: "ስኬት",
      missedMeals: "የተዘለሉ ምግቦች",
      missedWorkouts: "የተዘለሉ ስፖርቶች",
      refinementTitle: "የሚቀጥለው ሳምንት ትኩረት",
      startMessage: "የጀመሩት በ",
      trendGood: "በጣም ጥሩ! ለውጡን ጠብቀው ይቀጥሉ።",
      trendBad: "በሚቀጥለው ሳምንት ይህንን ማስተካከል አለብን።",
    },
    onboarding: {
      title: "እራሶን ያስተዋውቁን",
      name: "ስም",
      age: "ዕድሜ",
      weight: "ያሁኑ ክብደት (ኪግ)",
      height: "ቁመት (ሳሜ)",
      target: "የታለመ ክብደት (ኪግ)",
      history: "የህክምና ታሪክ",
      submit: "መገለጫ ይፍጠሩ"
    }
  }
};

export const DAYS_OF_WEEK: { key: DayOfWeek; labelEn: string; labelAm: string }[] = [
  { key: 'Monday', labelEn: 'Mon', labelAm: 'ሰኞ' },
  { key: 'Tuesday', labelEn: 'Tue', labelAm: 'ማክሰኞ' },
  { key: 'Wednesday', labelEn: 'Wed', labelAm: 'ረቡዕ' },
  { key: 'Thursday', labelEn: 'Thu', labelAm: 'ሐሙስ' },
  { key: 'Friday', labelEn: 'Fri', labelAm: 'አርብ' },
  { key: 'Saturday', labelEn: 'Sat', labelAm: 'ቅዳሜ' },
  { key: 'Sunday', labelEn: 'Sun', labelAm: 'እሁድ' },
];

export const WEEKLY_MEAL_PLAN: Record<DayOfWeek, Meal[]> = {
  Monday: [
    {
      id: 'mon_bf', nameEn: 'Eggs with Veggies', nameAm: 'እንቁላል በ አትክልት', calories: 350, type: 'breakfast',
      ingredientsEn: ['3 Boiled Eggs (chopped)', 'Steamed Cabbage (no oil)', '1 tbsp Olive Oil', 'Onion, Pepper, Tomato', 'Spices (No Knorr)', '1 Orange'],
      ingredientsAm: ['3 የተቀቀለ እንቁላል ይቆራረጣል', 'ጥቅል ጎመን (ያለዘይት ተቀቅሎ)', '1 ማንኪያ ወይራ ዘይት', 'ሽንኩርት፣ ቃሪያ፣ ቲማቲም', 'ቅመማቅመም (ክኖር አይቻልም)', '1 ብርቱካን']
    },
    {
      id: 'mon_ln', nameEn: 'Beef with Veggies', nameAm: 'ስጋ በ አትክልት', calories: 450, type: 'lunch',
      ingredientsEn: ['100g Grilled/Boiled Beef', '1 tbsp Butter/Oil', 'Steamed Broccoli', 'Raw Grated Carrot, Onion, Pepper', '200g Strawberries'],
      ingredientsAm: ['ገንፈል ተደርጎ የተጠበሰ ስጋ (100ግ.ም)', '1 ማንኪያ ቅቤ/ዘይት', 'ገንፈል የተደረገ ብሮኮሊ', 'በጥሬው የተፈቀፈቀ ካሮት፣ ሽንኩርት፣ ቃሪያ', '200 ግ.ም እንጆሪ']
    },
    {
      id: 'mon_dn', nameEn: 'Lentils with Cheese (Ayib)', nameAm: 'ድፍን ምስር በአይብ', calories: 300, type: 'dinner',
      ingredientsEn: ['100g Ayib (Cottage Cheese)', '50g Lentils', 'Cabbage & Carrot', '1 tsp Oil', '2 tbsp Beetroot'],
      ingredientsAm: ['አይብ 100ግ.ም', 'ድፍን ምስር 50ግ.ም', 'ጥቅል ጎመን እና ካሮት', '1 ሻይ ማንኪያ ዘይት', '2 ማንኪያ ቀይስር']
    }
  ],
  Tuesday: [
    {
      id: 'tue_bf', nameEn: 'Eggs with Avocado', nameAm: 'እንቁላል በ አቮካዶ', calories: 400, type: 'breakfast',
      ingredientsEn: ['2 Fried Eggs (No oil)', '80g Avocado', 'Onion, Pepper, Tomato', 'Black Pepper', '2 slices Oat Bread', '1 Orange'],
      ingredientsAm: ['2 ያለዘይት የተጠበሰ እንቁላል', '80 ግም አቮካዶ', 'ሽንኩርት፣ ቃሪያ፣ ቲማቲም', 'ቁንዶ በርበሬ', '2 ስላይስ አጃ ዳቦ', '1 ብርቱካን']
    },
    {
      id: 'tue_ln', nameEn: 'Cucumber Salad', nameAm: 'ኩከምበር ሳላድ', calories: 350, type: 'lunch',
      ingredientsEn: ['1 Medium Cucumber chopped', '70g Boiled Chickpeas/Lentils', 'Onion, Pepper, Tomato', '250ml Greek Yogurt'],
      ingredientsAm: ['1 መካከለኛ ኩከምበር ተቆራርጦ', '70ግ.ም የተቀቀለ ሽምብራ/ድፍን ምስር', 'ሽንኩርት፣ ቃሪያ፣ ቲማቲም', '250ሚሊ ግሪክ ዮገርት']
    },
    {
      id: 'tue_dn', nameEn: 'Lentils with Cheese', nameAm: 'ድፍን ምስር በአይብ', calories: 300, type: 'dinner',
      ingredientsEn: ['100g Ayib', '50g Lentils', 'Cabbage & Carrot', '1 tsp Oil', '2 tbsp Beetroot'],
      ingredientsAm: ['አይብ 100ግ.ም', 'ድፍን ምስር 50ግም', 'ጥቅል ጎመን እና ካሮት', '1 ሻይ ማንኪያ ዘይት', '2 ማንኪያ ቀይስር']
    }
  ],
  Wednesday: [
    {
      id: 'wed_bf', nameEn: 'Oat Kinche', nameAm: 'አጃ ቂንጬ', calories: 380, type: 'breakfast',
      ingredientsEn: ['60g Boiled Oats', '1 tbsp Olive Oil', '30g Roasted Peanuts', '1 Banana'],
      ingredientsAm: ['60ግ.ም የተቀቀለ አጃ ቂንጬ', '1 ማንኪያ ወይራ ዘይት', '1 እጅ የተቆላ ለውዝ (30ግም)', '1 ሙዝ']
    },
    {
      id: 'wed_ln', nameEn: 'Fish with Veggies', nameAm: 'አሳ በ አትክልት', calories: 400, type: 'lunch',
      ingredientsEn: ['200g Boiled/Air-fried Fish', 'Steamed Broccoli & Carrot', 'Onion, Pepper', '1 tsp Olive Oil', 'Strawberries'],
      ingredientsAm: ['200ግ.ም የተቀቀለ/ኤር ፍራይድ አሳ', 'ገንፈል የተደረገ በሮኮሊ እና ካሮት', 'ሽንኩርት፣ ቃሪያ', '1 ሻይ ማንኪያ ኦሊቭ ዘየት', 'እንጆሪ']
    },
    {
      id: 'wed_dn', nameEn: 'Tuna Salad & Flax Juice', nameAm: 'ቱና ሳላድ እና ተልባ', calories: 320, type: 'dinner',
      ingredientsEn: ['95g Tuna (drained)', 'Steamed Broccoli & Carrot', 'Onion, Pepper', '1 tbsp Olive Oil', 'Flax Juice (1tbsp flax, warm water, honey)'],
      ingredientsAm: ['95ግ.ም ቱና (ፈሳሹን አስወግጂ)', 'ብሮኮሊ እና ካሮት ገንፈል ተዳርጎ', 'ሽንኩርት፣ቃሪያ', '1 ማንኪያ ኦሊቭ ዘይት', 'ተልባ ጁስ (1 ማንኪያ ተልባ፣ ውሃ፣ ማር)']
    }
  ],
  Thursday: [
    {
      id: 'thu_bf', nameEn: 'Eggs with Avocado', nameAm: 'እንቁላል በ አቮካዶ', calories: 400, type: 'breakfast',
      ingredientsEn: ['2 Fried Eggs (No oil)', '80g Avocado', 'Onion, Pepper, Tomato', 'Black Pepper', '2 slices Toast Oat Bread', '1 Orange'],
      ingredientsAm: ['2 ያለዘይት የተጠበሰ እንቁላል', '80 ግም አቮካዶ', 'ሽንኩርት፣ ቃሪያ፣ ቲማቲም', 'ቁንዶ በርበሬ', '2 ስላየስ ቶስት አጃ ዳቦ', '1 ብርቱካን']
    },
    {
      id: 'thu_ln', nameEn: 'Beef with Potato', nameAm: 'ስጋ በ ድንች', calories: 450, type: 'lunch',
      ingredientsEn: ['100g Beef (Grilled)', '1 tbsp Butter/Oil', '60g Air-fried Potato', 'Steamed Broccoli', 'Raw Carrot', '200g Strawberries'],
      ingredientsAm: ['ገንፈል ተደርጎ የተጠበሰ ስጋ 100ግም', '1 ማንኪያ ቄቤ/ዘይት', '60 ግ.ም ኤር ፍራይድ ድንች', 'ገንፈል የተደረገ ብሮኮሊ', 'በጥሬው የተፈቀፈቀ ካሮት', '200 ግም እንጆሪ']
    },
    {
      id: 'thu_dn', nameEn: 'Lentils with Cheese', nameAm: 'ድፍን ምስር በአይብ', calories: 300, type: 'dinner',
      ingredientsEn: ['100g Ayib', '50g Lentils', 'Cabbage & Carrot', '1 tsp Oil', '2 tbsp Beetroot'],
      ingredientsAm: ['አይብ 100ግ.ም', 'ድፍን ምስር 50 ግ.ም', 'ጥቅል ጎመን እና ካሮት', '1 ሻይ ማንኪያ ዘይት', '2 ማንኪያ ቀይስር']
    }
  ],
  Friday: [
    {
      id: 'fri_bf', nameEn: 'Oat Kinche', nameAm: 'አጃ ቂንጬ', calories: 380, type: 'breakfast',
      ingredientsEn: ['60g Boiled Oats', '1 tbsp Olive Oil', '30g Roasted Peanuts', '1 Banana'],
      ingredientsAm: ['60ግ.ም የተቀቀለ አጃ ቂንጬ', '1 ማንኪያ ወይራ ዘይት', '1 እጅ የተቆላ ለውዝ (30ግ.ም)', '1 ሙዝ']
    },
    {
      id: 'fri_ln', nameEn: 'Fish with Veggies', nameAm: 'አሳ በ አትክልት', calories: 400, type: 'lunch',
      ingredientsEn: ['200g Boiled/Air-fried Fish', 'Steamed Broccoli & Carrot', 'Onion, Pepper', '1 tsp Olive Oil', 'Strawberries'],
      ingredientsAm: ['200ግ.ም የተቀቀለ/ኤር ፍራይድ አሳ', 'ገንፈል የተደረገ በሮኮሊ እና ካሮት', 'ሽንኩርት፣ ቃሪያ', '1 ሻይ ማንኪያ ኦሊቭ ዘይት', 'እንጆሪ']
    },
    {
      id: 'fri_dn', nameEn: 'Lentils with Veggies', nameAm: 'ድፍን ምስር በአትክልት', calories: 300, type: 'dinner',
      ingredientsEn: ['250g Cooked Alicha Lentils', '2 tbsp Cabbage & Carrot', '2 tbsp Steamed Beetroot'],
      ingredientsAm: ['250 ግ.ም የበሰለ አልጫ ድፍን ምስር', '2 ማንኪያ ጥቅልጎመን እና ካሮት', '2 ማንኪያ ገንፈል ተደርጎ የተጠበሰ ቀይስር']
    }
  ],
  Saturday: [
    {
      id: 'sat_bf', nameEn: 'Eggs with Veggies', nameAm: 'እንቁላል በ አትክልት', calories: 350, type: 'breakfast',
      ingredientsEn: ['3 Boiled Eggs', 'Steamed Cabbage', '1 tbsp Olive Oil', 'Spices', '1 Orange'],
      ingredientsAm: ['3 የተቀቀለ እንቁላል ይቆራረጣል', 'ጥቅል ጎመን', '1 ማንኪያ ወይራ ዘይት', 'ቅመማቅመም', '1 ብርቱካን']
    },
    {
      id: 'sat_ln', nameEn: 'Beef Soup', nameAm: 'ስጋ ሾርባ', calories: 400, type: 'lunch',
      ingredientsEn: ['80g Red Meat', '50g Lentils', '1 cup Cauliflower', '1 Carrot', 'Onion, Garlic', '1 tbsp Oil/Butter'],
      ingredientsAm: ['80ግ.ም ቀይ ስጋ', '50 ግ.ም ድፍን ምስር', '1 ኩባያ አበባ ጎመን', '1 ካሮት', 'ሽንኩርት፣ ነጭ ሽንኩርት', '1 ማንኪያ ዘይት/ቂቤ']
    },
    {
      id: 'sat_dn', nameEn: 'Light Salad', nameAm: 'ቀለል ያለ ሳላድ', calories: 250, type: 'dinner',
      ingredientsEn: ['Mixed Greens', 'Lemon Dressing', 'Leftover veggies'],
      ingredientsAm: ['የተቀላቀለ ሰላጣ', 'ሎሚ', 'የተረፈ አትክልት']
    }
  ],
  Sunday: [
    {
      id: 'sun_bf', nameEn: 'Free Choice (Healthy)', nameAm: 'ምርጫዎ (ጤናማ)', calories: 350, type: 'breakfast',
      ingredientsEn: ['Choose from allowed foods'],
      ingredientsAm: ['ከተፈቀዱ ምግቦች ይምረጡ']
    },
    {
      id: 'sun_ln', nameEn: 'Free Choice (Healthy)', nameAm: 'ምርጫዎ (ጤናማ)', calories: 450, type: 'lunch',
      ingredientsEn: ['Choose from allowed foods'],
      ingredientsAm: ['ከተፈቀዱ ምግቦች ይምረጡ']
    },
    {
      id: 'sun_dn', nameEn: 'Free Choice (Healthy)', nameAm: 'ምርጫዎ (ጤናማ)', calories: 300, type: 'dinner',
      ingredientsEn: ['Choose from allowed foods'],
      ingredientsAm: ['ከተፈቀዱ ምግቦች ይምረጡ']
    }
  ]
};

export const ALLOWED_SNACKS = {
  en: ['Orange', 'Strawberry', 'Watermelon', 'Chickpeas', 'Sweet Potato', 'Pumpkin Seeds', 'Black Coffee', 'Herbal Tea (Moringa, Hibiscus, Ginger)'],
  am: ['ብርቱካን', 'እንጆሪ', 'ሀባብ', 'ሽንብራ ዱቤ', 'ስኳር ድንች', 'የዱባ ፍሬ', 'ጥቁር ቡና', 'ኸርባል ሻይ (ሞሪንጋ፣ ከርከዴ፣ ቀረፋ፣ ዝንጅብል)']
};

export const FORBIDDEN_FOODS = {
  en: ['Sugar', 'Soda', 'Pizza', 'Burger', 'Pastries/Sambusa', 'Packaged Juice', 'Sweets/Biscuits', 'Alcohol', 'Knorr/Stock cubes', 'Fried Foods', 'White Bread', 'Pasta/Macaroni'],
  am: ['ስኳር', 'ለስላሳ', 'ፒዛ', 'በርገር', 'ሳምቡሳ/ፓሰቲ', 'የታሸገ ጁስ', 'ብስኩት/ቸኮሌት', 'አልኮል', 'ክኖር', 'የተጠባበሱ ምግቦች', 'ነጭ ዳቦ', 'ፓስታ/መኮሮኒ']
};

export const THIRTY_DAY_PLAN: WorkoutDay[] = [
  // Week 1
  {
    day: 1, week: 1, duration: 20, isRest: false,
    titleEn: "Brisk Walk", titleAm: "ፈጣን እርምጃ",
    exercisesEn: ["Brisk walking for 20 minutes"], exercisesAm: ["ለ 20 ደቂቃ ፈጣን እርምጃ"],
    videoIds: ["enYITYwvPAQ"]
  },
  {
    day: 2, week: 1, duration: 30, isRest: false,
    titleEn: "Squats & Glutes", titleAm: "ስኩዋት እና ግሉት",
    exercisesEn: ["Squats x 15 (2 sets)", "Glute bridges x 15 (2 sets)", "Side leg raises x 15 (2 sets)"],
    exercisesAm: ["ስኩዋት x 15 (2 ዙር)", "ግሉት ብሪጅ x 15 (2 ዙር)", "የጎን እግር ማንሳት x 15 (2 ዙር)"],
    videoIds: ["tb7dWAOy7zo", "DhmcZrDoLq0", "R1OXPHRqehw", "4Drg7EeBR_I"]
  },
  {
    day: 3, week: 1, duration: 25, isRest: true,
    titleEn: "Recovery / Rest", titleAm: "ማገገሚያ / እረፍት",
    exercisesEn: ["Slow walk for 25 minutes", "Kegel exercises"], exercisesAm: ["ለ 25 ደቂቃ ዝግ ያለ እርምጃ", "የኬግል እንቅስቃሴ"],
    videoIds: ["l-gQLqv9f4o"]
  },
  {
    day: 4, week: 1, duration: 20, isRest: false,
    titleEn: "Upper Body Toning", titleAm: "የላይኛው ሰውነት ማነቃቂያ",
    exercisesEn: ["Wall/Knee Push-ups x 10 (2 sets)", "Rows x 15 (2 sets)", "Shoulder Raises x 15 (2 sets)"],
    exercisesAm: ["ፑሽ አፕ x 10 (2 ዙር)", "ሮውስ x 15 (2 ዙር)", "የትከሻ እንቅስቃሴ x 15 (2 ዙር)"],
    videoIds: ["h8WTMvVHXW0", "W6IkKhNGtpw", "69PAQLOJWDs", "eaM8JxEn6Ig"]
  },
  {
    day: 5, week: 1, duration: 30, isRest: false,
    titleEn: "Interval Walking", titleAm: "የእርምጃ ውህድ",
    exercisesEn: ["3 min slow walk", "3 min fast walk", "Repeat for 30 min"],
    exercisesAm: ["3 ደቂቃ ዝግ ያለ እርምጃ", "3 ደቂቃ ፈጣን እርምጃ", "መደጋገም ለ 30 ደቂቃ"],
    videoIds: ["5u5z81G79LM"]
  },
  {
    day: 6, week: 1, duration: 25, isRest: false,
    titleEn: "Home Workout Walk", titleAm: "የቤት ውስጥ እንቅስቃሴ",
    exercisesEn: ["Brisk walk at home"], exercisesAm: ["በቤት ውስጥ ፈጣን እርምጃ"],
    videoIds: ["4bGXW8vuZvM"]
  },
  {
    day: 7, week: 1, duration: 0, isRest: true,
    titleEn: "Rest Day", titleAm: "እረፍት",
    exercisesEn: ["Rest", "Kegel exercises"], exercisesAm: ["እረፍት", "የኬግል እንቅስቃሴ"]
  },
  // Week 2
  {
    day: 8, week: 2, duration: 20, isRest: false,
    titleEn: "Brisk Walk", titleAm: "ፈጣን እርምጃ",
    exercisesEn: ["Brisk walking for 20 minutes"], exercisesAm: ["ለ 20 ደቂቃ ፈጣን እርምጃ"],
    videoIds: ["5u5z81G79LM"]
  },
  {
    day: 9, week: 2, duration: 30, isRest: false,
    titleEn: "Legs & Core", titleAm: "እግር እና ሆድ",
    exercisesEn: ["Squats x 15 (2 sets)", "Glute bridges x 15 (2 sets)", "Side leg raises x 15 (2 sets)"],
    exercisesAm: ["ስኩዋት x 15 (2 ዙር)", "ግሉት ብሪጅ x 15 (2 ዙር)", "የጎን እግር ማንሳት x 15 (2 ዙር)"],
    videoIds: ["3SpPraOLJl4", "DhmcZrDoLq0", "R1OXPHRqehw", "4Drg7EeBR_I"]
  },
  {
    day: 10, week: 2, duration: 25, isRest: true,
    titleEn: "Recovery / Rest", titleAm: "ማገገሚያ / እረፍት",
    exercisesEn: ["Slow walk for 25 minutes"], exercisesAm: ["ለ 25 ደቂቃ ዝግ ያለ እርምጃ"],
    videoIds: ["l-gQLqv9f4o"]
  },
  {
    day: 11, week: 2, duration: 25, isRest: false,
    titleEn: "Upper Body Toning", titleAm: "የላይኛው ሰውነት ማነቃቂያ",
    exercisesEn: ["Wall/Knee Push-ups x 10 (2 sets)", "Rows x 15 (2 sets)", "Shoulder Raises x 15 (2 sets)"],
    exercisesAm: ["ፑሽ አፕ x 10 (2 ዙር)", "ሮውስ x 15 (2 ዙር)", "የትከሻ እንቅስቃሴ x 15 (2 ዙር)"],
    videoIds: ["XLqwAOsb6SQ", "W6IkKhNGtpw", "69PAQLOJWDs", "eaM8JxEn6Ig"]
  },
  {
    day: 12, week: 2, duration: 30, isRest: false,
    titleEn: "Interval Walking", titleAm: "የእርምጃ ውህድ",
    exercisesEn: ["3 min slow walk", "3 min fast walk", "Repeat for 30 min"],
    exercisesAm: ["3 ደቂቃ ዝግ ያለ እርምጃ", "3 ደቂቃ ፈጣን እርምጃ", "መደጋገም ለ 30 ደቂቃ"],
    videoIds: ["5u5z81G79LM"]
  },
  {
    day: 13, week: 2, duration: 20, isRest: false,
    titleEn: "Home Workout Walk", titleAm: "የቤት ውስጥ እንቅስቃሴ",
    exercisesEn: ["Brisk walk at home"], exercisesAm: ["በቤት ውስጥ ፈጣን እርምጃ"],
    videoIds: ["enYITYwvPAQ"]
  },
  {
    day: 14, week: 2, duration: 0, isRest: true,
    titleEn: "Rest Day", titleAm: "እረፍት",
    exercisesEn: ["Rest"], exercisesAm: ["እረፍት"]
  },
  // Week 3
  {
    day: 15, week: 3, duration: 20, isRest: false,
    titleEn: "Brisk Walk", titleAm: "ፈጣን እርምጃ",
    exercisesEn: ["Brisk walking"], exercisesAm: ["ፈጣን እርምጃ"],
    videoIds: ["5u5z81G79LM"]
  },
  {
    day: 16, week: 3, duration: 25, isRest: false,
    titleEn: "Lower Body Toning", titleAm: "የታችኛው ሰውነት ማነቃቂያ",
    exercisesEn: ["Squats x 15 (2 sets)", "Glute bridges x 15 (2 sets)", "Side leg raises x 15 (2 sets)"],
    exercisesAm: ["ስኩዋት x 15 (2 ዙር)", "ግሉት ብሪጅ x 15 (2 ዙር)", "የጎን እግር ማንሳት x 15 (2 ዙር)"],
    videoIds: ["tb7dWAOy7zo", "DhmcZrDoLq0", "R1OXPHRqehw", "4Drg7EeBR_I"]
  },
  {
    day: 17, week: 3, duration: 25, isRest: true,
    titleEn: "Recovery / Rest", titleAm: "ማገገሚያ / እረፍት",
    exercisesEn: ["Slow walk"], exercisesAm: ["ዝግ ያለ እርምጃ"],
    videoIds: ["l-gQLqv9f4o"]
  },
  {
    day: 18, week: 3, duration: 25, isRest: false,
    titleEn: "Upper Body Toning", titleAm: "የላይኛው ሰውነት ማነቃቂያ",
    exercisesEn: ["Wall/Knee Push-ups x 10 (2 sets)", "Rows x 15 (2 sets)", "Shoulder Raises x 15 (2 sets)"],
    exercisesAm: ["ፑሽ አፕ x 10 (2 ዙር)", "ሮውስ x 15 (2 ዙር)", "የትከሻ እንቅስቃሴ x 15 (2 ዙር)"],
    videoIds: ["y1ybNNpioP0", "W6IkKhNGtpw", "69PAQLOJWDs", "eaM8JxEn6Ig"]
  },
  {
    day: 19, week: 3, duration: 30, isRest: false,
    titleEn: "Intervals", titleAm: "የእርምጃ ውህድ",
    exercisesEn: ["Walk intervals"], exercisesAm: ["የእርምጃ ውህድ"],
    videoIds: ["5u5z81G79LM"]
  },
  {
    day: 20, week: 3, duration: 25, isRest: false,
    titleEn: "Home Workout Walk", titleAm: "የቤት ውስጥ እንቅስቃሴ",
    exercisesEn: ["Brisk walk"], exercisesAm: ["ፈጣን እርምጃ"],
    videoIds: ["wQrV75N2BrI"]
  },
  {
    day: 21, week: 3, duration: 0, isRest: true,
    titleEn: "Rest Day", titleAm: "እረፍት",
    exercisesEn: ["Rest"], exercisesAm: ["እረፍት"]
  },
  // Week 4
  {
    day: 22, week: 4, duration: 20, isRest: false,
    titleEn: "Brisk Walk", titleAm: "ፈጣን እርምጃ",
    exercisesEn: ["Brisk walking"], exercisesAm: ["ፈጣን እርምጃ"],
    videoIds: ["5u5z81G79LM"]
  },
  {
    day: 23, week: 4, duration: 30, isRest: false,
    titleEn: "Lower Body Toning", titleAm: "የታችኛው ሰውነት ማነቃቂያ",
    exercisesEn: ["Squats x 15 (2 sets)", "Glute bridges x 15 (2 sets)", "Side leg raises x 15 (2 sets)"],
    exercisesAm: ["ስኩዋት x 15 (2 ዙር)", "ግሉት ብሪጅ x 15 (2 ዙር)", "የጎን እግር ማንሳት x 15 (2 ዙር)"],
    videoIds: ["g98g7bMQcbc", "DhmcZrDoLq0", "R1OXPHRqehw", "4Drg7EeBR_I"]
  },
  {
    day: 24, week: 4, duration: 20, isRest: true,
    titleEn: "Recovery / Rest", titleAm: "ማገገሚያ / እረፍት",
    exercisesEn: ["Slow walk"], exercisesAm: ["ዝግ ያለ እርምጃ"],
    videoIds: ["l-gQLqv9f4o"]
  },
  {
    day: 25, week: 4, duration: 30, isRest: false,
    titleEn: "Upper Body Toning", titleAm: "የላይኛው ሰውነት ማነቃቂያ",
    exercisesEn: ["Wall/Knee Push-ups x 10 (2 sets)", "Rows x 15 (2 sets)", "Shoulder Raises x 15 (2 sets)"],
    exercisesAm: ["ፑሽ አፕ x 10 (2 ዙር)", "ሮውስ x 15 (2 ዙር)", "የትከሻ እንቅስቃሴ x 15 (2 ዙር)"],
    videoIds: ["WGA_ctAMkMk", "W6IkKhNGtpw", "69PAQLOJWDs", "eaM8JxEn6Ig"]
  },
  {
    day: 26, week: 4, duration: 30, isRest: false,
    titleEn: "Intervals", titleAm: "የእርምጃ ውህድ",
    exercisesEn: ["Walk intervals"], exercisesAm: ["የእርምጃ ውህድ"],
    videoIds: ["5u5z81G79LM"]
  },
  {
    day: 27, week: 4, duration: 20, isRest: false,
    titleEn: "Home Workout Walk", titleAm: "የቤት ውስጥ እንቅስቃሴ",
    exercisesEn: ["Brisk walk at home"], exercisesAm: ["በቤት ውስጥ ፈጣን እርምጃ"],
    videoIds: ["cvEJ5WFk2KE"]
  },
  {
    day: 28, week: 4, duration: 0, isRest: true,
    titleEn: "Rest Day", titleAm: "እረፍት",
    exercisesEn: ["Rest"], exercisesAm: ["እረፍት"]
  },
  // Final Days
  {
    day: 29, week: 5, duration: 30, isRest: false,
    titleEn: "Low-impact Cardio", titleAm: "ካርዲዮ",
    exercisesEn: ["Low impact cardio workout"], exercisesAm: ["ቀለል ያለ የካርዲዮ እንቅስቃሴ"],
    videoIds: ["-irx3_FA2nU"] 
  },
  {
    day: 30, week: 5, duration: 30, isRest: false,
    titleEn: "Full Body Cardio", titleAm: "ሙሉ ሰውነት ካርዲዮ",
    exercisesEn: ["Full body cardio workout"],
    exercisesAm: ["ሙሉ ሰውነት ካርዲዮ እንቅስቃሴ"],
    videoIds: ["qfe4vzupWjI"] 
  }
];

export const INITIAL_PROFILE = {
  name: '',
  age: 30,
  weight: 70,
  startWeight: 70, // Default start weight
  height: 165,
  targetWeight: 60,
  medicalHistory: '',
  coins: 100,
  charityPool: 0,
  weightHistory: [],
  onboardingComplete: false,
  completedMeals: [],
  completedChallengeDays: [],
  dailyHistory: {},
  lastActiveDate: new Date().toISOString().split('T')[0],
  waterLog: {}
};
