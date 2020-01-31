class Display {
    constructor (configs) {
        this.zoom = configs.zoom;
        this.parent = configs.parent;
        this.htmlElement = document.createElement("div");
        this.htmlElement.id = 'lcd';
        this.cell1 = null;
        this.cell2 = null;
        this.cell3 = null;
    };

    initialize() {
        this.cell1 = document.createElement("img");
        this.htmlElement.appendChild(this.cell1);
        setImage("lcd_1", this.cell1, this.zoom);
 
        this.cell2 = document.createElement("img");
        this.htmlElement.appendChild(this.cell2);
        setImage("lcd_2", this.cell2, this.zoom);

        this.cell3 = document.createElement("img");
        this.htmlElement.appendChild(this.cell3);
        setImage("lcd_3", this.cell3, this.zoom);
    };

    update() {


    };

}