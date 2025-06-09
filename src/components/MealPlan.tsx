import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, TrendingUp, Target } from "lucide-react";

interface CalculationResults {
  bmr: number;
  tdee: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  cuisine: "mediterranean" | "asian" | "american" | "middle-eastern" | "mixed";
  language: "en" | "he";
}

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DayPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

interface MealPlanProps {
  results: CalculationResults;
  onBack: () => void;
}

const MealPlan = ({ results, onBack }: MealPlanProps) => {
  const isHebrew = results.language === "he";

  const translations = {
    en: {
      title: "Your Personalized Plan",
      back: "Back",
      dailyMetabolism: "Daily Metabolism",
      dailyTarget: "Daily Target",
      calories: "calories",
      macronutrients: "Macronutrients",
      protein: "Protein",
      carbs: "Carbs",
      fat: "Fat",
      mealPlan: "7-Day Meal Plan",
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      snack: "Snack",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    he: {
      title: "התכנית האישית שלך",
      back: "חזרה",
      dailyMetabolism: "חילוף חומרים יומי",
      dailyTarget: "יעד יומי",
      calories: "קלוריות",
      macronutrients: "רכיבי תזונה",
      protein: "חלבון",
      carbs: "פחמימות",
      fat: "שומן",
      mealPlan: "תכנית תזונה לשבוע",
      breakfast: "ארוחת בוקר",
      lunch: "ארוחת צהריים",
      dinner: "ארוחת ערב",
      snack: "חטיף",
      days: ["יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת", "יום ראשון"]
    }
  };

  const t = translations[results.language];

  const generateMealPlan = (cuisine: string, language: string): DayPlan[] => {
    const mealOptionsByCuisine = {
      mixed: {
        breakfast: [
          { name: language === "he" ? "יוגורט יווני עם פירות יער וגרנולה" : "Greek Yogurt with Berries & Granola", protein: 20, carbs: 45, fat: 8 },
          { name: language === "he" ? "ביצים מקושקשות עם טוסט אבוקדו" : "Scrambled Eggs with Avocado Toast", protein: 25, carbs: 35, fat: 15 },
          { name: language === "he" ? "קערת סמוזי חלבון" : "Protein Smoothie Bowl", protein: 30, carbs: 40, fat: 10 },
          { name: language === "he" ? "שיבולת שועל עם אגוזים ובננה" : "Oatmeal with Nuts & Banana", protein: 15, carbs: 55, fat: 12 },
          { name: language === "he" ? "פנקייקים מגבינת קוטג'" : "Cottage Cheese Pancakes", protein: 28, carbs: 30, fat: 8 },
          { name: language === "he" ? "קערת קינואה לארוחת בוקר" : "Quinoa Breakfast Bowl", protein: 18, carbs: 48, fat: 10 },
          { name: language === "he" ? "טוסט צרפתי חלבון" : "Protein French Toast", protein: 22, carbs: 38, fat: 12 },
          { name: language === "he" ? "בולגור עם חלב שקדים ותמרים" : "Bulgur with Almond Milk & Dates", protein: 16, carbs: 52, fat: 9 },
          { name: language === "he" ? "חביתה עם גבינה ועגבניות" : "Cheese & Tomato Omelet", protein: 24, carbs: 8, fat: 18 },
          { name: language === "he" ? "מקל בריאות עם חמאת בוטנים" : "Protein Bar with Peanut Butter", protein: 26, carbs: 32, fat: 14 }
        ],
        lunch: [
          { name: language === "he" ? "סלט עוף צלוי עם קינואה" : "Grilled Chicken Salad with Quinoa", protein: 35, carbs: 40, fat: 15 },
          { name: language === "he" ? "קערת סלמון ובטטה" : "Salmon & Sweet Potato Bowl", protein: 40, carbs: 45, fat: 18 },
          { name: language === "he" ? "לאפה הודו וחומוס" : "Turkey & Hummus Wrap", protein: 30, carbs: 50, fat: 12 },
          { name: language === "he" ? "מרק עדשים וירקות עם לחם" : "Lentil & Vegetable Soup with Bread", protein: 25, carbs: 55, fat: 8 },
          { name: language === "he" ? "סלט טונה וחומוס" : "Tuna & Chickpea Salad", protein: 32, carbs: 35, fat: 14 },
          { name: language === "he" ? "בשר בקר מוקפץ עם ירקות" : "Beef & Vegetable Stir-fry", protein: 38, carbs: 42, fat: 16 },
          { name: language === "he" ? "קערה ים תיכונית עם פלאפל" : "Mediterranean Bowl with Falafel", protein: 28, carbs: 48, fat: 20 },
          { name: language === "he" ? "קוסקוס עם ירקות וגבינת עזים" : "Couscous with Vegetables & Goat Cheese", protein: 22, carbs: 58, fat: 12 },
          { name: language === "he" ? "חזה עוף במתיל עם אורז מלא" : "Herb Chicken with Brown Rice", protein: 42, carbs: 38, fat: 10 },
          { name: language === "he" ? "סלמון בתנור עם ירקות שורש" : "Baked Salmon with Root Vegetables", protein: 36, carbs: 32, fat: 16 }
        ],
        dinner: [
          { name: language === "he" ? "דג קוד בתנור עם ירקות צלויים" : "Baked Cod with Roasted Vegetables", protein: 35, carbs: 30, fat: 12 },
          { name: language === "he" ? "בשר בקר רזה עם אורז מלא" : "Lean Beef with Brown Rice", protein: 42, carbs: 45, fat: 15 },
          { name: language === "he" ? "חזה עוף צלוי עם קינואה" : "Grilled Chicken Breast with Quinoa", protein: 45, carbs: 40, fat: 10 },
          { name: language === "he" ? "סלמון בתנור עם בטטה" : "Baked Salmon with Sweet Potato", protein: 40, carbs: 35, fat: 18 },
          { name: language === "he" ? "קציצות הודו עם פסטה" : "Turkey Meatballs with Pasta", protein: 38, carbs: 50, fat: 14 },
          { name: language === "he" ? "קארי טופו וירקות עם אורז" : "Tofu & Vegetable Curry with Rice", protein: 25, carbs: 55, fat: 16 },
          { name: language === "he" ? "פילה חזיר עם תפוחי אדמה צלויים" : "Pork Tenderloin with Roasted Potatoes", protein: 36, carbs: 38, fat: 12 },
          { name: language === "he" ? "דג ים עם תבשיל ירקות" : "Sea Bass with Vegetable Stew", protein: 38, carbs: 28, fat: 14 },
          { name: language === "he" ? "סטייק עוף עם פירה ובטטה" : "Chicken Steak with Sweet Potato Mash", protein: 44, carbs: 42, fat: 11 },
          { name: language === "he" ? "פילה דניס עם ירקות אסייתיים" : "Sea Bream Fillet with Asian Vegetables", protein: 34, carbs: 25, fat: 13 }
        ],
        snacks: [
          { name: language === "he" ? "תפוח עם חמאת שקדים" : "Apple with Almond Butter", protein: 4, carbs: 20, fat: 8 },
          { name: language === "he" ? "יוגורט יווני" : "Greek Yogurt", protein: 15, carbs: 8, fat: 0 },
          { name: language === "he" ? "תערובת אגוזים" : "Mixed Nuts", protein: 6, carbs: 4, fat: 14 },
          { name: language === "he" ? "מקל חלבון" : "Protein Bar", protein: 20, carbs: 15, fat: 8 },
          { name: language === "he" ? "חומוס עם ירקות" : "Hummus with Vegetables", protein: 8, carbs: 15, fat: 6 },
          { name: language === "he" ? "גבינת קוטג' עם פירות יער" : "Cottage Cheese with Berries", protein: 14, carbs: 12, fat: 2 },
          { name: language === "he" ? "תערובת שביל" : "Trail Mix", protein: 8, carbs: 18, fat: 12 },
          { name: language === "he" ? "חמאת בוטנים על חיתת אורז" : "Peanut Butter on Rice Cake", protein: 6, carbs: 16, fat: 10 },
          { name: language === "he" ? "ביצה קשה עם גזר בייבי" : "Hard Boiled Egg with Baby Carrots", protein: 12, carbs: 8, fat: 5 },
          { name: language === "he" ? "פרוסת אבוקדו על קרקר מלא" : "Avocado Slice on Whole Grain Cracker", protein: 3, carbs: 12, fat: 9 }
        ]
      },
      mediterranean: {
        breakfast: [
          { name: language === "he" ? "יוגורט יווני עם דבש ואגוזי מלך" : "Greek Yogurt with Honey & Walnuts", protein: 18, carbs: 35, fat: 12 },
          { name: language === "he" ? "ביצים מקושקשות עם זיתים וגבינת פטה" : "Scrambled Eggs with Olives & Feta", protein: 22, carbs: 8, fat: 16 },
          { name: language === "he" ? "לחם מחמצת עם אבוקדו וטחינה" : "Sourdough with Avocado & Tahini", protein: 14, carbs: 42, fat: 18 },
          { name: language === "he" ? "שיבולת שועל עם תאנים ושקדים" : "Oatmeal with Figs & Almonds", protein: 16, carbs: 48, fat: 14 },
          { name: language === "he" ? "פנקייקים מקמח שקדים" : "Almond Flour Pancakes", protein: 24, carbs: 25, fat: 16 },
          { name: language === "he" ? "סלט פירות עם יוגורט יווני ומסטיק" : "Fruit Salad with Greek Yogurt & Mastic", protein: 12, carbs: 38, fat: 8 },
          { name: language === "he" ? "טוסט עם גבינת רקוטה ותותים" : "Toast with Ricotta & Strawberries", protein: 20, carbs: 35, fat: 10 }
        ],
        lunch: [
          { name: language === "he" ? "סלט ים תיכוני עם חזה עוף" : "Mediterranean Chicken Salad", protein: 32, carbs: 25, fat: 20 },
          { name: language === "he" ? "קערת דגים ים תיכונית" : "Mediterranean Fish Bowl", protein: 38, carbs: 30, fat: 18 },
          { name: language === "he" ? "מוסקה עם עדשים ותפוחי אדמה" : "Moussaka with Lentils & Potatoes", protein: 26, carbs: 45, fat: 15 },
          { name: language === "he" ? "סלט יווני עם חומוס" : "Greek Salad with Hummus", protein: 18, carbs: 35, fat: 22 },
          { name: language === "he" ? "פלאפל עם יוגורט וירקות" : "Falafel with Yogurt & Vegetables", protein: 24, carbs: 42, fat: 16 },
          { name: language === "he" ? "מקרונים עם רוטב עגבניות ובזיליקום" : "Pasta with Tomato Basil Sauce", protein: 28, carbs: 55, fat: 12 },
          { name: language === "he" ? "ריזוטו עם ירקות ים תיכוניים" : "Risotto with Mediterranean Vegetables", protein: 22, carbs: 48, fat: 14 }
        ],
        dinner: [
          { name: language === "he" ? "סלמון עם זיתים ותרד" : "Salmon with Olives & Spinach", protein: 36, carbs: 15, fat: 22 },
          { name: language === "he" ? "כבש צלוי עם שום וירקי תיבול" : "Roasted Lamb with Garlic & Herbs", protein: 40, carbs: 20, fat: 18 },
          { name: language === "he" ? "דג ברמונדי עם ירקות צלויים" : "Barramundi with Roasted Vegetables", protein: 34, carbs: 25, fat: 15 },
          { name: language === "he" ? "רטטוי עם גבינת פרמזן" : "Ratatouille with Parmesan", protein: 20, carbs: 30, fat: 16 },
          { name: language === "he" ? "קציצות טורקיות עם יוגורט" : "Turkish Meatballs with Yogurt", protein: 35, carbs: 28, fat: 18 },
          { name: language === "he" ? "מוסקה עם חצילים ובשר כבש" : "Eggplant Moussaka with Lamb", protein: 32, carbs: 35, fat: 20 },
          { name: language === "he" ? "דג מקומי עם רוטב לימון וירקי תיבול" : "Local Fish with Lemon Herb Sauce", protein: 38, carbs: 18, fat: 14 }
        ],
        snacks: [
          { name: language === "he" ? "זיתים עם גבינת פטה" : "Olives with Feta Cheese", protein: 8, carbs: 6, fat: 16 },
          { name: language === "he" ? "חומוס עם ירקות חתוכים" : "Hummus with Cut Vegetables", protein: 10, carbs: 18, fat: 8 },
          { name: language === "he" ? "שקדים קלויים" : "Roasted Almonds", protein: 6, carbs: 6, fat: 14 },
          { name: language === "he" ? "גבינת מוצרלה עם עגבניות שרי" : "Mozzarella with Cherry Tomatoes", protein: 12, carbs: 8, fat: 10 },
          { name: language === "he" ? "יוגורט יווני עם דבש" : "Greek Yogurt with Honey", protein: 15, carbs: 20, fat: 2 },
          { name: language === "he" ? "לחם פיתה עם זעתר" : "Pita Bread with Za'atar", protein: 8, carbs: 25, fat: 6 },
          { name: language === "he" ? "תאנים יבשות עם אגוזי מלך" : "Dried Figs with Walnuts", protein: 5, carbs: 22, fat: 12 }
        ]
      },
      asian: {
        breakfast: [
          { name: language === "he" ? "מיסו רמן עם ביצה" : "Miso Ramen with Egg", protein: 22, carbs: 45, fat: 12 },
          { name: language === "he" ? "קונגי (דייסת אורז) עם דגים" : "Congee with Fish", protein: 18, carbs: 48, fat: 8 },
          { name: language === "he" ? "אומלט תאילנדי עם ירקות" : "Thai Omelet with Vegetables", protein: 24, carbs: 15, fat: 16 },
          { name: language === "he" ? "בפונדו (לחמניות קיטור) עם עוף" : "Baozi (Steamed Buns) with Chicken", protein: 20, carbs: 42, fat: 10 },
          { name: language === "he" ? "פד תאי ירקות" : "Vegetable Pad Thai", protein: 16, carbs: 55, fat: 14 },
          { name: language === "he" ? "סמולינה עם חלב קוקוס ופירות" : "Semolina with Coconut Milk & Fruits", protein: 14, carbs: 48, fat: 18 },
          { name: language === "he" ? "ביצים מטוגנות עם אורז ריחני" : "Fried Eggs with Fragrant Rice", protein: 18, carbs: 45, fat: 12 }
        ],
        lunch: [
          { name: language === "he" ? "קערת בודהה אסייתית" : "Asian Buddha Bowl", protein: 26, carbs: 50, fat: 16 },
          { name: language === "he" ? "סושי סלמון עם מיסו סופ" : "Salmon Sushi with Miso Soup", protein: 32, carbs: 45, fat: 14 },
          { name: language === "he" ? "פד תאי עוף" : "Chicken Pad Thai", protein: 35, carbs: 48, fat: 18 },
          { name: language === "he" ? "ביביאמבפ (קערת אורז קוריאנית)" : "Bibimbap (Korean Rice Bowl)", protein: 28, carbs: 52, fat: 15 },
          { name: language === "he" ? "רמן עוף עם ירקות" : "Chicken Ramen with Vegetables", protein: 30, carbs: 42, fat: 16 },
          { name: language === "he" ? "קארי תאילנדי עם עוף ואורז" : "Thai Curry with Chicken & Rice", protein: 34, carbs: 45, fat: 20 },
          { name: language === "he" ? "סטיר פריי טופו עם ירקות ואורז" : "Tofu Stir Fry with Vegetables & Rice", protein: 22, carbs: 48, fat: 14 }
        ],
        dinner: [
          { name: language === "he" ? "דג מושחר יפני עם ירקות" : "Japanese Blackened Fish with Vegetables", protein: 36, carbs: 25, fat: 16 },
          { name: language === "he" ? "קארי הודי עם בשר כבש" : "Indian Curry with Lamb", protein: 38, carbs: 35, fat: 18 },
          { name: language === "he" ? "טריאקי סלמון עם אורז חום" : "Teriyaki Salmon with Brown Rice", protein: 40, carbs: 38, fat: 16 },
          { name: language === "he" ? "מא פו טופו (טופו מושחר סיני)" : "Ma Po Tofu (Chinese Spicy Tofu)", protein: 24, carbs: 32, fat: 20 },
          { name: language === "he" ? "קציצות ויטנאמיות עם אטריות אורז" : "Vietnamese Meatballs with Rice Noodles", protein: 32, carbs: 42, fat: 15 },
          { name: language === "he" ? "דג בקארי תאילנדי" : "Fish in Thai Curry", protein: 35, carbs: 28, fat: 22 },
          { name: language === "he" ? "חזה עוף יפני עם ירקות מושחים" : "Japanese Chicken Breast with Sautéed Vegetables", protein: 42, carbs: 22, fat: 14 }
        ],
        snacks: [
          { name: language === "he" ? "אדממה (פול סויה)" : "Edamame (Soy Beans)", protein: 12, carbs: 10, fat: 6 },
          { name: language === "he" ? "רולי ירק קריספי" : "Crispy Vegetable Rolls", protein: 8, carbs: 20, fat: 10 },
          { name: language === "he" ? "מניפות אורז עם שומשום" : "Rice Crackers with Sesame", protein: 4, carbs: 18, fat: 8 },
          { name: language === "he" ? "טופו מושחר קטן" : "Small Sautéed Tofu", protein: 15, carbs: 6, fat: 12 },
          { name: language === "he" ? "שקדים בציפוי ואסבי" : "Wasabi Coated Almonds", protein: 6, carbs: 8, fat: 14 },
          { name: language === "he" ? "מיסו סופ קטנה" : "Small Miso Soup", protein: 8, carbs: 12, fat: 4 },
          { name: language === "he" ? "סלט אצות ים" : "Seaweed Salad", protein: 6, carbs: 15, fat: 2 }
        ]
      },
      american: {
        breakfast: [
          { name: language === "he" ? "פנקייקים אמריקניים עם סירופ מייפל" : "American Pancakes with Maple Syrup", protein: 18, carbs: 52, fat: 14 },
          { name: language === "he" ? "אומלט עם גבינה ובייקון" : "Cheese & Bacon Omelet", protein: 28, carbs: 8, fat: 22 },
          { name: language === "he" ? "שיבולת שועל עם אגוזי פקאן ובננה" : "Oatmeal with Pecans & Banana", protein: 16, carbs: 48, fat: 16 },
          { name: language === "he" ? "טוסט צרפתי עם קינמון" : "Cinnamon French Toast", protein: 20, carbs: 42, fat: 12 },
          { name: language === "he" ? "ביסקוויט עם ביצים ונקניק" : "Biscuits with Eggs & Sausage", protein: 24, carbs: 35, fat: 20 },
          { name: language === "he" ? "גרנולה ביתית עם יוגורט" : "Homemade Granola with Yogurt", protein: 22, carbs: 45, fat: 18 },
          { name: language === "he" ? "סמוזי חלבון עם חמאת בוטנים" : "Protein Smoothie with Peanut Butter", protein: 32, carbs: 38, fat: 16 }
        ],
        lunch: [
          { name: language === "he" ? "המבורגר עוף עם בטטה צלויה" : "Chicken Burger with Roasted Sweet Potato", protein: 35, carbs: 45, fat: 18 },
          { name: language === "he" ? "סלט קובה עם בקר צלוי" : "Cobb Salad with Roasted Beef", protein: 38, carbs: 20, fat: 22 },
          { name: language === "he" ? "סנדוויץ' הודו עם גבינה ואבוקדו" : "Turkey Sandwich with Cheese & Avocado", protein: 32, carbs: 42, fat: 16 },
          { name: language === "he" ? "מקרוני עם גבינה וברוקולי" : "Mac & Cheese with Broccoli", protein: 24, carbs: 55, fat: 18 },
          { name: language === "he" ? "רפ עוף בוראו מקס" : "Buffalo Chicken Wrap", protein: 30, carbs: 48, fat: 14 },
          { name: language === "he" ? "טונה מלט עם סלט צד" : "Tuna Melt with Side Salad", protein: 28, carbs: 35, fat: 16 },
          { name: language === "he" ? "סופ עוף עם אטריות ולחם תירס" : "Chicken Noodle Soup with Cornbread", protein: 26, carbs: 48, fat: 12 }
        ],
        dinner: [
          { name: language === "he" ? "סטייק בקר עם פירה ושעועית ירוקה" : "Beef Steak with Mashed Potatoes & Green Beans", protein: 42, carbs: 38, fat: 20 },
          { name: language === "he" ? "עוף צלוי עם תירס ופירה מתוקה" : "Roasted Chicken with Corn & Sweet Potato Mash", protein: 40, carbs: 42, fat: 16 },
          { name: language === "he" ? "דג קוד בתנור עם תפוחי אדמה ובאגט" : "Baked Cod with Potatoes & Baguette", protein: 35, carbs: 45, fat: 14 },
          { name: language === "he" ? "בשר בקר בישול איטי עם ירקות שורש" : "Slow Cooked Beef with Root Vegetables", protein: 38, carbs: 35, fat: 18 },
          { name: language === "he" ? "קציצות הודו עם פירה ורוטב" : "Turkey Meatballs with Mashed Potatoes & Gravy", protein: 32, carbs: 40, fat: 16 },
          { name: language === "he" ? "חזה עוף על הגריל עם ירקות צלויים" : "Grilled Chicken Breast with Roasted Vegetables", protein: 44, carbs: 28, fat: 12 },
          { name: language === "he" ? "חזיר בתנור עם תפוחי אדמה ותרד" : "Baked Pork with Potatoes & Spinach", protein: 36, carbs: 35, fat: 18 }
        ],
        snacks: [
          { name: language === "he" ? "חמאת בוטנים עם עוגיות גרהם" : "Peanut Butter with Graham Crackers", protein: 8, carbs: 22, fat: 12 },
          { name: language === "he" ? "גבינה עם קרקרים" : "Cheese with Crackers", protein: 12, carbs: 16, fat: 10 },
          { name: language === "he" ? "תערובת אגוזים ופירות יבשים" : "Mixed Nuts & Dried Fruits", protein: 6, carbs: 20, fat: 14 },
          { name: language === "he" ? "יוגורט עם גרנולה" : "Yogurt with Granola", protein: 14, carbs: 25, fat: 8 },
          { name: language === "he" ? "גזר בייבי עם חומוס" : "Baby Carrots with Hummus", protein: 6, carbs: 18, fat: 6 },
          { name: language === "he" ? "פופקורן אוויר" : "Air-Popped Popcorn", protein: 4, carbs: 20, fat: 2 },
          { name: language === "he" ? "מקל גבינה עם תפוח" : "String Cheese with Apple", protein: 8, carbs: 18, fat: 6 }
        ]
      },
      "middle-eastern": {
        breakfast: [
          { name: language === "he" ? "חומוס עם פיתה וביצה קשה" : "Hummus with Pita & Hard Boiled Egg", protein: 20, carbs: 45, fat: 12 },
          { name: language === "he" ? "שקשוקה עם לחם רך" : "Shakshuka with Soft Bread", protein: 18, carbs: 38, fat: 16 },
          { name: language === "he" ? "לאבנה עם זיתים ומלפפון" : "Labneh with Olives & Cucumber", protein: 16, carbs: 15, fat: 18 },
          { name: language === "he" ? "ביצים במקלפת עם זעתר" : "Fried Eggs with Za'atar", protein: 22, carbs: 25, fat: 20 },
          { name: language === "he" ? "קונפה מלוחה עם גבינה" : "Savory Kanafeh with Cheese", protein: 24, carbs: 35, fat: 16 },
          { name: language === "he" ? "סלט ירוק עם גבינת עזים וזיתים" : "Green Salad with Goat Cheese & Olives", protein: 14, carbs: 20, fat: 22 },
          { name: language === "he" ? "מנקיש זעתר עם גבינת לאבנה" : "Za'atar Manakish with Labneh", protein: 18, carbs: 42, fat: 14 }
        ],
        lunch: [
          { name: language === "he" ? "קבב טלה עם תבולה" : "Lamb Kebab with Tabbouleh", protein: 35, carbs: 30, fat: 20 },
          { name: language === "he" ? "פלאפל עם חומוס וסלט" : "Falafel with Hummus & Salad", protein: 22, carbs: 45, fat: 18 },
          { name: language === "he" ? "מנסף עם בשר כבש ואורז" : "Mansaf with Lamb & Rice", protein: 38, carbs: 48, fat: 16 },
          { name: language === "he" ? "דג מהמפרץ עם בורגול" : "Gulf Fish with Bulgur", protein: 32, carbs: 40, fat: 14 },
          { name: language === "he" ? "עוף עם פרבה וירקות" : "Chicken with Freekeh & Vegetables", protein: 34, carbs: 42, fat: 15 },
          { name: language === "he" ? "קוסה ממולאה בבשר ואורז" : "Stuffed Zucchini with Meat & Rice", protein: 28, carbs: 38, fat: 18 },
          { name: language === "he" ? "מלוחיה עם עוף ואורז לבן" : "Molokhia with Chicken & White Rice", protein: 30, carbs: 45, fat: 12 }
        ],
        dinner: [
          { name: language === "he" ? "אוזי עוף עם בצל ותבלינים" : "Chicken Ouzi with Onions & Spices", protein: 36, carbs: 40, fat: 16 },
          { name: language === "he" ? "כבש מבושל עם תפוחי אדמה" : "Braised Lamb with Potatoes", protein: 40, carbs: 35, fat: 20 },
          { name: language === "he" ? "מקלובה עם בשר ואורז" : "Maqluba with Meat & Rice", protein: 34, carbs: 48, fat: 18 },
          { name: language === "he" ? "סמך בתנור עם ירקות ים תיכוניים" : "Baked Sea Bass with Mediterranean Vegetables", protein: 38, carbs: 25, fat: 16 },
          { name: language === "he" ? "כבאב עוף עם סלט ירוק ופיתה" : "Chicken Kabab with Green Salad & Pita", protein: 42, carbs: 32, fat: 14 },
          { name: language === "he" ? "קוסטלטות כבש עם מעמול ירקות" : "Lamb Chops with Vegetable Stew", protein: 44, carbs: 28, fat: 22 },
          { name: language === "he" ? "דג דניס עם רוטב טחינה ובצל" : "Sea Bream with Tahini Sauce & Onions", protein: 35, carbs: 20, fat: 18 }
        ],
        snacks: [
          { name: language === "he" ? "תמרים ממולאים באגוזים" : "Dates Stuffed with Nuts", protein: 4, carbs: 24, fat: 8 },
          { name: language === "he" ? "לאבנה עם מלפפון ונענע" : "Labneh with Cucumber & Mint", protein: 12, carbs: 8, fat: 10 },
          { name: language === "he" ? "זיתי קלמטה עם פטה" : "Kalamata Olives with Feta", protein: 8, carbs: 6, fat: 16 },
          { name: language === "he" ? "חומוס עם גזר ופלפל" : "Hummus with Carrots & Peppers", protein: 8, carbs: 18, fat: 6 },
          { name: language === "he" ? "בורקסים קטנים עם גבינה" : "Small Cheese Burekas", protein: 10, carbs: 20, fat: 12 },
          { name: language === "he" ? "קפה עם תמרים" : "Coffee with Dates", protein: 2, carbs: 22, fat: 0 },
          { name: language === "he" ? "קבובשה (דובדבן מסוכר) עם אגוזים" : "Qabousheh (Candied Cherries) with Nuts", protein: 4, carbs: 18, fat: 10 }
        ]
      }
    };

    const currentCuisine = mealOptionsByCuisine[cuisine as keyof typeof mealOptionsByCuisine] || mealOptionsByCuisine.mixed;
    const calculateMealCalories = (protein: number, carbs: number, fat: number) => {
      return protein * 4 + carbs * 4 + fat * 9;
    };

    const getRandomMeal = (mealType: keyof typeof currentCuisine) => {
      const options = currentCuisine[mealType];
      return options[Math.floor(Math.random() * options.length)];
    };

    return t.days.map((day, index) => {
      const breakfast = getRandomMeal('breakfast');
      const lunch = getRandomMeal('lunch');
      const dinner = getRandomMeal('dinner');
      const snack = getRandomMeal('snacks');

      return {
        day,
        breakfast: {
          ...breakfast,
          calories: calculateMealCalories(breakfast.protein, breakfast.carbs, breakfast.fat)
        },
        lunch: {
          ...lunch,
          calories: calculateMealCalories(lunch.protein, lunch.carbs, lunch.fat)
        },
        dinner: {
          ...dinner,
          calories: calculateMealCalories(dinner.protein, dinner.carbs, dinner.fat)
        },
        snacks: [{
          ...snack,
          calories: calculateMealCalories(snack.protein, snack.carbs, snack.fat)
        }]
      };
    });
  };

  const mealPlan = generateMealPlan(results.cuisine, results.language);

  const MacroBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}g</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Your Personalized Plan</h1>
      </div>

      {/* Results Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Daily Metabolism
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">BMR:</span>
                <span className="font-medium">{results.bmr} cal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">TDEE:</span>
                <span className="font-medium">{results.tdee} cal</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Daily Target
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{results.targetCalories}</div>
              <div className="text-sm text-muted-foreground">calories</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Macronutrients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <MacroBar label="Protein" value={results.protein} max={results.protein} color="bg-blue-500" />
              <MacroBar label="Carbs" value={results.carbs} max={results.carbs} color="bg-green-500" />
              <MacroBar label="Fat" value={results.fat} max={results.fat} color="bg-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 7-Day Meal Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            7-Day Meal Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mealPlan.map((day, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-semibold">
                    {day.day}
                  </Badge>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Breakfast */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-primary">Breakfast</h4>
                    <div className="p-3 border rounded-lg bg-card">
                      <div className="font-medium text-sm mb-2">{day.breakfast.name}</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>{day.breakfast.calories} cal</div>
                        <div className="flex gap-2">
                          <span>P: {day.breakfast.protein}g</span>
                          <span>C: {day.breakfast.carbs}g</span>
                          <span>F: {day.breakfast.fat}g</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lunch */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-primary">Lunch</h4>
                    <div className="p-3 border rounded-lg bg-card">
                      <div className="font-medium text-sm mb-2">{day.lunch.name}</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>{day.lunch.calories} cal</div>
                        <div className="flex gap-2">
                          <span>P: {day.lunch.protein}g</span>
                          <span>C: {day.lunch.carbs}g</span>
                          <span>F: {day.lunch.fat}g</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dinner */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-primary">Dinner</h4>
                    <div className="p-3 border rounded-lg bg-card">
                      <div className="font-medium text-sm mb-2">{day.dinner.name}</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>{day.dinner.calories} cal</div>
                        <div className="flex gap-2">
                          <span>P: {day.dinner.protein}g</span>
                          <span>C: {day.dinner.carbs}g</span>
                          <span>F: {day.dinner.fat}g</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Snacks */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-primary">Snack</h4>
                    <div className="p-3 border rounded-lg bg-card">
                      <div className="font-medium text-sm mb-2">{day.snacks[0].name}</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>{day.snacks[0].calories} cal</div>
                        <div className="flex gap-2">
                          <span>P: {day.snacks[0].protein}g</span>
                          <span>C: {day.snacks[0].carbs}g</span>
                          <span>F: {day.snacks[0].fat}g</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {index < mealPlan.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealPlan;