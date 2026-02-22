//Event listener to count characters in the textarea
const textArea = document.querySelector("[js-textarea]");
const charCount = document.querySelector("[js-char-count]");

textArea.addEventListener("input", function () {
          const count = textArea.value.replace(/[^a-zA-Z0-9а-яА-ЯёЁ]/g, "").length;
          charCount.textContent = count;
          
          textArea.style.boxShadow = `${count < 40 ? "red" : "green"} 0 0 5px`;
});
