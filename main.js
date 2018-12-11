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

function add_to_dealer() {
    let card = card_deck.pop();
    dealer_deck.push(card);
    card.add_to_deck("dealer");
    dealer_score += card.value;
}

function add_to_player() {
    let card = card_deck.pop();
    player_deck.push(card);
    card.add_to_deck("player");
    player_score += card.value;

}

function updateScores() {
    $("#DealerScore").text("The dealer has " + dealer_score + " points.");

    $("#PlayerScore").text("The player has " + player_score + " points.")


}

function turn(event) {

    if (this.id == "buttonCard") {
        add_to_player()

    } else if (this.id == "buttonStay") {
        for (let i = 0; i < 6; i++) {
            if (dealer_score < player_score && dealer_score < 42) {
                add_to_dealer()
            } else {
                break
            }
        }
        if (dealer_score > 42 && dealer_score > player_score) {
            alert("Vous avez gagnez !");
            reset()
        } else {
            alert("Vous avez perdu !")
        }


    } else if (this.id == "buttonStart") {
        reset()
    }
    updateScores();

    if (player_score > 42) {
        alert("Vous avez perdu !");
        reset()
    }

}

function reset() {
    for (let i = 0; i < dealer_deck.length; i++) {
        let card = dealer_deck.pop();
        card_deck.push(card);
        card.remove();
    }
    for (let i = 0; i < player_deck.length; i++) {
        let card = player_deck.pop();
        card_deck.push(card);
        card.remove();
    }
    dealer_score = 0;
    player_score = 0;
    initiate(false);
    updateScores()
}


function initiate(first = true) {
    if (first) {
        for (let i = 1; i < 43; i++) {
            let card = new Card(i);
            card_deck.push(card);
            $("#deck").append("<img class='deck-card' src='img_svg/cover.svg' alt='" + card.value +
                "' style='top:" + (84-2*i) + "px;z-index:" + i + "'/>")
        }
    }

    shuffle(card_deck);
    // for (let card of card_deck) {
    //     $("#deck").append(card)
    // }

    add_to_dealer();
    add_to_player();
    updateScores();

    $(".inter").click(turn)
}

let card_deck = [], dealer_deck = [], player_deck = [];
let dealer_score = 0, player_score = 0;
window.onload = initiate;
