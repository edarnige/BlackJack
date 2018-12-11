function shuffle(array) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function add_to_dealer() {  // add the top card of the deck to the dealer deck
    let card = card_deck.pop();
    dealer_deck.push(card);
    card.add_to_deck("dealer");
    dealer_score += card.value;  // Update the score with the new value
    if (card.value === 11) {
        ace_dealer++  // count the number of aces in the dealer deck
    }
}

function add_to_player() {  // add the top card of the deck to the player deck
    let card = card_deck.pop();
    player_deck.push(card);
    card.add_to_deck("player");
    player_score += card.value;  // Update the score with the new value
    if (card.value === 11) {
        ace_player++  // count the number of aces in the player deck
    }

}

function updateScores() {  // Update text to the current value of scores

    $("#DealerScore").text("The dealer has " + dealer_score + " points.");

    $("#PlayerScore").text("The player has " + player_score + " points.")


}

function buttonCard() {  // when the player hit the button card
    add_to_player();  // add the top card of the deck to the player deck

    // dealing with aces
    while (ace_player > 0) {  // while there is at least one ace not used
        if (player_score > 42) {  // if the score is too high
            player_score -= 10;  // retrieve 10 so that one ace value goes from 11 to 1
            ace_player--  // cannot use this ace anymore
        } else {
            break  // no need to change any value if the score isn't too high
        }
    }
    updateScores();

    if (player_score > 42) {
        alert("Vous avez perdu !");
        reset()
    }
}

function buttonStay() {  // when the player hit the button stay
    for (let i = 0; i < 6; i++) {  // add 6 cards maximum
        add_to_dealer();   // add the top card of the deck to the dealer deck

        // dealing with aces
        while (ace_dealer > 0) {  // while there is at least one ace not used
            if (dealer_score > 42) {  // if the score is too high
                dealer_score -= 10;  // retrieve 10 so that one ace value goes from 11 to 1
                ace_dealer--  // cannot use this ace anymore
            } else {
                break  // no need to change any value if the score isn't too high
            }
        }

        if (dealer_score > player_score || dealer_score > 42) {
            break  // stop the dealing of cards to the dealer if he is above 42 or if he's above player's score
        }
    }

    updateScores();

    if (dealer_score > 42 || player_score >= dealer_score) {
        alert("Vous avez gagnez !");
        reset()
    } else {
        alert("Vous avez perdu !");
        reset()
    }

}

function reset() {  // reset the game

    card_deck = [];  // empty the card deck
    dealer_deck = [];  // empty the dealer's deck
    player_deck = [];  // empty the player's deck

    $("#deck").html("");  // empty the card deck graphically
    $("#dealer").html("");  // empty the dealer's deck graphically
    $("#player").html("");  // empty the player's deck graphically

    dealer_score = 0;
    player_score = 0;
    ace_dealer = 0;
    ace_player = 0;
    initiate(false);
    updateScores()
}

function setDeckCards() {  // set the deck cards graphically
    for (let i = 1; i < 43; i++) {
        $("#deck").append("<img class='deck-card' src='img_svg/cover.svg' " +
            "style='top:" + (84 - 2 * i) + "px;z-index:" + i + "'/>")
    }

}

function initiate(first = true) {
    if (first) {  // if it's the first time, so not after a reset
        for (let i = 1; i < 43; i++) {  // fill the cards array with cards
            let card = new Card(i);
            cards.push(card);
        }
        // Binding of events to buttons
        $("#buttonCard").click(buttonCard);
        $("#buttonStay").click(buttonStay);
        $("#buttonStart").click(reset);
    }
    setDeckCards();  // set the deck cards graphically
    card_deck = $.extend(true, [], cards);  // card_deck is a deepcopy of cards
    shuffle(card_deck);  // shuffle the new card_deck

    add_to_dealer();  // Give a card to the dealer
    add_to_player();  // Give a card to the dealer

    updateScores();
}

let cards = [];
let card_deck = [], dealer_deck = [], player_deck = [];
let dealer_score = 0, player_score = 0;
let ace_player = 0, ace_dealer = 0;
window.onload = initiate;  // When the window is loading, do initiate
