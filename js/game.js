class Game {
    constructor (htmlElementId) {
        this.htmlElement = document.getElementById(htmlElementId);
        this.columns = 9;
        this.rows = 9;
        this.zoom = 2;
        this.mines = 10;
    };

    initialize() {
        this.htmlElement.style.userSelect = "none";
        this.htmlElement.ondragstart = (event) => { event.preventDefault(); }
        this.htmlElement.addEventListener('contextmenu', (event) => {
            if (event.button == MOUSE_RIGHT) {
                event.preventDefault();
            }
        });

        let fieldConfigs = {
            columns : this.columns,
            rows : this.rows,
            zoom : this.zoom,
            mines : this.mines,
            parent : this,
        }

        let header = document.createElement("div");
        header.id = 'header';
        this.htmlElement.appendChild(header);

        this.field = new Field(fieldConfigs);
        this.htmlElement.appendChild(this.field.htmlElement);
        this.field.initialize();
    }
}