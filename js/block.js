class Block {
    constructor (configs) {
        this.field = configs.field;
        this.haveMine = configs.haveMine;
        this.nearbyMinesCount = configs.nearbyMinesCount;
        this.row = configs.row;
        this.column = configs.column;
        this.htmlElement = document.createElement("img");
        this.showingNearbyBlocks = false;
        this.mouseOverHere = false;
        this.openned = false;
        this.selected = false;
        this.mark = null;
        this.mouseEntered = false;
        this.mouseLeaved = false;
    };

    initialize() {
        setImage("block", this.htmlElement, game.zoom);  
        this.htmlElement.onmouseenter = () => { this.mouseEntered = true };
        this.htmlElement.onmouseleave = () => { this.mouseLeaved = true };
    };

    update() {            
        if (this.mouseEntered) {
            let mouseLeftDown = game.input.pressed[MOUSE_LEFT];
            this.mouseOverHere = true;
            if (mouseLeftDown && !this.openned && this.mark == null) this.select();
            this.mouseEntered = false;
        }

        if (this.mouseLeaved) {
            this.mouseOverHere = false;
            if (this.selected) this.unselect();
            if (this.showingNearbyBlocks) this._unshowNearbyBlocks();
            this.mouseLeaved = false;
        }

        if (this.mouseOverHere) {
            let mouseLeftPressed = game.input.pressed[MOUSE_LEFT];
            let mouseRightPressed = game.input.pressed[MOUSE_RIGHT];
            let mouseLeftWasDown = game.input.wasPressed[MOUSE_LEFT];
            let mouseRightWasDown = game.input.wasPressed[MOUSE_RIGHT];
            let mouseLeftFired = game.input.fired[MOUSE_LEFT];
            let mouseRightFired = game.input.fired[MOUSE_RIGHT];

            if (mouseLeftPressed && mouseRightPressed) this._showNearbyBlocks();
            if (mouseLeftWasDown && mouseRightWasDown && !mouseLeftPressed && !mouseRightPressed && this.showingNearbyBlocks) this._unshowNearbyBlocks();
            if (mouseLeftFired && !mouseRightPressed && !this.openned && this.mark == null) this.select();
               
            if (mouseRightFired && !mouseLeftPressed && !this.openned) this.toggleMark();
    
            if (!mouseLeftPressed && mouseLeftWasDown && this.selected && !this.showingNearbyBlocks) this.open();
        }

    };

    _showNearbyBlocks() {
        if (!this.openned && this.mark == null) this.select();
        this.field.showNearbyBlocks(this);
        this.showingNearbyBlocks = true;
    };

    _unshowNearbyBlocks() {
        if (!this.openned && this.mark == null) this.unselect();
        this.field.unshowNearbyBlocks(this);
        this.showingNearbyBlocks = false;
    };

    open() {
        this.field.onBlockOpen(this);
        this.openned = true; // Keep this on top of method
        this.selected = false;
        this.mark = null;
        game.anyBlockSelected = false;
        if (this.haveMine && this.field.lastBlockClicked == this ) setImage("mine_explosion", this.htmlElement, game.zoom);  
        else if (this.haveMine) setImage("mine", this.htmlElement, game.zoom);  
        else if (this.nearbyMinesCount > 0) setImage(this.nearbyMinesCount, this.htmlElement, game.zoom);  
        else setImage("open_block", this.htmlElement, game.zoom);  

        if (!this.haveMine && this.nearbyMinesCount == 0) this.field.recursiveOpenBlocks(this);
        if (!game.started) game.start();
        if (this.haveMine) {
            game.win = false;
            game.end();
        }
        if (this.field.allSecureBlocksOppenned()) {
            game.win = true;
            game.end();
        }
    };

    reveal() {
        if (this.haveMine && this.field.lastBlockClicked != this && this.mark != "flag") setImage("mine", this.htmlElement, game.zoom);
        else if (!this.haveMine && this.mark == "flag") setImage("wrong_mine_mark", this.htmlElement, game.zoom);

        this.selected = false;
        this.mark = null;
        this.openned = true;
    };

    select() {
        game.anyBlockSelected = true;
        this.field.lastBlockClicked = this;
        setImage("open_block", this.htmlElement, game.zoom);
        this.selected = true;
    };

    unselect() {
        game.anyBlockSelected = false;
        setImage("block", this.htmlElement, game.zoom);
        this.selected = false;
    };

    toggleMark() {
        if (this.mark == null ) {
            setImage("flag", this.htmlElement, game.zoom);
            game.blocksMarkedWithFlag++;
            this.mark = "flag";
        }
        else if (this.mark == "flag") {
            setImage("interrogation", this.htmlElement, game.zoom);
            game.blocksMarkedWithFlag--;
            this.mark = "interrogation";
        }
        else {
            setImage("block", this.htmlElement, game.zoom);
            this.mark = null;
        }
    };

    resetBlock() {
        this.haveMine = false;
        this.nearbyMinesCount = 0;
        this.showingNearbyBlocks = false;
        this.mouseOverHere = false;
        this.selected = false;
        this.openned = false;
        this.mark = null;
        this.mouseEntered = false;
        this.mouseLeaved = false;
        setImage("block", this.htmlElement, game.zoom);
    };
}