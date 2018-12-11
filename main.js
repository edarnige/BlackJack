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
    if (card.value === 11) {
        ace_dealer++
    }
}

function add_to_player() {
    let card = card_deck.pop();
    player_deck.push(card);
    card.add_to_deck("player");
    player_score += card.value;
    if (card.value === 11) {
        ace_player++
    }

}

function updateScores() {

    $("#DealerScore").text("The dealer has " + dealer_score + " points.");

    while (ace_player > 0) {
        if (player_score > 42) {
            player_score -= 10;
            ace_player--
        } else {
            break
        }
    }
    $("#PlayerScore").text("The player has " + player_score + " points.")


}

function turn(event) {

    if (this.id == "buttonCard") {
        add_to_player();
        updateScores();

        if (player_score > 42) {

            alert("Vous avez perdu !");
            reset()
        }

    } else if (this.id == "buttonStay") {
        for (let i = 0; i < 6; i++) {
            add_to_dealer();
            while (ace_dealer > 0) {
                if (dealer_score > 42) {
                    dealer_score -= 10;
                    ace_dealer--
                } else {
                    break
                }
            }
            if (dealer_score < player_score && dealer_score < 42) {

            } else {
                break
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


    } else if (this.id == "buttonStart") {
        reset()
    }


}

function reset() {
    for (let i = 0; i < dealer_deck.length; i++) {
        let card = dealer_deck.pop();
        card_deck.push(card);
        $("#deck").append("<img class='deck-card' src='img_svg/cover.svg' alt='" + card.value +
            "' style='top:" + (84 - 2 * card_deck.length) + "px;z-index:" + card_deck.length + "'/>")
    }
    for (let i = 0; i < player_deck.length; i++) {
        let card = player_deck.pop();
        card_deck.push(card);
        $("#deck").append("<img class='deck-card' src='img_svg/cover.svg' alt='" + card.value +
            "' style='top:" + (84 - 2 * card_deck.length) + "px;z-index:" + card_deck.length + "'/>")
    }
    $("#dealer").html("");
    $("#player").html("");
    dealer_score = 0;
    player_score = 0;
    ace_dealer = 0;
    ace_player = 0;
    initiate(false);
    updateScores()
}


function initiate(first = true) {
    if (first) {
        for (let i = 1; i < 43; i++) {
            let card = new Card(i);
            card_deck.push(card);
            $("#deck").append("<img class='deck-card' src='img_svg/cover.svg' alt='" + card.value +
                "' style='top:" + (84 - 2 * i) + "px;z-index:" + i + "'/>")
        }

        $(".button_interface").click(turn)
    }

    shuffle(card_deck);

    add_to_dealer();
    add_to_player();

    updateScores();
}

let card_deck = [], dealer_deck = [], player_deck = [];
let dealer_score = 0, player_score = 0;
let ace_player = 0, ace_dealer = 0;
window.onload = initiate;
