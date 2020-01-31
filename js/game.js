class Game {
    constructor (htmlElementId) {
        this.htmlElement = document.getElementById(htmlElementId);
        this.input = new Input(this.htmlElement);
        this.columns = 9;
        this.rows = 9;
        this.zoom = 2;
        this.mines = 10;
        this.scoreboard = null;
        this.field = null;
    };

    initialize() {
        //Create Scoreboard
        let scoreboardConfigs = {
            zoom : this.zoom,
            parent : this,
            input : this.input,
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

}