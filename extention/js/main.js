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
//      user entered more than 20 minutes
const noteText = modalWindow.querySelector("[note-js]");

// === For closing window ===

// Removes text in inputs and makes window invisible
function closeModal() {
    modalWindow.style.display = "none";
    bonusDescField.value = '';
    timeInputField.value="00:00";
}

// To submit adding time
submitButtonWindow.addEventListener("click", () => {
    // Getting data from fields
    const timeInput = timeInputField.value.split(":");
    let minutes = Number.parseInt(timeInput[0]);
    let seconds = Number.parseInt(timeInput[1]);
    const bonusDesc = bonusDescField.value;
    
    // Check if numbers are not numbers
    if (Number.isNaN(minutes)) minutes = 0;
    if (Number.isNaN(seconds)) seconds = 0;
    
    // If user entered no time, just close window
    if (minutes === 0 && seconds === 0) {
        closeModal();
        return;
    } 
    
    // Check if user entered more than 20 minutes 
    // (20mins * 60s = 1200s).
    // If yes, show note about it
    if (minutes * 60 + seconds > 1200) {
        noteText.textContent = "Можно добавить не более 20 минут за раз";
        noteText.style.display = "block";
        return;
    }
    
    // Check if we have enough time on bonus account
    if (bonus.toSeconds() < seconds + minutes * 60) {
        noteText.textContent = "Бонусов недостаточно";
        noteText.style.display = "block";
        console.log("Not enough time on bonus account");
        return;
    }
    
    // Add time to main account 
    time.add(seconds, minutes); // No need for adding hours
    account.textContent = time.toString();
    
    // Substract time from bonus account
    bonus.substract(seconds, minutes);
    bonusAccount.textContent = bonus.toString();
    
    // For debugging
    console.log("Entered time: ", `${minutes}:${seconds}`);
    console.log("Bonus desc: ", bonusDesc);
    console.log("time: ", time.toString());
    
    closeModal();
});
cancelButtonWindow.addEventListener("click", closeModal);

// ======== For timer ========
const timer = new Timer();
