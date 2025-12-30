// 1. Get the DateTime function from the Luxon library we loaded in HTML
const DateTime = luxon.DateTime;

// 2. Activate the Date Picker on the input field
flatpickr("#birthdate", {
    dateFormat: "Y-m-d",
    maxDate: "today"
});

// 3. The Calculation Logic
const calculateButton = document.getElementById("calculate-btn");
const resultElement = document.getElementById("result");
const inputElement = document.getElementById("birthdate");

calculateButton.addEventListener("click", () => {
    const birthDateString = inputElement.value;

    // Check if user actually selected a date
    if (!birthDateString) {
        resultElement.innerText = "Please select your birth date first!";
        resultElement.style.color = "red";
        return;
    }

    // Parse the date
    const birthDate = DateTime.fromISO(birthDateString);
    const now = DateTime.now();

    // Check if date is valid
    if (!birthDate.isValid) {
        resultElement.innerText = "Invalid Date Format";
        return;
    }

    // Calculate the difference
    const age = now.diff(birthDate, ['years', 'months', 'days']).toObject();

    // Show result
    resultElement.innerHTML = `
        You are <strong>${Math.floor(age.years)}</strong> years, 
        <strong>${Math.floor(age.months)}</strong> months, and 
        <strong>${Math.floor(age.days)}</strong> days old.
    `;
    resultElement.style.color = "black";
});