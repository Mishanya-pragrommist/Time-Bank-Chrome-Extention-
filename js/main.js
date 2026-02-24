import { Time, Timer } from "./classes.js";

// For testing
const maintime = new Time(1, 20, 20);
const bonus = new Time(1);

const account = document.querySelector("[main-account]");
const bonusAccount = document.querySelector("[bonus-account]");
const addButton = document.querySelector("[add-button]");
const modalWindow = document.querySelector("[modal-window]");

// To check if class Time is correctly shown
account.textContent = maintime.toString();
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
    maintime.add(seconds, minutes); // No need for adding hours
    account.textContent = maintime.toString();
    
    // Substract time from bonus account
    bonus.substract(seconds, minutes);
    bonusAccount.textContent = bonus.toString();
   
    closeModal();
});
// Just hides the window
cancelButtonWindow.addEventListener("click", closeModal);

// ======== For timer ========
const timer = new Timer(0, 0, 0);

const timerField = document.querySelector("[timer-js]");
const startTimerBtn = document.querySelector("[start-timer]");
const stopTimerBtn = document.querySelector("[stop-timer]");

// Sets button color
// Also disables it if "grey" is entered, 
// and undisables if any other color is entered
function changeButtonColor(btn, color) {
    // Remove old styles
    btn.classList.remove("green-button", "orange-button", "red-button");

    // Check entered color
    if (color === "grey") {
        // If button is default, block it
        btn.disabled = true;
    }
    else {
        // Unblock button
        btn.disabled = false;
        btn.classList.add(`${color}-button`);
    }
}

// Set basic color of start button
changeButtonColor(startTimerBtn, "grey");
changeButtonColor(stopTimerBtn, "grey");

// Automaticly recount account on timer input change
timerField.addEventListener("input", () => {
    // For new entered time
    let hours = 0, minutes = 0, seconds = 0;
    
    // If input is not empty, count time in it.
    if (timerField.value !== "") {
        const timerInput = timerField.value.split(":");
        hours = Number.parseInt(timerInput[0]) || 0;
        minutes = Number.parseInt(timerInput[1]) || 0;
        seconds = Number.parseInt(timerInput[2]) || 0;
    }
    
    // Return the old time that timer has right now
    if (timer.hasTime()) {
        maintime.add(timer.time.seconds, timer.time.minutes, timer.time.hours);
    }

    // Seconds in input that user just entered
    const newInputSeconds = hours * 3600 + minutes * 60 + seconds;
    
    // Check if we have enough time in account
    if (maintime.toSeconds() < newInputSeconds) {
        console.log("Not enough time in account");
        
        // Return time from account
        maintime.substract(timer.time.seconds, timer.time.minutes, timer.time.hours);
        
        // Update time input
        timerField.value = timer.time.toString(); 
        return;
    }

    maintime.substract(seconds, minutes, hours);

    // Save entered time for next input
    timer.set(seconds, minutes, hours);

    // Update UI
    account.textContent = maintime.toString();
    
    // If there is time in input, unblock start button.
    // Otherwise, block the button 
    changeButtonColor(startTimerBtn, 
                      (seconds > 0 ||
                       minutes > 0 || 
                       hours > 0) ? 
                      "green" : "grey");
});

startTimerBtn.addEventListener("click", () => {
    if (timerField.value === '') {
        console.log("timerField is empty or incorrect");
        return;
    }
    
    // Block start btn and unblock stop btn
    changeButtonColor(startTimerBtn, "grey");
    changeButtonColor(stopTimerBtn, "red");
    
    timerField.disabled = true; // Block input
    timer.start();
});

// Stop button
stopTimerBtn.addEventListener("click", () => {
    timerField.disabled = false; // Unblock input
    if (!timer.hasTime()) {
        console.log("Timer has no time");
        return;
    }
    
    console.log("Account: ", maintime.toString(), ", timer: ", timer.time.toString());

    // Add time and refresh account value
    maintime.add(timer.time.seconds, 
             timer.time.minutes,
             timer.time.hours);
    account.textContent = maintime.toString();
    
    // Reset timer and update UI
    timer.reset();
    timerField.value = "00:00:00";
    
    changeButtonColor(stopTimerBtn, "grey");
    
    timer.stop();
});

// Preset buttons
const presetButtons = document.querySelectorAll("[preset-btn]");
presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const presetValue = Number(btn.value); // Minutes
        
        // Return time from timer 
        // to account before everything else
        if (timer.hasTime()) {
            maintime.add(timer.time.seconds, 
                     timer.time.minutes,
                     timer.time.hours);
           
            timer.reset();
        }
        
        // If preset is -1, set all time we have,
        // otherwise set time that equals to button value
        if (presetValue < 0) {
            timer.setTime(maintime);
            maintime.reset();
        }
        else {
            timer.set(0, presetValue, 0); 
            maintime.substract(0, presetValue, 0); 
        }
        
        // Update UI
        account.textContent = maintime.toString();
        timerField.value = timer.time.toString();
        
        // Unblock start button
        changeButtonColor(startTimerBtn, "green");
    });
});
