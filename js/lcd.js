class Lcd {
    constructor () {
        this.htmlElement = document.createElement("div");
        this.htmlElement.id = 'lcd';
        this.cell1 = null;
        this.cell2 = null;
        this.cell3 = null;
        this.cell1Digit = "0";
        this.cell2Digit = "0";
        this.cell3Digit = "0";
        this.value = 0;
    };

    initialize() {
        this.cell1 = document.createElement("img");
        this.htmlElement.appendChild(this.cell1);
 
        this.cell2 = document.createElement("img");
        this.htmlElement.appendChild(this.cell2);

        this.cell3 = document.createElement("img");
        this.htmlElement.appendChild(this.cell3);
    };

    update() {
        if (game.ended) return;
        let valueString = "";
        if (this.value >= -99 && this.value <= 999) valueString = this.roundToThreeDecimal(this.value)
        else if (this.value < -99) valueString = "-99";
        else if (this.value > 999) valueString = "999";

        this.cell1Digit = valueString[0];
        this.cell2Digit = valueString[1];
        this.cell3Digit = valueString[2];
        setImage("lcd_" + this.cell1Digit, this.cell1, game.zoom);
        setImage("lcd_" + this.cell2Digit, this.cell2, game.zoom);
        setImage("lcd_" + this.cell3Digit, this.cell3, game.zoom);
    };
    
    roundToThreeDecimal(number) {
        return ("000" + number).slice(-3);
    };
}