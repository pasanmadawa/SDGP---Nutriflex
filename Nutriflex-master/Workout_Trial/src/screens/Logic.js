


export function calculateBMRMaleWithActivity(weightKg, heightCm, ageYears, activityLevel) {
    // Constants for the Harris-Benedict equation for males
    const constantA = 88.362;
    const constantB = 13.397;
    const constantC = 4.799;
    const constantD = 5.677;

    // Calculate BMR
    //const bmr = constantA + (constantB * weightKg) + (constantC * heightCm) - (constantD * ageYears);

    const a = (constantB * weightKg);
    const z = (constantC * heightCm);
    const b = z/4.6;
    const c = (constantD * ageYears);
    const d = a + b + constantA;
    bmr = d - c;
    
    // Apply TDEE multiplier based on activity level
    let tdeeMultiplier;
    switch (activityLevel) {
        case 'sedentary':
            tdeeMultiplier = 1.2;
            break;
        case 'lightly active':
            tdeeMultiplier = 1.375;
            break;
        case 'moderately active':
            tdeeMultiplier = 1.55;
            break;
        case 'very active':
            tdeeMultiplier = 1.725;
            break;
        default:
            tdeeMultiplier = 1.2; // Default to sedentary
            break;
    }

    // Calculate TDEE
    const tdee = bmr * tdeeMultiplier;

    return { bmr, tdee };
}


export function calculateHealthyCalorieDeficitMale(tdee, age) {
    let deficitRange;
    // Determine the deficit range based on age
    if (age >= 15 && age <= 25) {
        deficitRange = 500; // deficit range for ages 15-25
    } else if (age > 25 && age <= 35) {
        deficitRange = 600; // deficit range for ages 25-35
    } else if (age > 35 && age <= 45) {
        deficitRange = 700; // deficit range for ages 35-45
    } else if (age > 45 && age <= 55) {
        deficitRange = 800; // deficit range for ages 45-55
    } else if (age > 55 && age <= 65) {
        deficitRange = 900; // deficit range for ages 55-65
    } else {
        deficitRange = 500; // Default to 500 calorie deficit if age is outside provided ranges
    }


    const healthyCalorieDeficit = tdee - deficitRange;

    return healthyCalorieDeficit;
}



export function calculateBMRFemaleWithActivity(weightKg, heightCm, ageYears, activityLevel) {
    // Constants for the Harris-Benedict equation for females
    const constantA = 447.593;
    const constantB = 9.247;
    const constantC = 3.098;
    const constantD = 4.330;


    //const bmr = constantA + (constantB * weightKg) + (constantC * heightCm) - (constantD * ageYears);
    const a = (constantB * weightKg);
    const z = (constantC * heightCm);
    const b = z/4.6;
    const c = (constantD * ageYears);
    const d = a + b + constantA;
    bmr = d - c;
    

    let tdeeMultiplier;
    switch (activityLevel) {
        case 'sedentary':
            tdeeMultiplier = 1.2;
            break;
        case 'lightly active':
            tdeeMultiplier = 1.375;
            break;
        case 'moderately active':
            tdeeMultiplier = 1.55;
            break;
        case 'very active':
            tdeeMultiplier = 1.725;
            break;
        default:
            tdeeMultiplier = 1.2; // Default to sedentary
            break;
    }

    // Calculate TDEE
    const tdee = bmr * tdeeMultiplier;
    return { bmr, tdee };
}


export function calculateHealthyCalorieDeficitFemale(tdee, age) {
    let deficitRange;
    // Determine the deficit range based on age
    if (age >= 15 && age <= 25) {
        deficitRange = 500; // deficit range for ages 15-25
    } else if (age > 25 && age <= 35) {
        deficitRange = 600; // deficit range for ages 25-35
    } else if (age > 35 && age <= 45) {
        deficitRange = 700; // deficit range for ages 35-45
    } else if (age > 45 && age <= 55) {
        deficitRange = 800; // deficit range for ages 45-55
    } else if (age > 55 && age <= 65) {
        deficitRange = 900; // deficit range for ages 55-65
    } else {
        deficitRange = 500; // Default to 500 calorie deficit if age is outside provided ranges
    }

    // Calculate healthy calorie deficit
    const healthyCalorieDeficit = tdee - deficitRange;

    return healthyCalorieDeficit;
}


export function calorieBalancer(foodCal, deficit){
    const nextMeal = 0;
    if((deficit/3) < foodCal){
        nextMeal = (deficit/3) - (foodCal - (deficit/3));
    } else{
        nextMeal = (deficit/3) + ((deficit/3) - foodCal);
    }
    
    return { nextMeal };
}