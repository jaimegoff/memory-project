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
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//function to create game board

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 let deck = document.querySelectorAll ('.card');
 let clickedCards = [];
 let matchedCards = [];

 deck.forEach(function(card){
   card.addEventListener('click', function(e){
     clickedCards.push (card);
     card.classList.add('open','show');

//setTimeout function
if (clickedCards.length === 2) {
       setTimeout (function() {
         clickedCards.forEach(function (card) {
           card.classList.remove('open','show');
       });
       clickedCards= [];

     }, 1000);
checkMatch ();
       }
     });
   });

//Checking Match function
function checkMatch() {
if (
  clickedCards[0].firstElementChild.className ===
  clickedCards[1].firstElementChild.className
){
  gotMatch ();
  matchedCards.push(clickedCards[0], clickedCards[1])
  console.log('Match!');
} else {
  console.log ('No Match!')
}
}

//function for when cards match
function gotMatch() {
  clickedCards[0].classList.toggle('match');
  clickedCards[1].classList.toggle('match');
  console.log(matchedCards.length);
  if (matchedCards.length === 16) {
    gameOver();
  }
}

//function to disable clicks on matched cards

//function for when cards do not match

//function to count moves

//function to decrees star rating

//funciton to count time

//function to display time

//function to show modal when game is over

//function to reset game

//function to reset the time

//function to reset moves

//function to stop game when all the cards are matched

function gameOver() {
  console.log ('YOU MATCHED ALL THE CARDS!')
}

//if cards match function
