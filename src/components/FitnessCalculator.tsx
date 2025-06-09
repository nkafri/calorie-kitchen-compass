import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, Target, Activity } from "lucide-react";

interface UserData {
  height: number;
  weight: number;
  age: number;
  gender: "male" | "female";
  goal: "lose" | "gain" | "maintain";
  workoutFrequency: number;
  heightUnit: "cm" | "inches";
  weightUnit: "kg" | "lbs";
  cuisine: "mediterranean" | "asian" | "american" | "middle-eastern" | "mixed";
  language: "en" | "he";
}

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

interface FitnessCalculatorProps {
  onCalculate: (results: CalculationResults) => void;
}

const FitnessCalculator = ({ onCalculate }: FitnessCalculatorProps) => {
  const [userData, setUserData] = useState<UserData>({
    height: 0,
    weight: 0,
    age: 0,
    gender: "male",
    goal: "maintain",
    workoutFrequency: 3,
    heightUnit: "cm",
    weightUnit: "kg",
    cuisine: "mixed",
    language: "en"
  });

  const calculateBMR = (height: number, weight: number, age: number, gender: string, heightUnit: string, weightUnit: string) => {
    // Convert to metric if needed
    let heightCm = heightUnit === "inches" ? height * 2.54 : height;
    let weightKg = weightUnit === "lbs" ? weight * 0.453592 : weight;

    // Mifflin-St Jeor formula
    if (gender === "male") {
      return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  };

  const calculateTDEE = (bmr: number, workoutFrequency: number) => {
    // Activity multipliers
    const activityLevels = {
      0: 1.2,  // Sedentary
      1: 1.375, // Lightly active (1-3 times/week)
      2: 1.375,
      3: 1.55, // Moderately active (3-5 times/week)
      4: 1.55,
      5: 1.725, // Very active (6-7 times/week)
      6: 1.725,
      7: 1.9   // Extremely active
    };

    const multiplier = activityLevels[Math.min(workoutFrequency, 7) as keyof typeof activityLevels] || 1.55;
    return bmr * multiplier;
  };

  const calculateTargetCalories = (tdee: number, goal: string) => {
    switch (goal) {
      case "lose":
        return tdee - 500;
      case "gain":
        return tdee + 500;
      default:
        return tdee;
    }
  };

  const calculateMacros = (calories: number, goal: string) => {
    let proteinRatio, carbRatio, fatRatio;

    switch (goal) {
      case "lose":
        proteinRatio = 0.35;
        carbRatio = 0.30;
        fatRatio = 0.35;
        break;
      case "gain":
        proteinRatio = 0.25;
        carbRatio = 0.45;
        fatRatio = 0.30;
        break;
      default: // maintain/muscle
        proteinRatio = 0.30;
        carbRatio = 0.40;
        fatRatio = 0.30;
        break;
    }

    return {
      protein: Math.round((calories * proteinRatio) / 4),
      carbs: Math.round((calories * carbRatio) / 4),
      fat: Math.round((calories * fatRatio) / 9)
    };
  };

  const handleCalculate = () => {
    const { height, weight, age, gender, goal, workoutFrequency, heightUnit, weightUnit } = userData;

    if (!height || !weight || !age) {
      alert("Please fill in all required fields");
      return;
    }

    const bmr = calculateBMR(height, weight, age, gender, heightUnit, weightUnit);
    const tdee = calculateTDEE(bmr, workoutFrequency);
    const targetCalories = calculateTargetCalories(tdee, goal);
    const macros = calculateMacros(targetCalories, goal);

    const results: CalculationResults = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      ...macros,
      cuisine: userData.cuisine,
      language: userData.language
    };

    onCalculate(results);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Calculator className="h-6 w-6 text-primary" />
          Fitness & Nutrition Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <Label htmlFor="height">Height *</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter height"
              value={userData.height || ""}
              onChange={(e) => setUserData(prev => ({ ...prev, height: Number(e.target.value) }))}
            />
          </div>
          <Select value={userData.heightUnit} onValueChange={(value: "cm" | "inches") => setUserData(prev => ({ ...prev, heightUnit: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cm">cm</SelectItem>
              <SelectItem value="inches">inches</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Weight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <Label htmlFor="weight">Weight *</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter weight"
              value={userData.weight || ""}
              onChange={(e) => setUserData(prev => ({ ...prev, weight: Number(e.target.value) }))}
            />
          </div>
          <Select value={userData.weightUnit} onValueChange={(value: "kg" | "lbs") => setUserData(prev => ({ ...prev, weightUnit: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">kg</SelectItem>
              <SelectItem value="lbs">lbs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Age */}
        <div>
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter age"
            value={userData.age || ""}
            onChange={(e) => setUserData(prev => ({ ...prev, age: Number(e.target.value) }))}
          />
        </div>

        {/* Gender */}
        <div>
          <Label>Gender *</Label>
          <RadioGroup
            value={userData.gender}
            onValueChange={(value: "male" | "female") => setUserData(prev => ({ ...prev, gender: value }))}
            className="flex gap-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Goal */}
        <div>
          <Label className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Fitness Goal *
          </Label>
          <Select value={userData.goal} onValueChange={(value: "lose" | "gain" | "maintain") => setUserData(prev => ({ ...prev, goal: value }))}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lose">Lose Weight</SelectItem>
              <SelectItem value="gain">Gain Mass</SelectItem>
              <SelectItem value="maintain">Build Lean Muscle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Workout Frequency */}
        <div>
          <Label className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Weekly Workout Frequency
          </Label>
          <Select 
            value={userData.workoutFrequency.toString()} 
            onValueChange={(value) => setUserData(prev => ({ ...prev, workoutFrequency: Number(value) }))}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Sedentary (no exercise)</SelectItem>
              <SelectItem value="1">1 time per week</SelectItem>
              <SelectItem value="2">2 times per week</SelectItem>
              <SelectItem value="3">3 times per week</SelectItem>
              <SelectItem value="4">4 times per week</SelectItem>
              <SelectItem value="5">5 times per week</SelectItem>
              <SelectItem value="6">6 times per week</SelectItem>
              <SelectItem value="7">7 times per week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Language */}
        <div>
          <Label>Language</Label>
          <Select value={userData.language} onValueChange={(value: "en" | "he") => setUserData(prev => ({ ...prev, language: value }))}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="he">עברית</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cuisine */}
        <div>
          <Label>Cuisine Preference</Label>
          <Select value={userData.cuisine} onValueChange={(value: "mediterranean" | "asian" | "american" | "middle-eastern" | "mixed") => setUserData(prev => ({ ...prev, cuisine: value }))}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mixed">Mixed International</SelectItem>
              <SelectItem value="mediterranean">Mediterranean</SelectItem>
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="american">American</SelectItem>
              <SelectItem value="middle-eastern">Middle Eastern</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleCalculate} className="w-full" size="lg">
          {userData.language === "he" ? "חשב וצור תכנית תזונה" : "Calculate & Generate Meal Plan"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FitnessCalculator;