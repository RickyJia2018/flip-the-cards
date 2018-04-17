/*
 * Create a list that holds all of your cards
 */

let card = document.getElementsByClassName('card');
let cards = [...card];
let openList = [];
let deck = document.getElementsByClassName('deck')[0];
let restart = document.getElementsByClassName('restart')[0];
let moves = document.getElementsByClassName("moves")[0];


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

function renderShuffledCards(cards){
    for (let i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
}

shuffle(cards);
renderShuffledCards(cards);

restart.addEventListener('click', function(){
    shuffle(cards);
    renderShuffledCards(cards);
    moves.innerText = 0;
});

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
        var card = this;
        // setTimeout(function () {
            displaySymble(card);
        // }, 1000);
    });
}

function displaySymble(card) {
    console.log(openList);
    card.classList.add("open", "show");

    addCardNameToOpenList(card);
}

function addCardNameToOpenList(card) {
    moves.innerText = Number(moves.innerText) + 1;

    card.classList.add("disabled");

    if (openList.length == 0) {
        openList.push(card);
    } else {
        if (openList[0].getElementsByTagName("i")[0].className == card.getElementsByTagName("i")[0].className) {
            Match(openList[0], card);
        } else {
            DoNotMatch(openList[0], card);
        }
    }
}

function Match(card1, card2) {
    openList = [];
    card1.classList.add("match");
    card2.classList.add("match");
}

function DoNotMatch(card1, card2) {
    openList = [];
    setTimeout(function () {
        card1.classList.remove("open", "show", "disabled");
        card2.classList.remove("open", "show", "disabled");
    }, 1000);
}

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


