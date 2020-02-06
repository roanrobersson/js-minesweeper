class Scoreboard {
    constructor () {
        this.htmlElement = document.createElement("div");
        this.htmlElement.id = 'scoreboard';
        this.lcdMines = null;
        this.lcdTime = null;
        this.button = null;
    };

    initialize() {
        this.lcdMines = new Lcd();
        this.htmlElement.appendChild(this.lcdMines.htmlElement);
        this.lcdMines.initialize();

        this.button = new Button();
        this.htmlElement.appendChild(this.button.htmlElement);
        this.button.initialize();

        this.lcdTime = new Lcd();
        this.htmlElement.appendChild(this.lcdTime.htmlElement);
        this.lcdTime.initialize();
    };

    update() {
        this.lcdMines.value = game.mines - game.markedBlocks;
        this.lcdTime.value = game.time;

        this.lcdMines.update();
        this.button.update();
        this.lcdTime.update();
    };
}