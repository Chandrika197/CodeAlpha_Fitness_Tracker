// Workout state array
// Workout state array
let workouts = [];

// Estimated calories burned per minute for an average person (~70kg)
const calorieRates = {
    running: 11.4,  // ~684 kcal/hour
    cycling: 7.5,   // ~450 kcal/hour
    swimming: 8.0,  // ~480 kcal/hour
    walking: 4.5,   // ~270 kcal/hour
    yoga: 3.0       // ~180 kcal/hour
};

// DOM Elements
const workoutForm = document.getElementById('workout-form');
const exerciseSelect = document.getElementById('exercise');
const durationInput = document.getElementById('duration');
const logTableBody = document.getElementById('log-table-body');
const totalWorkoutsEl = document.getElementById('total-workouts');
const totalCaloriesEl = document.getElementById('total-calories');

// Function to update the dashboard summaries
function updateSummary() {
    const totalWorkouts = workouts.length;
    const totalCalories = workouts.reduce((sum, item) => sum + item.calories, 0);

    totalWorkoutsEl.innerText = totalWorkouts;
    totalCaloriesEl.innerText = `${Math.round(totalCalories)} kcal`;
}

// Function to render the rows into the table
function renderTable() {
    logTableBody.innerHTML = '';

    workouts.forEach((workout, index) => {
        const row = document.createElement('tr');

        // Capitalize first letter for display
        const displayExercise = workout.exercise.charAt(0).toUpperCase() + workout.exercise.slice(1);

        row.innerHTML = `
            <td><strong>${displayExercise}</strong></td>
            <td>${workout.duration} mins</td>
            <td>${Math.round(workout.calories)} kcal</td>
            <td>
                <button class="delete-btn" onclick="deleteWorkout(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;

        logTableBody.appendChild(row);
    });
}

// Form submit event handler
workoutForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const selectedExercise = exerciseSelect.value;
    const duration = parseInt(durationInput.value);

    // Dynamic Calculation: Rate * Duration
    const calculatedCalories = calorieRates[selectedExercise] * duration;

    // Add calculated data to state array
    workouts.push({ 
        exercise: selectedExercise, 
        duration: duration, 
        calories: calculatedCalories 
    });

    // Refresh layout views
    renderTable();
    updateSummary();

    // Reset fields smoothly
    workoutForm.reset();
});

// Function to remove an entry from the list
window.deleteWorkout = function(index) {
    workouts.splice(index, 1);
    renderTable();
    updateSummary();
};