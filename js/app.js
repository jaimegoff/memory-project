//Global variables
let deck = document.querySelector('.deck');
let card = document.getElementsByClassName('card');
let cards = [...card];
let clickedCards = [];
let matchedCards = [];
let moves = 0;
let starNum = document.querySelector('.stars li');
let starNumTwo = document.querySelector('.stars2');
let clockID;
let time = 0;
let modal = document.getElementById('endModal');
let span = document.getElementsByClassName("close")[0];
let stats = document.getElementById('winnerStats');
let restart = document.getElementsByClassName("fa fa-repeat")[0];
let replay = document.getElementsByClassName("modal-replay")[0];
/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//function to shuffle deck and generate new cards

function startGame() {
  const shuffledCards = shuffle(cards);
  for (var index = 0; index < shuffledCards.length; index++) {
    [].forEach.call(shuffledCards, function(card) {
      deck.appendChild(card);
    });
  }
}

//function to create game board
window.onload = startGame();
startTimer();


cards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    clickedCards.push(card);
    card.classList.add('open', 'show');

    //setTimeout function
    if (clickedCards.length === 2) {
      counterUp();
      downStar();
      checkMatch();
      disableClick();
      setTimeout(function() {
        clickedCards.forEach(function(card) {
          card.classList.remove('open', 'show');
        });
        clickedCards = [];

      }, 100);


    }
  });
});

// function to diable other cards
function disableClick() {
  setTimeout(function() {
    cards.forEach(function(card) {
      card.classList.add('noClick');
    });

  }, 1000);

};

//Checking Match function
function checkMatch() {
  if (
    clickedCards[0].firstElementChild.className ===
    clickedCards[1].firstElementChild.className
  ) {
    gotMatch();
    matchedCards.push(clickedCards[0], clickedCards[1]);

  } else {

  }
}

//function for when cards match
function gotMatch() {
  clickedCards[0].classList.toggle('match', 'disabled');
  clickedCards[1].classList.toggle('match', 'disabled');
  console.log(matchedCards.length);

  if (matchedCards.length === 14) {
    gameOver();
    stopTimer();
    displayStats();
  }
}


// function for when all the cards are matched
function gameOver() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}

replay.onclick = function () {
  restartPage();
};

function displayStats() {
  const clockTime = document.querySelector('.clock').innerHTML;
  const moves = document.querySelector('.moves').innerHTML;
  const rating = getStars();
  stats.innerHTML = `You finished the game with a time of: ${clockTime}. You made ${moves} moves. ${rating} star performance!
   <br></br> Good job!`;
};

// function to get star count
function getStars() {
  if (moves > 10) {
    starCount = 2
  };
  if (moves > 20) {
    starCount = 1
  } else {
    starCount = 3
  };
  return starCount;
};

//function to count moves

function counterUp() {
  moves++;
  const counter = document.querySelector('.moves');
  counter.innerHTML = moves;
}

//function to decrees star rating
function downStar() {
  switch (moves) {
    case 10:
      hideStar();
      break;
    case 20:
      hideStar2();
  }
}


// functions to hide stars

function hideStar() {

  starNum.style.display = "none";
  getStars();
}

function hideStar2() {

  starNumTwo.style.display = "none";
  getStars();
};





//function to count time
function startTimer() {
  clockID = setInterval(() => {
    time++;
    displayTime();
  }, 1000);

};


function stopTimer() {
  clearInterval(clockID);
};
//function to display time
function displayTime() {
  const timer = document.querySelector('.clock');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (seconds < 10) {
    timer.innerHTML = `${minutes}:0${seconds}`;
  } else {
    timer.innerHTML = `${minutes}:${seconds}`;
  }
};


//function to reset game
restart.onclick = function() {
  restartPage();
}
function restartPage () {
  window.location.reload(true);
};

// Referenced throughout Project:
// https://www.w3schools.com/jsref/met_loc_reload.asp
// https://stackoverflow.com/questions/16492401/javascript-setting-pointer-events
// https://stackoverflow.com/questions/23062548/how-can-i-put-multiple-classes-in-a-li-element
// https://www.w3schools.com/howto/howto_css_modals.asp
// https://medium.com/letsboot/memory-game-built-with-jquery-ec6099618d67
// https://matthewcranford.com/
// Mike Wales walkthrough
// Ryan Waite walkthrough
// Mentor session w/ Michael Jackson
