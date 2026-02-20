import { Time } from "./classes.js";

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

const bonusDescArea = modalWindow.querySelector("[bonus-desc]");
const timeInput = modalWindow.querySelector("[time-input]");

// For closing window

// Removes text in inputs and makes window invisible
function closeModal() {
    modalWindow.style.display = "none";
    bonusDescArea.value = '';
    timeInput.value = '00:00';
}

// There will be added input handling in future
submitButtonWindow.addEventListener("click", closeModal);
cancelButtonWindow.addEventListener("click", closeModal);