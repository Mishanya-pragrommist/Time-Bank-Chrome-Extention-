import { Time } from "./classes.js";

const time = new Time(1, 20, 20);

const account = document.querySelector("[main-account]");
const bonus = document.querySelector("[bonus-account]");
const addButton = document.querySelector("[add-button]");
const modalWindow = document.querySelector("[modal-window]");

account.textContent = time.toString();
bonus.textContent = time.toString();

console.log(time.toString());

addButton.addEventListener("click", () => {
    console.log("add button works");
    modalWindow.style.display = "flex";
});

const submitButtonWindow = modalWindow.querySelector("[submit-btn]");
const cancelButtonWindow = modalWindow.querySelector("[cancel-btn]");

const bonusDescArea = modalWindow.querySelector("[bonus-desc]");
const timeInput = modalWindow.querySelector("[time-input]");

//Removes text in inputs and makes window invisible
function closeModal() {
    modalWindow.style.display = "none";
    bonusDescArea.value = '';
    timeInput.value = '00:00';
}

submitButtonWindow.addEventListener("click", closeModal);
cancelButtonWindow.addEventListener("click", closeModal);