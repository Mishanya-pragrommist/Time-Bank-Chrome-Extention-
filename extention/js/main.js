import { Time } from "./classes.js";

const time = new Time(1, 20, 20);

const account = document.querySelector("[main-account]");
const bonus = document.querySelector("[bonus-account]");
const addButton = document.querySelector("[add-button]");
const modalWindow = document.querySelector("[modal-window]");

account.textContent = time.toString();
bonus.textContent = time.toString();

console.log(time.toString());

addButton.addEventListener("click", async () => {
    console.log("add button works");
    const response = await fetch("../html/popups/add bonus.html");
    const html = await response.text();
    
    modalWindow.innerHTML = html;
});
