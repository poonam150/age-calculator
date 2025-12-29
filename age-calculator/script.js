// --- 1. Import Luxon ---
// Since we loaded Luxon in HTML, we need to grab the "DateTime" tool from it.
const DateTime = luxon.DateTime;

// --- 2. Activate the Datepicker ---
// This turns the simple text box into a calendar popup
flatpickr("#birthdate", {
    dateFormat: "Y-m-d", // Format: 2023-11-25
    maxDate: "today"     // Block future dates
});

// --- 3. The Calculation Logic ---
// We want to run code only when the "Calculate Age" button is clicked.

const calculateButton = document.getElementById("calculate-btn");
const resultElement = document.getElementById("result");
const inputElement = document.getElementById("birthdate");

calculateButton.addEventListener("click", () => {
    
    // A. Get the user's selected date string (e.g., "2000-01-01")
    const birthDateString = inputElement.value;

    // Validation: Check if the user actually picked a date
    if (!birthDateString) {
        resultElement.innerText = "Please select your birth date first!";
        resultElement.style.color = "red";
        return; // Stop the function here
    }

    // B. Convert the string into a Luxon "DateTime" object
    const birthDate = DateTime.fromISO(birthDateString);
    
    // C. Get the current date
    const now = DateTime.now();

    // D. Check if the birth date is valid (Luxon helper)
    if (!birthDate.isValid) {
        resultElement.innerText = "Invalid Date Format";
        return;
    }

    // E. Calculate the difference
    // This is the magic of Luxon. It handles leap years and months automatically.
    const age = now.diff(birthDate, ['years', 'months', 'days']).toObject();

    // F. Display the result
    // We use Math.floor to remove decimals (though Luxon usually handles this well)
    resultElement.innerHTML = `
        You are <strong>${Math.floor(age.years)}</strong> years, 
        <strong>${Math.floor(age.months)}</strong> months, and 
        <strong>${Math.floor(age.days)}</strong> days old.
    `;
    resultElement.style.color = "black"; // Reset color in case it was red error
});