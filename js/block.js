class Block {
    constructor (configs) {
        this.parent = configs.parent;
        this.haveMine = configs.haveMine;
        this.nearbyMines = configs.nearbyMines;
        this.row = configs.row;
        this.column = configs.column;
        this.zoom = configs.zoom;
        this.htmlElement = document.createElement("img");
        this.status = "close"; //close|open|flag|interrogation|selected
        this.setImage("block");

        //onmouseenter
        this.htmlElement.onmouseenter = (event) => {
            if (this.status == "close" && MOUSE_LEFT_DOWN) this.select();
        };

        //onmouseleave
        this.htmlElement.onmouseleave = (event) => { 
            if (this.status == "selected" ) this.unselect();
        };

        //onmousedown
        this.htmlElement.onmousedown = (event) => { 
            let button = event.button;
            if (button == MOUSE_LEFT) {
                if (this.status == "close") this.select();
            }

            if (button == MOUSE_RIGHT) {
                if (this.status == "close") this.markWithFlag();
                else if (this.status == "flag") this.markWithInterrogation();
                else if (this.status == "interrogation") this.unselect();
            }
        }
        
        //onmouseup
        this.htmlElement.onmouseup = (event) => { 
            let button = event.button;
            if (button == MOUSE_LEFT) {
                if (this.status == "selected") this.open();
            } else if (button == MOUSE_RIGHT) {
                //
            }
        }

        //onclick
        this.htmlElement.onclick = (event) => { 
            if (this.status == "close") this.open();
        }

    };

    close() {
        this.setImage("block");
        this.status = "close";
    };

    open() {
        if (this.haveMine) {
            this.setImage("mine_explosion");  
        } else if (this.nearbyMines > 0){
            this.setImage(this.nearbyMines);
        } else {
            this.setImage("open_block");  
        }
        this.status = "open";
    };

    select() {
        this.setImage("open_block");
        this.status = "selected";
    };

    unselect() {
        this.setImage("block");
        this.status = "close";
    };

    markWithFlag() {
        this.setImage("flag");
        this.status = "flag";
    }

    markWithInterrogation() {
        this.setImage("interrogation");
        this.status = "interrogation";
    }
   
    setImage(imgName) {
        this.htmlElement.src = 'img/' + imgName +'.png';
        this.htmlElement.onload = () => {
            this.htmlElement.width = this.htmlElement.naturalWidth * this.zoom;
            this.htmlElement.height = this.htmlElement.naturalHeight * this.zoom;
        };
    };    
}