'use strict';

let score0El = document.querySelector("#score--0");
let score1El = document.getElementById("score--1");
let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");
let player0El = document.querySelector(".player--0")
let player1El = document.querySelector(".player--1")
let diceEl = document.querySelector(".dice");
let btnNew = document.querySelector(".btn--new");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");


// Starting Conditions
let scores, currentScore, activePlayer, playing;

const init = () => {
    player0El.classList.remove("player--winner", "player--active");
    player1El.classList.remove("player--winner", "player--active");

    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    btnRoll.classList.remove("hidden");
    btnHold.classList.remove("hidden");

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

}

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

init();

// Rolling dice functionality
btnRoll.addEventListener("click", () => {

    if (playing) {

        // Generate random number
        let dice = Math.trunc(Math.random() * 6) + 1;

        // Display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `images/dice-${dice}.png`;

        // Check if rolled 1
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }

        // switch Player
        else {
            switchPlayer();
        }
    }
})

// Hold functionality
btnHold.addEventListener("click", () => {
    if (playing) {
        //Add currentScore to active player score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //Check if 100? finish game
        if (scores[activePlayer] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            diceEl.classList.add("hidden");
            btnRoll.classList.add("hidden");
            btnHold.classList.add("hidden");
        }

        //Switch user
        switchPlayer();
    }
})

// New Game functionality
btnNew.addEventListener("click", init)