import { Time, Timer } from "./classes.js";

// For testing
const time = new Time(1, 20, 20);
const bonus = new Time(1);

const account = document.querySelector("[main-account]");
const bonusAccount = document.querySelector("[bonus-account]");
const addButton = document.querySelector("[add-button]");
const modalWindow = document.querySelector("[modal-window]");

// To check if class Time is correctly shown
account.textContent = time.toString();
bonusAccount.textContent = bonus.toString();

//Opens modal window
addButton.addEventListener("click", () => {
    noteText.style.display = "none";
    modalWindow.style.display = "flex";
});

// Buttons in modal window
const submitButtonWindow = modalWindow.querySelector("[submit-btn]");
const cancelButtonWindow = modalWindow.querySelector("[cancel-btn]");

// Fields in modal window to fill
const bonusDescField = modalWindow.querySelector("[bonus-desc]");
const timeInputField = modalWindow.querySelector("[time-input]");

// Text that shows up if:
//      not enough time on bonus account;
//      user entered more than 20 minutes.
const noteText = modalWindow.querySelector("[note-js]");

// === For closing window ===

// Removes text in inputs and hides modal window
function closeModal() {
    modalWindow.style.display = "none";
    bonusDescField.value = '';
    timeInputField.value="00:00";
}

// To close window when user clicked outside the window
modalWindow.addEventListener("click", (event) => {
    if (event.target === modalWindow) {
        closeModal();
        console.log("Окно закрыто по клику вне области");
    }
});

// To submit adding time
submitButtonWindow.addEventListener("click", () => {
    // If entered time contains empty number 
    // like "--:12", "12:--" or "--:--"
    if (timeInputField.value === '') {
        noteText.textContent = "Во всех полях должны быть числа (хотя бы нолики)";
        noteText.style.display = "block";
        return;
    }
    
    // Get data from fields
    const timeInput = timeInputField.value.split(":");
    const minutes = Number.parseInt(timeInput[0]);
    const seconds = Number.parseInt(timeInput[1]);
    const bonusDesc = bonusDescField.value; // Will be used in localStorage
    
    
    // If user entered no time, just close window
    if (minutes === 0 && seconds === 0) {
        closeModal();
        return;
    } 
    
    // Check if user entered more than 20 minutes. 
    // If yes, show note about it.
    // 1200 is 20 minutes in seconds
    if (minutes * 60 + seconds > 1200) {
        noteText.textContent = "Можно добавить не более 20 минут за раз";
        noteText.style.display = "block";
        return;
    }
    
    // Check if there is enough time on bonus account
    if (bonus.toSeconds() < seconds + minutes * 60) {
        noteText.textContent = "Бонусов, увы, недостаточно";
        noteText.style.display = "block";
        return;
    }
    
    // Add time to main account 
    time.add(seconds, minutes); // No need for adding hours
    account.textContent = time.toString();
    
    // Substract time from bonus account
    bonus.substract(seconds, minutes);
    bonusAccount.textContent = bonus.toString();
   
    closeModal();
});
// Just hides the window
cancelButtonWindow.addEventListener("click", closeModal);

// ======== For timer ========
const timer = new Timer();

const timerField = document.querySelector("[timer-js]");

timerField.addEventListener("input", () => {
    if (timerField.value === '') {
        console.log("timerField is empty or incorrect");
        return;
    }
    
    // Get data from timer
    const timerInput = timerField.value.split(":");
    const hours = Number.parseInt(timerInput[0]) || 0;
    const minutes = Number.parseInt(timerInput[1]) || 0;
    const seconds = Number.parseInt(timerInput[2]) || 0;
    
    if (hours === 0 && minutes === 0 && seconds === 0) {
        console.log("all numbers are 0", ", timeField.value = ", timerField.value);
        return;
    }
    
    if (time.toSeconds() < hours * 3600 + minutes * 60 + seconds) {
        console.log("Not enough time");
        return;
    }
    time.substract(seconds, minutes, hours);
    account.textContent = time.toString();
    
    timer.set(seconds, minutes, hours);    
});

const startTimerBtn = document.querySelector("[]");