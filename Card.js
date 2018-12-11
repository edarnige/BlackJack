class Card {
    constructor(card_num) {
        this.position = "deck";
        this.cover = "img_svg/cover.svg";
        this.src = this.cover;
        let num = card_num % 13;
        this.face = "img_svg/" + card_num + ".svg";
        if (num > 10 || num === 0) {  // If it's a face
            this.value = 10;
        } else if (num !== 1) {  // else if it's not the Ace
            this.value = num
        } else { // else if it the Ace
            this.value = 11
        }

    }

    add_to_deck(id_deck_div) {
        this.src = this.face;
        this.position = id_deck_div;
        $('#deck').children().last().remove();
        $("#" + id_deck_div).append("<img class='card' src='" + this.src + "'/>")
    }

}