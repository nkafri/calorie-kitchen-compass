import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
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
  isKosher: boolean;
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
  isKosher: boolean;
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
    language: "en",
    isKosher: false
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
      language: userData.language,
      isKosher: userData.isKosher
    };

    onCalculate(results);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto card-hover">
      <CardHeader className="text-center space-y-4 pb-8">
        <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold">
          <Calculator className="h-7 w-7 text-primary" />
          Fitness & Nutrition Calculator
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Fill in your details below to get your personalized nutrition plan
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <Label htmlFor="height" className="text-sm font-medium">Height *</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter height"
              value={userData.height || ""}
              onChange={(e) => setUserData(prev => ({ ...prev, height: Number(e.target.value) }))}
              className="mt-1.5 input-focus"
            />
          </div>
          <Select value={userData.heightUnit} onValueChange={(value: "cm" | "inches") => setUserData(prev => ({ ...prev, heightUnit: value }))}>
            <SelectTrigger className="h-10">
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
            <Label htmlFor="weight" className="text-sm font-medium">Weight *</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter weight"
              value={userData.weight || ""}
              onChange={(e) => setUserData(prev => ({ ...prev, weight: Number(e.target.value) }))}
              className="mt-1.5 input-focus"
            />
          </div>
          <Select value={userData.weightUnit} onValueChange={(value: "kg" | "lbs") => setUserData(prev => ({ ...prev, weightUnit: value }))}>
            <SelectTrigger className="h-10">
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
          <Label htmlFor="age" className="text-sm font-medium">Age *</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter age"
            value={userData.age || ""}
            onChange={(e) => setUserData(prev => ({ ...prev, age: Number(e.target.value) }))}
            className="mt-1.5 input-focus"
          />
        </div>

        {/* Gender */}
        <div>
          <Label className="text-sm font-medium">Gender *</Label>
          <RadioGroup
            value={userData.gender}
            onValueChange={(value: "male" | "female") => setUserData(prev => ({ ...prev, gender: value }))}
            className="flex gap-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" className="border-primary/30" />
              <Label htmlFor="male" className="cursor-pointer">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" className="border-primary/30" />
              <Label htmlFor="female" className="cursor-pointer">Female</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Goal */}
        <div>
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Target className="h-4 w-4 text-primary" />
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
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Activity className="h-4 w-4 text-primary" />
            Weekly Workout Frequency *
          </Label>
          <Select value={userData.workoutFrequency.toString()} onValueChange={(value) => setUserData(prev => ({ ...prev, workoutFrequency: Number(value) }))}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Sedentary (No exercise)</SelectItem>
              <SelectItem value="1">1-2 times/week</SelectItem>
              <SelectItem value="3">3-4 times/week</SelectItem>
              <SelectItem value="5">5-6 times/week</SelectItem>
              <SelectItem value="7">7+ times/week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cuisine Preference */}
        <div>
          <Label className="text-sm font-medium">Preferred Cuisine</Label>
          <Select value={userData.cuisine} onValueChange={(value: "mediterranean" | "asian" | "american" | "middle-eastern" | "mixed") => setUserData(prev => ({ ...prev, cuisine: value }))}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mediterranean">Mediterranean</SelectItem>
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="american">American</SelectItem>
              <SelectItem value="middle-eastern">Middle Eastern</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Language */}
        <div>
          <Label className="text-sm font-medium">Preferred Language</Label>
          <Select value={userData.language} onValueChange={(value: "en" | "he") => setUserData(prev => ({ ...prev, language: value }))}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="he">Hebrew</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Kosher Option */}
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="kosher"
            checked={userData.isKosher}
            onCheckedChange={(checked) => setUserData(prev => ({ ...prev, isKosher: checked as boolean }))}
            className="border-primary/30"
          />
          <Label htmlFor="kosher" className="text-sm font-medium cursor-pointer">Kosher Diet</Label>
        </div>

        <Button 
          onClick={handleCalculate}
          className="w-full h-12 text-lg font-semibold button-hover"
        >
          Calculate My Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default FitnessCalculator;