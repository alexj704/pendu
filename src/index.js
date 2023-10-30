import file from "./assets/mots.json";
import Keyboard from "simple-keyboard";
import errorImg0 from "./assets/img/0.png";
import errorImg1 from "./assets/img/1.png";
import errorImg2 from "./assets/img/2.png";
import errorImg3 from "./assets/img/3.png";
import errorImg4 from "./assets/img/4.png";
import errorImg5 from "./assets/img/5.png";
import errorImg6 from "./assets/img/6.png";
import errorImg7 from "./assets/img/7.png";
import "./styles.scss";

let selectedWord;
const wordContainer = document.querySelector(".word");
const errorMsg = document.querySelector(".error-text");
const errorImgs = document.querySelector(".img-container > img");
const testedLettersContainer = document.querySelector(".tested-letters");
const newBtn = document.querySelector(".wrapper-btn");
const wrapperContainer = document.querySelector(".wrapper-container");
const wrapperText = document.querySelector(".wrapper-text");
const scoreContainer = document.querySelector(".score");
let testedLetters = [];
let goodTries = 0;
let errors = 0;
let score = 0;
const keyboard = new Keyboard({
  layout: {
    default: ["A Z E R T Y U I O P", "Q S D F G H J K L M", "W X C V B N"],
  },
  onKeyPress: (button) => handleInput(button.toUpperCase()),
});

scoreContainer.textContent = "Votre score: 0";

function reset() {
  errors = 0;
  goodTries = 0;
  testedLetters = [];
  wordContainer.textContent = "";
  testedLettersContainer.textContent = "";
  errorImgs.setAttribute("src", `./assets/img/0.png`);
}

function createWord() {
  selectedWord = file.mots[Math.floor(Math.random() * file.mots.length)]
    .toUpperCase()
    .split("");
  return selectedWord;
}

function displayWord() {
  reset();
  createWord();
  scoreContainer.textContent = `Votre score: ${score}`;
  console.log(selectedWord);
  for (let i = 0; i < selectedWord.length; i++) {
    const letterContainer = document.createElement("div");
    letterContainer.classList.add("letter");
    wordContainer.appendChild(letterContainer);
  }
}

function hangman(letter, selectedWord) {
  let indices = [];
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      goodTries++;
      indices.push(i);
    }
  }
  if (goodTries === selectedWord.length) {
    score += 100;
    setTimeout(() => {
      wrapperContainer.style.display = "block";
      wrapperText.textContent = `Bravo vous avez trouvé le bon mot ! Votre score est de ${score}`;
      newBtn.textContent = "Continuer";
    }, 300);
  }

  if (indices.length === 0) {
    errors++;
    errorImgs.setAttribute("src", `./assets/img/${errors}.png`);
    if (errors > 6) {
      setTimeout(() => {
        wrapperContainer.style.display = "block";
        wrapperText.textContent = `Vous avez perdu, le mot à trouver était ${selectedWord.join(
          ""
        )}. Votre score final est de ${score}`;
        newBtn.textContent = "Recommencer";
        score = 0;
      }, 300);
    }
  }
  const goodLetters = document.querySelectorAll(".letter");
  goodLetters.forEach((e, index) => {
    if (indices.includes(index)) {
      e.textContent = letter;
    }
  });
  console.log(indices);
}

function handleTestedLetters(input) {
  testedLetters.push(input);
  const testedLettersDiv = testedLettersContainer.appendChild(
    document.createElement("div")
  );
  testedLettersDiv.classList.add("tested-letter");
  testedLettersDiv.textContent = input;
}

function handleInput(button) {
  errorMsg.textContent = "";
  if (testedLetters.includes(button)) {
    errorMsg.textContent = "Lettre déjà testée";
  } else {
    handleTestedLetters(button);
    hangman(button, selectedWord);
  }
  console.log(testedLetters);
}

newBtn.addEventListener("click", (e) => {
  e.preventDefault();
  wrapperContainer.style.display = "none";
  displayWord();
});
