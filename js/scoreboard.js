class Scoreboard {
    constructor (configs) {
        this.zoom = configs.zoom;
        this.parent = configs.parent;
        this.input = configs.input;
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
        }
        this.lcdMines = new Display(lcdMinesConfigs);
        this.htmlElement.appendChild(this.lcdMines.htmlElement);
        this.lcdMines.initialize();

        let buttonConfigs = {
            zoom : this.zoom,
            parent : this,
            input : this.input,
        }
        this.button = new Button(buttonConfigs);
        this.htmlElement.appendChild(this.button.htmlElement);
        this.button.initialize();

        let lcdTimeConfigs = {
            zoom : this.zoom,
            parent : this,
        }
        this.lcdTime = new Display(lcdTimeConfigs);
        this.htmlElement.appendChild(this.lcdTime.htmlElement);
        this.lcdTime.initialize();
    };

    update() {
        this.lcdMines.update();
        this.button.update();
        this.lcdTime.update();
    };
}