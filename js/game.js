class Game {
    constructor (htmlElementId) {
        this.htmlElement = document.getElementById(htmlElementId);
        this.input = new Input(this.htmlElement);
        this.columns = 9;
        this.rows = 9;
        this.zoom = 2;
        this.mines = Math.floor( (this.rows * this.columns) / 8 );
        this.markedBlocks= 0;
        this.scoreboard = null;
        this.field = null;
        this.started = false;
        this.ended = false;
        this.win = false;
        this.anyBlockSelected = false; 
        this.time = 0;
        this.timer = null;
    };

    initialize() {
        //Create Scoreboard
        let scoreboardConfigs = {
            zoom : this.zoom,
            parent : this,
            input : this.input,
            game : this,
        }
        this.scoreboard = new Scoreboard(scoreboardConfigs);
        this.htmlElement.appendChild(this.scoreboard.htmlElement);
        this.scoreboard.initialize();

        //Create Field
        let fieldConfigs = {
            columns : this.columns,
            rows : this.rows,
            zoom : this.zoom,
            mines : this.mines,
            parent : this,
            input : this.input,
            game : this,
        }
        this.field = new Field(fieldConfigs);
        this.htmlElement.appendChild(this.field.htmlElement);
        this.field.initialize();

        //Main loop
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
        this.markedBlocks = 0;
        this.field.reboot();
    };

    end() {
        this.started = false;
        this.ended = true;
        this.field.revealMines();
    };
}