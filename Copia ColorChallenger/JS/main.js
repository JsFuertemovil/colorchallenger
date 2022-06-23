"use strict";

const playButton = document.querySelector("#jugar");
const failuresElement = document.querySelector("#failures");
const scoreElement = document.querySelector("#score");
const colorElement = document.querySelector("div#color");
const coloresElement = document.querySelector("ul#colores");

const maxFailures = 3;
const maxScore = 3;
const numColores = 6;

const State = {
  colors: [],
  posWinnerColor: null,
  score: 0,
  failures: 0,
};

const getRandom = (max) => {
  return Math.floor(Math.random() * (max + 1));
};

const getRandomRGB = () => {
  return `RGB(${getRandom(255)},${getRandom(255)},${getRandom(255)})`;
};

const play = () => {
  for (let i = 0; i < numColores; i++) {
    State.colors[i] = getRandomRGB();
  }
  console.log(State.colors);
  failuresElement.textContent = `Fallos: ${State.failures}`;
  scoreElement.textContent = `Aciertos: ${State.score}`;

  //elegimos el color ganador
  State.posWinnerColor = getRandom(numColores - 1);

  console.log(
    "Color ganador:",
    State.posWinnerColor,
    State.colors[State.posWinnerColor]
  );

  colorElement.textContent = State.colors[State.posWinnerColor];

  const fragmentElement = document.createDocumentFragment();
  for (let i = 0; i < numColores; i++) {
    const liColor = document.createElement("li");
    //liColor.textContent = State.colors[i];
    liColor.style.cssText = `background-color:${State.colors[i]}`;
    liColor.setAttribute("data-index", i);
    fragmentElement.append(liColor);
  }
  coloresElement.append(fragmentElement);
};

playButton.addEventListener("click", play);

coloresElement.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("li")) {
    if (+target.getAttribute("data-index") === State.posWinnerColor) {
      scoreElement.textContent = `Aciertos: ${++State.score}`;
      if (State.score === maxScore) {
        alert("Ganaste!!!!!");
      } else {
        alert("Acertaste el color!");
      }
      play();
    } else {
      failuresElement.textContent = `Fallos: ${++State.failures}`;
      if (State.failures === maxFailures) {
        alert("Game over");
      } else {
        alert("Color no correcto!");
      }
    }
  }
});
