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
  const generateMealPlan = (targetCalories: number, protein: number, carbs: number, fat: number): DayPlan[] => {
    // Distribute calories across meals: 25% breakfast, 35% lunch, 35% dinner, 5% snacks
    const breakfastCals = Math.round(targetCalories * 0.25);
    const lunchCals = Math.round(targetCalories * 0.35);
    const dinnerCals = Math.round(targetCalories * 0.35);
    const snackCals = Math.round(targetCalories * 0.05);

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    const mealOptions = {
      breakfast: [
        { name: "Greek Yogurt with Berries & Granola", protein: 20, carbs: 45, fat: 8 },
        { name: "Scrambled Eggs with Avocado Toast", protein: 25, carbs: 35, fat: 15 },
        { name: "Protein Smoothie Bowl", protein: 30, carbs: 40, fat: 10 },
        { name: "Oatmeal with Nuts & Banana", protein: 15, carbs: 55, fat: 12 },
        { name: "Cottage Cheese Pancakes", protein: 28, carbs: 30, fat: 8 },
        { name: "Quinoa Breakfast Bowl", protein: 18, carbs: 48, fat: 10 },
        { name: "Protein French Toast", protein: 22, carbs: 38, fat: 12 }
      ],
      lunch: [
        { name: "Grilled Chicken Salad with Quinoa", protein: 35, carbs: 40, fat: 15 },
        { name: "Salmon & Sweet Potato Bowl", protein: 40, carbs: 45, fat: 18 },
        { name: "Turkey & Hummus Wrap", protein: 30, carbs: 50, fat: 12 },
        { name: "Lentil & Vegetable Soup with Bread", protein: 25, carbs: 55, fat: 8 },
        { name: "Tuna & Chickpea Salad", protein: 32, carbs: 35, fat: 14 },
        { name: "Beef & Vegetable Stir-fry", protein: 38, carbs: 42, fat: 16 },
        { name: "Mediterranean Bowl with Falafel", protein: 28, carbs: 48, fat: 20 }
      ],
      dinner: [
        { name: "Baked Cod with Roasted Vegetables", protein: 35, carbs: 30, fat: 12 },
        { name: "Lean Beef with Brown Rice", protein: 42, carbs: 45, fat: 15 },
        { name: "Grilled Chicken Breast with Quinoa", protein: 45, carbs: 40, fat: 10 },
        { name: "Baked Salmon with Sweet Potato", protein: 40, carbs: 35, fat: 18 },
        { name: "Turkey Meatballs with Pasta", protein: 38, carbs: 50, fat: 14 },
        { name: "Tofu & Vegetable Curry with Rice", protein: 25, carbs: 55, fat: 16 },
        { name: "Pork Tenderloin with Roasted Potatoes", protein: 36, carbs: 38, fat: 12 }
      ],
      snacks: [
        { name: "Apple with Almond Butter", protein: 4, carbs: 20, fat: 8 },
        { name: "Greek Yogurt", protein: 15, carbs: 8, fat: 0 },
        { name: "Mixed Nuts", protein: 6, carbs: 4, fat: 14 },
        { name: "Protein Bar", protein: 20, carbs: 15, fat: 8 },
        { name: "Hummus with Vegetables", protein: 8, carbs: 15, fat: 6 },
        { name: "Cottage Cheese with Berries", protein: 14, carbs: 12, fat: 2 },
        { name: "Trail Mix", protein: 8, carbs: 18, fat: 12 }
      ]
    };

    const calculateMealCalories = (protein: number, carbs: number, fat: number) => {
      return protein * 4 + carbs * 4 + fat * 9;
    };

    return days.map((day, index) => {
      const breakfast = mealOptions.breakfast[index];
      const lunch = mealOptions.lunch[index];
      const dinner = mealOptions.dinner[index];
      const snack = mealOptions.snacks[index];

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

  const mealPlan = generateMealPlan(results.targetCalories, results.protein, results.carbs, results.fat);

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