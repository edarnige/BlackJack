class Card {
    constructor(svg_card) {
        this.recto = "img_svg/" + svg_card;
        this.verso = "img_svg/recto.svg";
        let num = parseInt(svg_card) % 13;
        if (num > 10 || num === 0) {
            this.value = 10;
        } else {
            this.value = num

        }

    }

    flip() {

    }

}