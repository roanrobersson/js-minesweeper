class Game {
    constructor (htmlElementId) {
        this.htmlElement = document.getElementById(htmlElementId);
        this.input = new Input(this.htmlElement);
        this.columns = 9;
        this.rows = 9;
        this.zoom = 2;
        this.mines = 10;
    };

    initialize() {
        let fieldConfigs = {
            columns : this.columns,
            rows : this.rows,
            zoom : this.zoom,
            mines : this.mines,
            parent : this,
            input : this.input,
        }

        let header = document.createElement("div");
        header.id = 'header';
        this.htmlElement.appendChild(header);

        this.field = new Field(fieldConfigs);
        this.htmlElement.appendChild(this.field.htmlElement);
        this.field.initialize();
        this.update();

        var loop = () => {
            this.update();
            requestAnimationFrame(loop);
        };
        loop();
    };

    update() {
        this.input.update();
        this.field.update();
    };

}