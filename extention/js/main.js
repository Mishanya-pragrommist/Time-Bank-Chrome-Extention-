import { Time } from "./classes.js";

const time = new Time(1, 20, 20);
console.log(time.toString());
const account = document.querySelector("[main-account]");
const bonus = document.querySelector("[bonus-account]");
const addButton = document.querySelector("[add-button]");
const cancelButton = document.querySelector("[cancel-button]");
const bonusDescription = document.querySelector("[bonus-description]");

account.textContent = time.toString();
bonus.textContent = time.toString();

addButton.addEventListener("click", () => {
    console.log("blyat");
    cancelButton.style.display = "block";
    bonusDescription.style.display = "block";
});