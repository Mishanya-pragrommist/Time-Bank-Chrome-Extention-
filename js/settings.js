import * as Classes from "./classes.js";

/* ============================================================================
   DOM elements 
   ============================================================================ */

// -- Buttons --
const updateLimitBtn = document.querySelector("[update-limit-btn]");
const updateBonusBtn = document.querySelector("[js-bonus-update]");

// -- Fields -- 
const limitField = document.querySelector("[js-limit]");
const bonusField = document.querySelector("[js-bonus-limit]");

/* ============================================================================
   INITIALIZATION
   ============================================================================ */

limitField.disabled = "true";
bonusField.disabled = "true";

/* ============================================================================
   EVENTLISTENERS for buttons
   ============================================================================ */

updateLimitBtn.addEventListener("click", () => {
    
});

limitField.addEventListener("input", () => {
    let hours = 0, minutes = 0, seconds = 0;
    
    if (limitField.value !== "") {
        const timerInput = limitField.value.split(":");
        hours = Number.parseInt(timerInput[0]) || 0;
        minutes = Number.parseInt(timerInput[1]) || 0;
        seconds = Number.parseInt(timerInput[2]) || 0;
    }
    
    
});
