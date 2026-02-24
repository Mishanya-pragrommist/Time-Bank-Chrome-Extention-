// background.js
import * as Classes from "./classes.js";

// Creating global objects
// There also will be black list and stuff for workmode 
const maintime = new Classes.Time(2, 20, 0);
const bonustime = new Classes.Time(1, 0, 0);
const timer = new Classes.Timer(0, 0, 0);

console.log("Background script started!");

function timeToSeconds(time) {
    return time.hours * 3600 +
        time.minutes * 60 + 
        time.seconds;
}

// Listen requests from main.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    // If main.js asks for time
    if (request.action === "GET_TIME_DATA") {
        sendResponse({
            mainSeconds: timeToSeconds(maintime),
            bonusSeconds: timeToSeconds(bonustime),
            
            timerSeconds: timeToSeconds(timer.time),
            isTimerRunning: timer.isRunning
        });
    }
    
    // If main.js requests to start timer
    if (request.action === "START_TIMER") {
        timer.start();
        sendResponse({ status: "success" });
    }
    
    // Ловим нашу команду
    if (request.action === "UPDATE_TIME_DATA") {
        const payload = request.payload;
        
        // Распаковываем секунды обратно в классы
        
        maintime.set(Classes.secondsToTime(payload.mainSeconds));
        bonustime.set(Classes.secondsToTime(payload.bonusSeconds)); // Обновляем бонусный счет
        timer.setTime(Classes.secondsToTime(payload.timerSeconds)); // Обновляем таймер
        
        console.log("Данные в фоне успешно синхронизированы!");
        console.log("Account: ", maintime.toString(), ", bonus: ", bonustime.toString(), ", timer: ", timer.time.toString());
        // Обязательно отвечаем попапу, что всё прошло хорошо
        sendResponse({ status: "success" });
    }

    // Возвращаем true, если sendResponse будет вызван асинхронно (хорошая практика)
    return true; 
});
