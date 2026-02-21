import { Time, Timer } from "./classes.js";

// For testing
const time = new Time(1, 20, 20);

const account = document.querySelector("[main-account]");
const bonusAccount = document.querySelector("[bonus-account]");
const addButton = document.querySelector("[add-button]");
const modalWindow = document.querySelector("[modal-window]");

// To check if class Time is correctly shown
account.textContent = time.toString();
bonusAccount.textContent = time.toString();

//Shows modal window
addButton.addEventListener("click", () => {
    modalWindow.style.display = "flex";
});

// Buttons in modal window
const submitButtonWindow = modalWindow.querySelector("[submit-btn]");
const cancelButtonWindow = modalWindow.querySelector("[cancel-btn]");

// Fields in modal window to fill
const bonusDescField = modalWindow.querySelector("[bonus-desc]");
const timeInputField = modalWindow.querySelector("[time-input]");

// For closing window

// Removes text in inputs and makes window invisible
function closeModal() {
    modalWindow.style.display = "none";
    bonusDescField.value = '';
    timeInputField.value = '00:00';
}

submitButtonWindow.addEventListener("click", () => {
    const timeInputRaw = timeInputField.value;
    const bonusDesc = bonusDescField.value;
    
    const timeParts = timeInputRaw.split(":"); 
    const minutes = Number.parseInt(timeParts[0]);
    const seconds = Number.parseInt(timeParts[1]);
    
    const enteredTime = new Time(0, minutes, seconds);
    
    time.add(enteredTime);
    account.textContent = "";
    account.textContent = time.toString();
    
    console.log("Entered time: ", timeInputRaw);
    console.log("Bonus desc: ", bonusDesc);
    console.log("time: ", time.toString());
    closeModal();
});
cancelButtonWindow.addEventListener("click", closeModal);

// ======== For timer ========
const timer = new Timer();
