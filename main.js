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

function initiate() {

    card_deck = [];
    for (let i = 1; i < 43; i++) {
        card_deck.push(new Card(i))
    }
    shuffle(card_deck);

    card_deck.pop().add_to_deck("dealer");

    card_deck.pop().add_to_deck("player");
}

let card_deck;
window.onload = initiate;
