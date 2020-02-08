class Button {
    constructor () {
        this.htmlElement = document.createElement("img");
        this.htmlElement.id = 'button';
        this.mouseOverHere = false;
        this.status = "smile"; //smile|win|lose|openMouth|
        this.pressed = false;
    };

    initialize() {
        setImage("button_start", this.htmlElement, game.zoom);

        //onmouseleave
        this.htmlElement.onmouseleave = (ev) => { 
            if (ev.button == MOUSE_LEFT) {
                this.status = "smile";
                this.pressed = false;
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
                game.reboot();
            }
        };

    };

    update() {
        if (this.pressed) {
            setImage("button_start_pressed", this.htmlElement, game.zoom);  
            return;
        }

        if (game.ended){
            if (game.win) {
                this.status = "win";
                setImage("button_start_game_win", this.htmlElement, game.zoom);
            }
            else {
                this.status = "lose";
                setImage("button_start_game_lose", this.htmlElement, game.zoom);
            }
        } else {
            if (game.anyBlockSelected) {
                this.status = "openMouth";
                setImage("button_start_open_mouth", this.htmlElement, game.zoom);
            } else {
                this.status = "smile";
                setImage("button_start", this.htmlElement, game.zoom);
            }
        }
    };
}