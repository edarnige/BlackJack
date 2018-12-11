class Card {
    constructor(card_id_num) {
        let num = card_id_num % 13;  // extract value from the id number
        this.face = "img_svg/" + card_id_num + ".svg";

        if (num > 10 || num === 0) {  // If it's a face
            this.value = 10;
        } else if (num !== 1) {  // else if it's not the Ace
            this.value = num
        } else { // else if it the Ace
            this.value = 11
        }
        $("#hiddenDeck").append("<img class='card' src='" + this.face + "'/>")
    }

    add_to_deck(id_deck_div) {  // add the card graphically to the deck identified by the id
        $('#deck').children().last().remove();  // remove the last card from the deck
        $("#" + id_deck_div).append("<img class='card' src='" + this.face + "'/>")  // add the representation of the card in the correct deck
    }

}