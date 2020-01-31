class Button {
    constructor (configs) {
        this.zoom = configs.zoom;
        this.parent = configs.parent;
        this.input = configs.input;
        this.htmlElement = document.createElement("img");
        this.htmlElement.id = 'button';
        this.mouseOverHere = false;
        this.pressed = false;
    };

    initialize() {
        setImage("button_start", this.htmlElement, this.zoom);

        //onmouseleave
        this.htmlElement.onmouseleave = (ev) => { 
            if (ev.button == MOUSE_LEFT && this.pressed) {
                this.pressed = false;
                setImage("button_start", this.htmlElement, this.zoom);  
            }
        };

        //onmousedown
        this.htmlElement.onmousedown = (ev) => { 
            if (ev.button == MOUSE_LEFT) {
                this.pressed = true;
                setImage("button_start_pressed", this.htmlElement, this.zoom);  
            }
        };

         //onclick
         this.htmlElement.onclick = (ev) => { 
            if (ev.button == MOUSE_LEFT) {
                this.pressed = false;
                setImage("button_start", this.htmlElement, this.zoom);  
            }
        };

    };

    update() {
        
    };
}