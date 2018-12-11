class Card {
    constructor(card_num) {
        this.position = "deck";
        this.recto = "img_svg/recto.svg";
        this.src = this.recto;
        let num = parseInt(card_num) % 13;
        this.verso = "img_svg/" + card_num + ".svg";
        if (num > 10 || num === 0) {
            this.value = 10;
        } else {
            this.value = num

        }

    }

    add_to_deck(id_deck_div) {
        this.src = this.verso;
        this.position = id_deck_div;
        $('#deck').children().last().remove();
        $("#" + id_deck_div).append("<img class='card' src='" + this.src + "' alt='" + this.value + "'/>")
    }

    remove() {
        this.src = this.recto;
        $('#' + this.position).children().last().remove();


    }

}