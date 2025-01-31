import { categories, alphabetLetters } from "./words.js";
import {
    drawBody,
    drawHead,
    drawInitialStructure,
    drawLeftArm,
    drawLeftLeg,
    drawRightArm,
    drawRightLeg,
} from "./canvas.js";

let chosenWord = "";
let lettersGuessed = 0;
let incorrectGuessesCount = 0;

const categoryContainer = document.getElementById("category-container");
const alphabetContainer = document.querySelector(".alphabet-container");

document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
});
const displayCategories = () => {
    Object.keys(categories).forEach((category) => {
        const button = document.createElement("button");
        button.className = "category";
        button.textContent = category;
        button.addEventListener("click", () => selectCategory(category));
        categoryContainer.appendChild(button);
    });
};
const selectCategory = (selectedCategory) => {
    document.querySelectorAll(".category").forEach((button) => {
        button.textContent.toLowerCase() === selectedCategory
            ? button.classList.add("active")
            : (button.disabled = true);
    });

    const hiddenWord = document.getElementById("hidden-word");
    hiddenWord.textContent = "";

    if (!chosenWord) {
        const wordsArray = categories[selectedCategory];
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        chosenWord = wordsArray[randomIndex].toUpperCase();
    }

    hiddenWord.classList.add("active");
    hiddenWord.innerHTML = chosenWord
        .split("")
        .map(() => '<span class="dashes">-</span>')
        .join("");
    alphabetContainer.classList.add("active");
};

const createAlphabetButtons = () => {
    const alphabet = alphabetLetters.split("");

    console.log(alphabet);
    alphabet.forEach((letter) => {
        const button = document.createElement("button");
        button.className = "letter";
        button.textContent = letter;
        button.addEventListener("click", selectLetter);
        alphabetContainer.appendChild(button);
    });
};

const selectLetter = (e) => {
    const selectedLetter = e.target.textContent;
    const chosenWordArray = chosenWord.split("");

    if (chosenWordArray.includes(selectedLetter)) {
        revealLetters(chosenWordArray, selectedLetter);

        if (chosenWordArray.length === lettersGuessed) {
            console.log("win");
        }
    } else {
        incorrectGuessesCount++;
        drawMan;
        if (incorrectGuessesCount === 6) {
        }
    }

    e.target.disabled = true;
};

const revealLetters = (chosenWordArray, selectedLetter) => {
    const dashes = document.querySelectorAll(".dashes");

    chosenWordArray.forEach((letter, index) => {
        if (letter === selectedLetter) {
            dashes[index].textconmtent = letter;
        }
    });
    console.log(dashes);
};
const drawMan = () => {
    const drawFunctions = [
        drawHead,
        drawBody,
        drawLeftArm,
        drawRightArm,
        drawLeftLeg,
        drawRightLeg,
    ];
    if (incorrectGuessesCount <= drawFunctions.length) {
        drawFunctions[incorrectGuessesCount - 1];
    }
};

const displayResult = (isWin) => {
    const h2 = document.querySelector("#results-container h2");
    h2.textContent = isWin ? "YOU WON" : "you lost";

    const p = document.querySelector("#results-container p");
    p.textContent = `the chossen word was ${chosenWord}`;

    newGame;
};
