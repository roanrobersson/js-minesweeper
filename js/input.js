var MOUSE_LEFT = 0;
var MOUSE_RIGHT = 2;

class Input {
    constructor (gameHtmlElement) {
        this.gameHtmlElement = gameHtmlElement;
        this.pressed = [];
        this.wasPressed = [];
        this.fired = []
        this.initialize();
    }; 

    initialize() {
        this.pressed[MOUSE_LEFT] = false;
        this.pressed[MOUSE_RIGHT] = false;
        this.fired[MOUSE_LEFT] = false;
        this.fired[MOUSE_RIGHT] = false;
        this.wasPressed[MOUSE_LEFT] = false;
        this.wasPressed[MOUSE_RIGHT] = false;

        this.gameHtmlElement.style.userSelect = "none";
        this.gameHtmlElement.ondragstart = (ev) => { ev.preventDefault(); }
        this.gameHtmlElement.addEventListener('contextmenu', (ev) => {
            if (ev.button == MOUSE_RIGHT) {
                ev.preventDefault();
            }
        });

        document.addEventListener("mousedown", (ev) => {
            let button = ev.button;
            this.pressed[button] = true;
            this.wasPressed[button] = false;
        });
    
        document.addEventListener("mouseup", (ev) => {
            let button = ev.button;
            this.pressed[button] = false;
            this.wasPressed[button] = true;
            this.fired[button] = false;
        }); 
    };

    update() {
        for(let i in this.fired) this.fired[i] = false;
        for(let i in this.wasPressed) {
            if (this.pressed[i] && !this.wasPressed[i] && !this.fired[i]) {
                this.fired[i] = true;
                this.wasPressed[i] = true;
            };
        }           
    };


}