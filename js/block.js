class Block {
    constructor (configs) {
        this.field = configs.field;
        this.haveMine = configs.haveMine;
        this.nearbyMines = configs.nearbyMines;
        this.row = configs.row;
        this.column = configs.column;
        this.htmlElement = document.createElement("img");
        this.status = "close"; //close|open|flag|interrogation|selected
        this.showingNearbyBlocks = false;
        this.mouseOverHere = false;
    };

    initialize() {
        //onmouseenter
        this.htmlElement.onmouseenter = () => {
            let mouseLeftDown = game.input.pressed[MOUSE_LEFT];
            this.mouseOverHere = true;
            if (this.status == "close" && mouseLeftDown) this.select();
        };

        //onmouseleave
        this.htmlElement.onmouseleave = () => { 
            this.mouseOverHere = false;
            if (this.status == "selected") this.unselect();
            if (this.showingNearbyBlocks) this.unshowNearbyBlocks();
        };
    };

    /*
    close() {
        if (this.status == "close") return;
        this.setImage("block");
        this.oldStatus = "close";
        this.status = "close";
    };
    */

    update() {
        if (this.mouseOverHere) {
            let mouseLeftPressed = game.input.pressed[MOUSE_LEFT];
            let mouseRightPressed = game.input.pressed[MOUSE_RIGHT];
            let mouseLeftWasDown = game.input.wasPressed[MOUSE_LEFT];
            let mouseRightWasDown = game.input.wasPressed[MOUSE_RIGHT];
            let mouseLeftFired = game.input.fired[MOUSE_LEFT];
            let mouseRightFired = game.input.fired[MOUSE_RIGHT];


            if (mouseLeftPressed && mouseRightPressed) this.showNearbyBlocks();
            if (mouseLeftWasDown && mouseRightWasDown && !mouseLeftPressed && !mouseRightPressed) this.unshowNearbyBlocks();
            if (mouseLeftFired && !mouseRightPressed) if (this.status == "close") this.select();
               
            if (mouseRightFired && !mouseLeftPressed) {
                if (this.status == "close") this.markWithFlag();
                else if (this.status == "flag") this.markWithInterrogation();
                else if (this.status == "interrogation") this.unmark();
            }
    
            if (this.status == "selected" && !mouseLeftPressed && mouseLeftWasDown) this.open();
        }

        this.updateGraphics();
    };

    updateGraphics() {
        switch (this.status) {
            case "open":
                if (this.haveMine) setImage("mine_explosion", this.htmlElement, game.zoom);  
                else if (this.nearbyMines > 0) setImage(this.nearbyMines, this.htmlElement, game.zoom);  
                else setImage("open_block", this.htmlElement, game.zoom);  
                break;
            case "close":
                if (this.showingNearbyBlocks) this.setImage("open_block");
                else setImage("block", this.htmlElement, game.zoom);  
                break;
            case "selected":
                setImage("open_block", this.htmlElement, game.zoom);  
                break;
            case "flag":
                setImage("flag", this.htmlElement, game.zoom);  
                break;
            case "interrogation":
                setImage("interrogation", this.htmlElement, game.zoom);  
                break;
            default:
                break;
        }
    };

    open() {
        if (this.status == "open") return
        this.status = "open";
        if (!this.haveMine && this.nearbyMines == 0) this.field.recursiveOpen(this);
        this.field.anyBlockSelected = false;
        if (!game.started) game.start();
        if (this.haveMine) {
            game.win = false;
            game.end();
        }
    };

    select() {
        if (this.status != "close") return;
        this.status = "selected";
        this.field.anyBlockSelected = true;
    };

    showNearbyBlocks() {
        if (this.showingNearbyBlocks) return;
        this.select();
        this.field.showNearbyBlocks(this);
        this.showingNearbyBlocks = true;
    };

    unshowNearbyBlocks() {
        if (!this.showingNearbyBlocks) return;
        this.unselect();
        this.field.unshowNearbyBlocks(this);
        this.showingNearbyBlocks = false;
    };

    unselect() {
        if (this.status != "selected") return;
        this.status = "close";
        this.field.anyBlockSelected = false;
    };

    markWithFlag() {
        if (this.status != "close") return;
        this.status = "flag";
        game.markedBlocks++;
    };

    markWithInterrogation() {
        if (this.status != "flag") return;
        this.status = "interrogation";
        game.markedBlocks--;
    };
   
    unmark () {
        if (this.status != "interrogation") return;
        this.status = "close";
    };
    
}