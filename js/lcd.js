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
        let v = (this.value < 1000) ?  this.roundToThreeDecimal(this.value) : 999;
        this.cell1Digit = v[0];
        this.cell2Digit = v[1];
        this.cell3Digit = v[2];
        this.updateGraphics();
    };

    updateGraphics() {
       setImage("lcd_" + this.cell1Digit, this.cell1, game.zoom);
       setImage("lcd_" + this.cell2Digit, this.cell2, game.zoom);
       setImage("lcd_" + this.cell3Digit, this.cell3, game.zoom);
    };

    roundToThreeDecimal(number) {
        return ("000" + number).slice(-3);
    };
}