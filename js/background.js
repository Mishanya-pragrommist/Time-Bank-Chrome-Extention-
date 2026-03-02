// background.js
import * as Classes from "./classes.js";

// Creating global objects
// There also will be black list and stuff for workmode 

/* ===================================================================
   Main.js
   =================================================================== */

const maintime = new Classes.Time(2, 20, 0);
const bonustime = new Classes.Time(1, 0, 0);
const timer = new Classes.Timer(0, 0, 0);
// Buttons
let startPauseTimerBtnColor = "grey";
let startPauseTimerBtnText = "Запустить";
let stopTimerBtnColor = "grey";
let presetsColor = "orange";

console.log("Background script started!");

// Convert Time object to seconds
function timeToSeconds(time) {
    return time.hours * 3600 +
        time.minutes * 60 + 
        time.seconds;
}

// Listen requests from main.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    // Send data to main.js
    if (request.action === "MAIN_GET_TIME_DATA") {
        sendResponse({
            mainSeconds: timeToSeconds(maintime),
            bonusSeconds: timeToSeconds(bonustime),
            
            timerSeconds: timeToSeconds(timer.time),
            timerState: timer.state,
            
            startPauseTimerBtnColor: startPauseTimerBtnColor,
            startPauseTimerBtnText: startPauseTimerBtnText,
            stopTimerBtnColor: stopTimerBtnColor,
            presetsColor: presetsColor
        });
    }
    
    // If main.js requests to start timer
    if (request.action === "MAIN_START_TIMER") {
        timer.start();
        sendResponse({ status: "success" });
    }
    
    // Synchronize data with main.js
    if (request.action === "MAIN_UPDATE_TIME_DATA") {
        const payload = request.payload;
        
        // Convert received seconds to Time objects
        maintime.setTime(Classes.secondsToTime(payload.mainSeconds));
        bonustime.setTime(Classes.secondsToTime(payload.bonusSeconds));
        timer.setTime(Classes.secondsToTime(payload.timerSeconds));
        timer.state = payload.timerState;
        
        startPauseTimerBtnColor = payload.startPauseTimerBtnColor;
        startPauseTimerBtnText = payload.startPauseTimerBtnText;
        stopTimerBtnColor = payload.stopTimerBtnColor;
        presetsColor = payload.presetButtonsColor;
        
        console.log("Данные в фоне успешно синхронизированы!");
        console.log("Account: ", maintime.toString(), ", bonus: ", bonustime.toString(), ", timer: ", timer.time.toString());
        // Обязательно отвечаем попапу, что всё прошло хорошо
        sendResponse({ status: "success" });
    }

    // Возвращаем true, если sendResponse будет вызван асинхронно (хорошая практика)
    return true; 
});
