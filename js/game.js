class Game {
    constructor (configs) {
        this.htmlElement = configs.htmlElement;
        this.columns = configs.columns;
        this.rows = configs.rows;
        this.zoom = configs.zoom;
        this.mines = configs.mines;
        this.input = new Input(this.htmlElement);
        this.blocksMarkedWithFlag = 0;
        this.scoreboard = null;
        this.field = null;
        this.started = false;
        this.ended = false;
        this.win = false;
        this.time = 0;
        this.timer = null;
        this.anyBlockSelected = false;
        this.htmlElement.style.borderWidth = 2 * this.zoom + "px";
        this.htmlElement.style.padding = 5 * this.zoom + "px";
    };

    initialize() {
        //Case (false|0|null|undefined) apply default configs
        this.columns = this.columns || 9;
        this.rows = this.rows || 9;
        this.zoom = this.zoom || 2;
        this.mines = this.mines || Math.floor( (this.rows * this.columns) / 8 );

        this.scoreboard = new Scoreboard();
        this.htmlElement.appendChild(this.scoreboard.htmlElement);
        this.scoreboard.initialize();

        let fieldConfigs = {
            columns : this.columns,
            rows : this.rows,
            mines : this.mines,
        }
        this.field = new Field(fieldConfigs);
        this.htmlElement.appendChild(this.field.htmlElement);
        this.field.initialize();

        var loop = () => {
            this.update();
            requestAnimationFrame(loop);
        };
        loop();
    };

    update() {
        this.input.update();
        this.scoreboard.update();
        this.field.update();
    };

    start() {
        clearInterval(this.timer);
        this.timer = setInterval( () => {
            this.time++;
        }, 1000);
        this.time = 0;
        this.started = true;
        this.ended = false;
    };

    reboot() {
        clearInterval(this.timer);
        this.time = 0;
        this.started = false;
        this.ended = false;
        this.blocksMarkedWithFlag = 0;
        this.win = false;
        this.field.recreateField();
    };

    end() {
        this.started = false;
        this.ended = true;
        if (!game.win) this.field.revealAllField();
    };
}