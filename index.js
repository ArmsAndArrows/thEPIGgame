"use strict";

///BUTTONS
const rollBtn = document.querySelector(".game__roll"),
  holdBtn = document.querySelector(".game__hold"),
  restartBtn = document.querySelector(".game__restart");

//DICE

const dice = document.querySelector(".game__dice");

///PAGE STATES
const playerTotal_1 = document.querySelector(".player__score--1");
const playerTotal_2 = document.querySelector(".player__score--2");

const playerCurrent_1 = document.querySelector(".current__score--1");
const playerCurrent_2 = document.querySelector(".current__score--2");

const player1 = document.querySelector(".player--1");
const player2 = document.querySelector(".player--2");
///SAVING STUFF

let totals = [0, 0];
let currentTurnNumber = 0;
let playerFlag = 1;

///Functions

function switchPlayer() {
  document.querySelector(`.current__score--${playerFlag}`).textContent = 0;
  playerFlag = playerFlag === 1 ? 2 : 1;
  currentTurnNumber = 0;
  switchTogglers();
}

function switchTogglers() {
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
}

///ROLL BUTTON LOGIC

rollBtn.addEventListener("click", function () {
  const rolledNumber = Math.trunc(Math.random() * 6 + 1);
  dice.src = `./assets/d${rolledNumber}.png`;
  if (rolledNumber !== 1) {
    currentTurnNumber += rolledNumber;
    document.querySelector(`.current__score--${playerFlag}`).textContent =
      currentTurnNumber;
  } else {
    switchPlayer();
  }
});

// HOLD BUTTON LOGIC

holdBtn.addEventListener("click", function () {
  totals[playerFlag - 1] += currentTurnNumber;
  document.querySelector(`.player__score--${playerFlag}`).textContent =
    totals[playerFlag - 1];

  if (totals[playerFlag - 1] >= 100) {
    document
      .querySelector(`.player__win--${playerFlag}`)
      .classList.add("reveal-slow");
    document
      .querySelector(`.player__win-check--${playerFlag}`)
      .classList.add("reveal-fast");
    rollBtn.disabled = "true";
    holdBtn.disabled = "true";
  } else {
    switchPlayer();
  }
});



///RESTART BUTTON 

restartBtn.addEventListener("click", function () {
  rollBtn.disabled = "";
  holdBtn.disabled = "";
  document
    .querySelector(`.player__win--${playerFlag}`)
    .classList.remove("reveal-slow");
  document
    .querySelector(`.player__win-check--${playerFlag}`)
    .classList.remove("reveal-fast");
  totals = [0, 0];
  playerFlag = 1;
  currentTurnNumber = 0;
  playerTotal_1.textContent = 0;
  playerTotal_2.textContent = 0;
  playerCurrent_1.textContent = 0;
  playerCurrent_2.textContent = 0;
  if (player2.classList.contains("player--active")) {
    switchTogglers();
  }
});

///INTRO ANIMATION

function dispNone() {
  document.querySelector(".logo").style.display = "none";
}

function dispFlex() {
  document.querySelector(".container").style.display = "flex";
}
setTimeout(dispNone, 1300);
setTimeout(dispFlex, 1300);
