class Button {
    constructor (configs) {
        this.zoom = configs.zoom;
        this.parent = configs.parent;
        this.input = configs.input;
        this.game = configs.game;
        this.htmlElement = document.createElement("img");
        this.htmlElement.id = 'button';
        this.mouseOverHere = false;
        this.status = "smile"; //smile|win|lose|openMouth|
        this.pressed = false;
    };

    initialize() {
        setImage("button_start", this.htmlElement, this.zoom);

        //onmouseleave
        this.htmlElement.onmouseleave = (ev) => { 
            if (ev.button == MOUSE_LEFT && this.status == "") {
                this.status = "smile";
            }
        };

        //onmousedown
        this.htmlElement.onmousedown = (ev) => { 
            if (ev.button == MOUSE_LEFT) {
                this.pressed = true;
            }
        };

         //onmouseup
         this.htmlElement.onmouseup = (ev) => { 
            if (ev.button == MOUSE_LEFT) {
                this.pressed = false;
                this.game.reboot();
            }
        };

    };

    update() {
        if (this.game.ended){
            if (this.game.win) this.status = "win";
            if (!this.game.win) this.status = "lose";
        } else {
            if (this.game.anyBlockSelected) {
                this.status = "openMouth";
            } else {
                this.status = "smile";
            }
        }

        this.updateGraphics();
    };

    updateGraphics() {
        if (this.pressed) {
            setImage("button_start_pressed", this.htmlElement, this.zoom);  
            return;
        }

        switch (this.status) {
            case "smile":
                setImage("button_start", this.htmlElement, this.zoom);
                break;
            case "win":
                setImage("button_start_game_win", this.htmlElement, this.zoom);
                break;
            case "lose":
                setImage("button_start_game_lose", this.htmlElement, this.zoom);
                break;
            case "openMouth":
                setImage("button_start_open_mouth", this.htmlElement, this.zoom);
                break;
            default:
                break;
        }
    };
}