import { useState } from "react";
import FitnessCalculator from "@/components/FitnessCalculator";
import MealPlan from "@/components/MealPlan";

interface CalculationResults {
  bmr: number;
  tdee: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  cuisine: "mediterranean" | "asian" | "american" | "middle-eastern" | "mixed";
  language: "en" | "he";
  isKosher: boolean;
}

const Index = () => {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showMealPlan, setShowMealPlan] = useState(false);

  const handleCalculate = (calculationResults: CalculationResults) => {
    setResults(calculationResults);
    setShowMealPlan(true);
  };

  const handleBack = () => {
    setShowMealPlan(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {!showMealPlan ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl font-bold text-foreground">Fitness & Nutrition Planner</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Get your personalized BMR calculation, daily calorie target, and a complete 7-day meal plan 
                tailored to your fitness goals.
              </p>
            </div>
            <FitnessCalculator onCalculate={handleCalculate} />
          </div>
        ) : (
          results && <MealPlan results={results} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default Index;
