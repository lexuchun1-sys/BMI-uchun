// Get DOM elements
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const resultDiv = document.getElementById('result');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');
const bmiDescription = document.getElementById('bmiDescription');

// Event listeners
calculateBtn.addEventListener('click', calculateBMI);
resetBtn.addEventListener('click', resetCalculator);

// Allow Enter key to calculate
weightInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateBMI();
});

heightInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateBMI();
});

// Calculate BMI function
function calculateBMI() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    // Validation
    if (!weight || !height) {
        alert('Please enter both weight and height');
        return;
    }

    if (weight <= 0 || height <= 0) {
        alert('Please enter valid positive numbers');
        return;
    }

    if (weight > 500) {
        alert('Please enter a realistic weight value');
        return;
    }

    if (height > 300) {
        alert('Please enter height in centimeters');
        return;
    }

    // Calculate BMI (weight in kg, height in cm)
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Display result
    displayResult(bmi);
}

// Display result function
function displayResult(bmi) {
    // Round to 1 decimal place
    const roundedBMI = bmi.toFixed(1);
    bmiValue.textContent = roundedBMI;

    // Remove previous category classes
    resultDiv.classList.remove('underweight-result', 'normal-result', 'overweight-result', 'obese-result');

    // Determine category and add styling
    let category, description, categoryClass;

    if (bmi < 18.5) {
        category = 'Underweight';
        description = 'You may need to gain weight. Consult with a healthcare provider.';
        categoryClass = 'underweight-result';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight';
        description = 'You have a healthy weight. Keep it up!';
        categoryClass = 'normal-result';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        description = 'You may need to lose some weight. Consider a healthier lifestyle.';
        categoryClass = 'overweight-result';
    } else {
        category = 'Obese';
        description = 'You should consult with a healthcare provider for guidance.';
        categoryClass = 'obese-result';
    }

    // Update display
    bmiCategory.textContent = category;
    bmiDescription.textContent = description;
    resultDiv.classList.add(categoryClass);
    resultDiv.classList.remove('hidden');

    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Reset calculator function
function resetCalculator() {
    weightInput.value = '';
    heightInput.value = '';
    resultDiv.classList.add('hidden');
    bmiValue.textContent = '0';
    bmiCategory.textContent = '';
    bmiDescription.textContent = '';
    resultDiv.classList.remove('underweight-result', 'normal-result', 'overweight-result', 'obese-result');
    
    // Focus on weight input
    weightInput.focus();
}

// Auto-focus on weight input when page loads
window.addEventListener('load', () => {
    weightInput.focus();
});
