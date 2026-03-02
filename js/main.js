import * as Classes from "./classes.js";

/* =================================================================================================================
   1. SETTINGS AND GLOBAL STATE
   ================================================================================================================= */
const MAX_BONUS_SECONDS = 1200; // 20 minutes in seconds
let maintime;
let bonusTime;
const timer = new Classes.Timer();

/* =================================================================================================================
   2. DOM ELEMENTS
   ================================================================================================================= */
// --- Main account ---
const account = document.querySelector("[main-account]");
const bonusAccount = document.querySelector("[bonus-account]");
const addButton = document.querySelector("[add-button]");

// --- Modal window for adding bonuses ---
const modalWindow = document.querySelector("[modal-window]");

const timeInputField = modalWindow.querySelector("[time-input]");
const bonusInput = modalWindow.querySelector("[time-input]");
const bonusDescField = modalWindow.querySelector("[bonus-desc]");
const noteText = modalWindow.querySelector("[note-js]");

const submitButtonWindow = modalWindow.querySelector("[submit-btn]");
const cancelButtonWindow = modalWindow.querySelector("[cancel-btn]");

// --- Timer ---
const timerField = document.querySelector("[timer-js]");
const startPauseTimerBtn = document.querySelector("[start-pause-timer]");
const stopTimerBtn = document.querySelector("[stop-timer]");
const presetButtons = document.querySelectorAll("[preset-btn]");


/* ==========================================================================================================
   3. HELPER FUNCTIONS
   ========================================================================================================== */

// Send entered data to background script
function syncDataWithBackground() {
    // Pack data into object with numbers
    const dataToSend = {
        action: "MAIN_UPDATE_TIME_DATA", // Command for background
        payload: {
            mainSeconds: maintime.toSeconds(),
            bonusSeconds: bonusTime.toSeconds(),
            timerSeconds: timer.hasTime() ? timer.time.toSeconds() : 0,
            timerState: timer.state,
            
            startPauseTimerBtnColor: startPauseTimerBtn.color,
            startPauseTimerBtnText: startPauseTimerBtn.textContent,
            stopTimerBtnColor: stopTimerBtn.color,
            presetButtonsColor: presetButtons[0].color
        }
    };
    
    // Send data
    chrome.runtime.sendMessage(dataToSend, (response) => {
        if (chrome.runtime.lastError) {
            console.warn("Фоновый скрипт спит или недоступен: ", chrome.runtime.lastError.message);
            return;
        }
        
        console.log("Фон ответил: ", response.status);
    });
}

// Change button color (accepts "green", "orange", "grey", "red")
function changeButtonColor(btn, color) {
    btn.classList.remove("green-button", "orange-button", "red-button");

    if (color === "grey") {
        btn.disabled = true;
    } else {
        btn.disabled = false;
        btn.classList.add(`${color}-button`);
    }
    btn.color = color;
}

// Close modal window and clear fields
function closeModal() {
    modalWindow.style.display = "none";
    bonusDescField.value = '';
    timeInputField.value = "00:00";
    noteText.style.display = "none"; // Hide error message on close
}


/* ====================================
   4. INITIALIZATION
   ==================================== */

changeButtonColor(startPauseTimerBtn, "grey");
changeButtonColor(stopTimerBtn, "grey");

// Get data from background script
chrome.runtime.sendMessage({ action: "MAIN_GET_TIME_DATA" }, (response) => {
    if (response) {
        console.log("Данные из фона получены:", response);
        
        maintime = Classes.secondsToTime(response.mainSeconds);
        timer.time = Classes.secondsToTime(response.timerSeconds);
        bonusTime = Classes.secondsToTime(response.bonusSeconds);
        
        account.textContent = maintime.toString();
        bonusAccount.textContent = bonusTime.toString();
        timerField.value = timer.time.toString();
        startPauseTimerBtn.textContent = response.startPauseTimerBtnText;
        
        changeButtonColor(startPauseTimerBtn, response.startPauseTimerBtnColor);
        changeButtonColor(stopTimerBtn, response.stopTimerBtnColor);
        presetButtons.forEach(btn => changeButtonColor(btn, response.presetsColor));
    }
});

/* ==================================================================================================================
   5. EVENT LISTENERS: MODAL WINDOW
   ================================================================================================================== */

// Open window
addButton.addEventListener("click", () => {
    modalWindow.style.display = "flex";
});

// Input validation in modal window
bonusInput.addEventListener("input", () => {
    if (bonusInput.value === "") {
        bonusInput.value = "00:00";
        return;
    }
    
    const numbers = bonusInput.value.split(":");
    const minutes = Number.parseInt(numbers[0]) || 0;
    const seconds = Number.parseInt(numbers[1]) || 0;
    
    if (minutes * 60 + seconds > MAX_BONUS_SECONDS) {
        bonusInput.value = "20:00";
    }
});

// Close on click outside the window
modalWindow.addEventListener("click", (event) => {
    if (event.target === modalWindow) closeModal();
});

// Cancel button
cancelButtonWindow.addEventListener("click", closeModal);

// Submit adding time
submitButtonWindow.addEventListener("click", () => {
    const timeInput = timeInputField.value.split(":");
    const minutes = Number.parseInt(timeInput[0]) || 0;
    const seconds = Number.parseInt(timeInput[1]) || 0;
    // const bonusDesc = bonusDescField.value; // For localStorage in the future
    // If entered no time, just close window
    if (minutes === 0 && seconds === 0) {
        closeModal();
        return;
    } 
    // If user tries to add more than 20 minutes
    if (minutes * 60 + seconds > MAX_BONUS_SECONDS) {
        noteText.textContent = "Можно добавить не более 20 минут за раз";
        noteText.style.display = "block";
        return;
    }
    // If there is not enough bonuses
    if (bonusTime.toSeconds() < seconds + minutes * 60) {
        noteText.textContent = "Бонусов, увы, недостаточно";
        noteText.style.display = "block";
        return;
    }
    
    // Update accounts
    maintime.add(seconds, minutes);
    account.textContent = maintime.toString();
    
    bonusTime.substract(seconds, minutes);
    bonusAccount.textContent = bonusTime.toString();
    
    closeModal();
    syncDataWithBackground();
});


/* ===================================
   6. EVENT LISTENERS: TIMER
   =================================== */

// Manual time input in timer
timerField.addEventListener("input", () => {
    let hours = 0, minutes = 0, seconds = 0;
    
    if (timerField.value !== "") {
        const timerInput = timerField.value.split(":");
        hours = Number.parseInt(timerInput[0]) || 0;
        minutes = Number.parseInt(timerInput[1]) || 0;
        seconds = Number.parseInt(timerInput[2]) || 0;
    }
    
    // Return old time to balance
    if (timer.hasTime()) {
        maintime.addTime(timer.time);
    }

    const newInputSeconds = hours * 3600 + minutes * 60 + seconds;
    
    // Check balance
    if (maintime.toSeconds() < newInputSeconds) {
        maintime.substractTime(timer.time);
        timerField.value = timer.time.toString(); 
        return;
    }
    
    // Subtract new time
    maintime.substract(seconds, minutes, hours);
    timer.set(seconds, minutes, hours);
    
    // Update UI
    account.textContent = maintime.toString();
    
    // If timer has no time, block start button
    const hasTimeInTimer = (seconds > 0 || minutes > 0 || hours > 0);
    changeButtonColor(startPauseTimerBtn, hasTimeInTimer ? "green" : "grey");
    
    syncDataWithBackground();
});

// Presets
presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const presetValue = Number(btn.value); // Value in minutes
        
        if (timer.hasTime()) {
            maintime.addTime(timer.time);
            timer.reset();
        }
        
        if (presetValue < 0) {
            timer.setTime(maintime);
            maintime.reset();
        } 
        else {
            try {
                maintime.substract(0, presetValue, 0); 
                timer.set(0, presetValue, 0);
            }
            catch (error) {
                console.log(error.message);
                return; 
            }
        }
        
        // Update UI
        account.textContent = maintime.toString();
        timerField.value = timer.time.toString();
        changeButtonColor(startPauseTimerBtn, "green");
        
        syncDataWithBackground();
    });
});

// Start timer button
startPauseTimerBtn.addEventListener("click", () => {
    if (startPauseTimerBtn.textContent === "Пауза") {
        startPauseTimerBtn.textContent = "Продолжить";
        changeButtonColor(startPauseTimerBtn, "green");
        timer.pause();
        syncDataWithBackground();
        return;
    } else if (startPauseTimerBtn.textContent === "Продолжить") {
        startPauseTimerBtn.textContent = "Пауза";
        changeButtonColor(startPauseTimerBtn, "orange");
        timer.resume();
        syncDataWithBackground();
        return;
    }
    
    if (timerField.value === '' || !timer.hasTime()) return; 
    // Change buttons states
    changeButtonColor(startPauseTimerBtn, "orange");
    changeButtonColor(stopTimerBtn, "red");
    
    // Now start button is for pause
    startPauseTimerBtn.textContent = "Пауза";
    
    // Disable timer input
    timerField.disabled = true;
    
    // Disable presets
    presetButtons.forEach(btn => changeButtonColor(btn, "grey"));
    
    timer.start();
    syncDataWithBackground();
});

// Stop button
stopTimerBtn.addEventListener("click", () => {
    if (!timer.hasTime()) return; // Just in case
    
    timerField.disabled = false; // Unblock timer field
    
    // Return remaining time to account
    maintime.addTime(timer.time);
    account.textContent = maintime.toString();
    
    // Stop and reset timer
    timer.reset();
    timer.stop();
    
    // Reset UI
    timerField.value = "00:00:00";
    changeButtonColor(stopTimerBtn, "grey"); 
    
    // Disable startPause button
    changeButtonColor(startPauseTimerBtn, "grey");
    startPauseTimerBtn.textContent = "Запустить";
    
    // Unblock presets
    presetButtons.forEach(btn => changeButtonColor(btn, "orange"));
    syncDataWithBackground();
});
