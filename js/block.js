class Block {
    constructor (configs) {
        this.parent = configs.parent;
        this.haveMine = configs.haveMine;
        this.nearbyMines = configs.nearbyMines;
        this.row = configs.row;
        this.column = configs.column;
        this.zoom = configs.zoom;
        this.htmlElement = document.createElement("img");
        this.input = configs.input;
        this.status = "close"; //close|open|flag|interrogation|selected
        this.showingNearbyBlocks = false;
        this.mouseOverHere = false;

        //onmouseenter
        this.htmlElement.onmouseenter = () => {
            let mouseLeftDown = this.input.pressed[MOUSE_LEFT];
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
            let mouseLeftPressed = this.input.pressed[MOUSE_LEFT];
            let mouseRightPressed = this.input.pressed[MOUSE_RIGHT];
            let mouseLeftWasDown = this.input.wasPressed[MOUSE_LEFT];
            let mouseRightWasDown = this.input.wasPressed[MOUSE_RIGHT];
            let mouseLeftFired = this.input.fired[MOUSE_LEFT];
            let mouseRightFired = this.input.fired[MOUSE_RIGHT];


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
                if (this.haveMine) this.setImage("mine_explosion");
                else if (this.nearbyMines > 0) this.setImage(this.nearbyMines); 
                else this.setImage("open_block");  
                break;
            case "close":
                if (this.showingNearbyBlocks) this.setImage("open_block");
                else this.setImage("block"); 
                break;
            case "selected":
                this.setImage("open_block");  
                break;
            case "flag":
                this.setImage("flag");
                break;
            case "interrogation":
                this.setImage("interrogation");
                break;
            default:
                break;
        }
    };

    open() {
        if (this.status == "open") return
        this.status = "open";
        if (!this.haveMine && this.nearbyMines == 0) this.parent.recursiveOpen(this);
    };

    select() {
        if (this.status != "close") return;
        this.status = "selected";
    };

    showNearbyBlocks() {
        if (this.showingNearbyBlocks) return;
        this.select();
        this.parent.showNearbyBlocks(this);
        this.showingNearbyBlocks = true;
    };

    unshowNearbyBlocks() {
        if (!this.showingNearbyBlocks) return;
        this.unselect();
        this.parent.unshowNearbyBlocks(this);
        this.showingNearbyBlocks = false;
    };

    unselect() {
        if (this.status != "selected") return;
        this.status = "close";
    };

    markWithFlag() {
        if (this.status != "close") return;
        this.status = "flag";
    };

    markWithInterrogation() {
        if (this.status != "flag") return;
        this.status = "interrogation";
    };
   
    unmark () {
        if (this.status != "interrogation") return;
        this.status = "close";
    };

    setImage(imgName) {
        let oldImgName = this.htmlElement.src.replace(/^.*[\\\/]/, '').replace(".png", "");
        if (oldImgName == imgName) return; 
        this.htmlElement.src = 'img/' + imgName +'.png';
        this.htmlElement.onload = () => {
            this.htmlElement.width = this.htmlElement.naturalWidth * this.zoom;
            this.htmlElement.height = this.htmlElement.naturalHeight * this.zoom;
        };
    };
    
}