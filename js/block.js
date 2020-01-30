class Block {
    constructor (configs) {
        this.parent = configs.parent;
        this.haveMine = configs.haveMine;
        this.nearbyMines = configs.nearbyMines;
        this.row = configs.row;
        this.column = configs.column;
        this.zoom = configs.zoom;
        this.htmlElement = document.createElement("img");
        this.status = "close"; // close, open, flag, interrogation, mousedown
        this.setImage("block");

        this.htmlElement.onmouseenter = (event) => {
            if (this.status == "close" && MOUSE_LEFT_DOWN) {
                this.setImage("open_block");
                this.status = "mousedown";
            }
        };

        this.htmlElement.onmouseleave = (event) => { 
            if (this.status == "mousedown" ) {
                this.setImage("block");
                this.status = "close";
            }
        };

        this.htmlElement.onmousedown = (event) => { 
            let button = event.button;
            if (button == MOUSE_LEFT) {
                if (this.status == "close") {
                    this.setImage("open_block"); 
                    this.status = "mousedown";
                }
            }

            if (button == MOUSE_RIGHT) {
                if (this.status == "close") {
                    this.setImage("flag");
                    this.status = "flag";
                } else if (this.status == "flag"){
                    this.setImage("interrogation");
                    this.status = "interrogation";
                } else if (this.status == "interrogation") {
                    this.setImage("block");
                    this.status = "close";
                }
            }
        }
        
        this.htmlElement.onmouseup = (event) => { 
            let button = event.button;
            if (button == MOUSE_LEFT) {
                if (this.status == "mousedown") {
                    if (this.haveMine) {
                        this.setImage("mine_explosion"); 
                    } else if (this.nearbyMines > 0){
                        this.setImage(this.nearbyMines);
                    } else {
                        this.setImage("open_block");  
                    }
                    this.status = "open" 
                }
            }
            if (button == MOUSE_RIGHT) {
                //
            }
        }

        this.htmlElement.onclick = (event) => { 
            if (this.status == "close") {
                if (this.haveMine) {
                    this.setImage("mine_explosion");  
                } else if (this.nearbyMines > 0){
                    this.setImage(this.nearbyMines);
                } else {
                    this.setImage("open_block");  
                }
                this.status = "open" 
            }
        }

    };

    /*
    changeState(state) {
        switch (state) {
            case "openned":
                break;
            case "":
                break;
            default:

        }
    };
    */
   
    setImage(imgName) {
        this.htmlElement.src = 'img/' + imgName +'.png';
        this.htmlElement.onload = () => {
            this.htmlElement.width = this.htmlElement.naturalWidth * this.zoom;
            this.htmlElement.height = this.htmlElement.naturalHeight * this.zoom;
        };
    };    
}