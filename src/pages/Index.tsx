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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-12">
        {!showMealPlan ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-12 animate-fade-in">
            <div className="text-center space-y-6 max-w-3xl">
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 animate-slide-down">
                Fitness & Nutrition Planner
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in-delayed">
                Get your personalized BMR calculation, daily calorie target, and a complete 7-day meal plan 
                tailored to your fitness goals. Start your journey to a healthier lifestyle today.
              </p>
            </div>
            <div className="w-full animate-scale-in">
              <FitnessCalculator onCalculate={handleCalculate} />
            </div>
          </div>
        ) : (
          results && (
            <div className="animate-slide-in">
              <MealPlan results={results} onBack={handleBack} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Index;
