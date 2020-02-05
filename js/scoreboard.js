class Scoreboard {
    constructor (configs) {
        this.zoom = configs.zoom;
        this.parent = configs.parent;
        this.input = configs.input;
        this.game = configs.game;
        this.htmlElement = document.createElement("div");
        this.htmlElement.id = 'scoreboard';
        this.lcdMines = null;
        this.lcdTime = null;
        this.button = null;
    };

    initialize() {
        let lcdMinesConfigs = {
            zoom : this.zoom,
            parent : this,
            game : this.game,
        }
        this.lcdMines = new Lcd(lcdMinesConfigs);
        this.htmlElement.appendChild(this.lcdMines.htmlElement);
        this.lcdMines.initialize();

        let buttonConfigs = {
            zoom : this.zoom,
            parent : this,
            input : this.input,
            game : this.game,
        }
        this.button = new Button(buttonConfigs);
        this.htmlElement.appendChild(this.button.htmlElement);
        this.button.initialize();

        let lcdTimeConfigs = {
            zoom : this.zoom,
            parent : this,
            game : this.game,
        }
        this.lcdTime = new Lcd(lcdTimeConfigs);
        this.htmlElement.appendChild(this.lcdTime.htmlElement);
        this.lcdTime.initialize();
    };

    update() {
        this.lcdMines.value = this.game.mines - this.game.markedBlocks;
        this.lcdTime.value = this.game.time;

        this.lcdMines.update();
        this.button.update();
        this.lcdTime.update();
    };
}