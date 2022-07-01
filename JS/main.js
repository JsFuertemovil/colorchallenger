"use strict";

import { getRandom, getRandomRGB } from "./utility.js";

const sectionIntro = document.querySelector("section#intro");
const buttonSectionIntro = sectionIntro.querySelector("button");

const sectionJuego = document.querySelector("section#juego");
const failuresElement = sectionJuego.querySelector("#failures");
const scoreElement = sectionJuego.querySelector("#score");
const colorElement = sectionJuego.querySelector("div#color");
const coloresElement = sectionJuego.querySelector("ul#colores");

const sectionFinal = document.querySelector("section#final");
const buttonSectionFinal = sectionFinal.querySelector("button");
const pResult = sectionFinal.querySelector("p#result");

const maxFailures = 3;
const maxScore = 3;
const numColores = 6;

const State = {
  colors: [],
  posWinnerColor: null,
  score: 0,
  failures: 0,
};

const hideAllPanels = () => {
  sectionIntro.classList.add("hidden");
  sectionJuego.classList.add("hidden");
  sectionFinal.classList.add("hidden");
};

const showPanel = (panel) => {
  panel.classList.remove("hidden");
};

const final = () => {
  hideAllPanels();
  showPanel(sectionFinal);

  //<p id="result"></p>
  pResult.textContent = `Fallos: ${State.failures} Aciertos: ${State.score}`;

  buttonSectionFinal.addEventListener("click", () => {
    State.score = 0;
    State.failures = 0;
    main();
  });
};

const play = () => {
  hideAllPanels();
  showPanel(sectionJuego);

  // borro los li anteriores con los colores
  coloresElement.innerHTML = "";

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

coloresElement.addEventListener("click", (event) => {
  let mensaje = document.createElement("p");
  const target = event.target;

  if (target.matches("li")) {
    if (+target.getAttribute("data-index") === State.posWinnerColor) {
      scoreElement.textContent = `Aciertos: ${++State.score}`;
      if (State.score === maxScore) {
        mensaje.textContent = "Ganaste";
        final();
      } else {
        mensaje.textContent = "Acertaste el color";
        play();
      }
    } else {
      failuresElement.textContent = `Fallos: ${++State.failures}`;
      if (State.failures === maxFailures) {
        mensaje.textContent = "Game over";
        final();
      } else {
        mensaje.textContent = "Color no correcto";
      }
    }
  }
  const idJuego = document.getElementById("juego");
  idJuego.append(mensaje);
  setTimeout(() => {
    mensaje.remove();
  }, 1000);
});

const main = () => {
  hideAllPanels();
  showPanel(sectionIntro);
  buttonSectionIntro.addEventListener("click", () => {
    play();
  });
};

main();
