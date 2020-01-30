class Field {
    constructor (configs) {
        this.columns = configs.columns;
        this.rows = configs.rows;
        this.zoom = configs.zoom;
        this.mines = configs.mines;
        this.parent = configs.parent;
        this.blocks = new Array2D(9, 9);
        this.htmlElement = document.createElement("div");
        this.htmlElement.id = 'field';
    };

    initialize() {
        this.createBlocks();
        this.plantMines();
        this.setNearbyMines();
    };

    createBlocks() {
        for(let i = 0; i < this.rows; i++) {
            let htmlRowElement = document.createElement("div");
            htmlRowElement.classList.add('row');
            this.htmlElement.appendChild(htmlRowElement);

            for(let j = 0; j < this.columns; j++) {
                let blockConfigs = {
                    haveMine : false,
                    row: i,
                    column: j,
                    zoom : this.zoom,
                    parent : this,
                }
                let block = new Block(blockConfigs);
                htmlRowElement.appendChild(block.htmlElement);
                this.blocks[i][j] = block;
            }
        }
    };

    plantMines() {
        let blocksTemp = this.blocks.toArray1D();
        let minesRemaining = this.mines;
        
        while( minesRemaining > 0) {
            let random = getRandomIntInclusive(0, blocksTemp.length-1);
            blocksTemp[random].haveMine = true;
            blocksTemp.splice(random , 1);
            minesRemaining--;
        }
    };

    setNearbyMines() {
        for(let i in this.blocks) 
            for(let j in this.blocks[0]) 
                this.blocks[i][j].nearbyMines = this.countNearbyMines(this.blocks[i][j]);
    };

    countNearbyMines(block) {
        let r = block.row;
        let c = block.column;
        let m = 0;

        (c > 0 && this.blocks[r][c-1].haveMine ) ? m++ : false; //Left
        (c > 0 && r > 0 && this.blocks[r-1][c-1].haveMine ) ? m++ : false; // Left + Up
        (r > 0 && this.blocks[r-1][c].haveMine ) ? m++ : false; //Up
        (c < this.columns-1 && r > 0 && this.blocks[r-1][c+1].haveMine ) ? m++ : false; //Up + Right
        (c < this.columns-1 && this.blocks[r][c+1].haveMine ) ? m++ : false; //Right
        (c < this.columns-1 && r < this.rows-1 && this.blocks[r+1][c+1].haveMine ) ? m++ : false; //Right + Down
        (r < this.rows-1 && this.blocks[r+1][c].haveMine ) ? m++ : false; //Down
        (r < this.rows-1 && c > 0 && this.blocks[r+1][c-1].haveMine ) ? m++ : false; //Down + Right

        return m;
    };
}
