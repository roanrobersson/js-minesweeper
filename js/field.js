class Field {
    constructor (configs) {
        this.columns = configs.columns;
        this.rows = configs.rows;
        this.zoom = configs.zoom;
        this.mines = configs.mines;
        this.parent = configs.parent;
        this.blocks = []; //Bidimensional array
        for(let i = 0; i < this.rows; i++) this.blocks[i] = []; //Make bidimensional
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
        let blocksTemp = [];
        let minesRemaining = this.mines;

        //Maps bidimensional to unidimensional array
        for(let i = 0; i < this.rows; i++) 
            for(let j = 0; j < this.columns; j++) 
                blocksTemp.push(this.blocks[i][j]);

        while( minesRemaining > 0) {
            let random = getRandomIntInclusive(0, blocksTemp.length-1);
            blocksTemp[random].haveMine = true;
            blocksTemp.splice(random , 1);
            minesRemaining--;
        }
    };

    setNearbyMines() {
        let rows = this.blocks.length;
        let columns = this.blocks[0].length;

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                this.blocks[i][j].nearbyMines = this.countNearbyMines(this.blocks[i][j]);
            }
        }
    };

    countNearbyMines(block) {
        let i = block.row;
        let j = block.column;
        let m = 0;

        (j > 0 && this.blocks[i][j-1].haveMine ) ? m++ : false; //Left
        (j > 0 && i > 0 && this.blocks[i-1][j-1].haveMine ) ? m++ : false; // Left + Up
        (i > 0 && this.blocks[i-1][j].haveMine ) ? m++ : false; //Up
        (j < this.columns-1 && i > 0 && this.blocks[i-1][j+1].haveMine ) ? m++ : false; //Up + Right
        (j < this.columns-1 && this.blocks[i][j+1].haveMine ) ? m++ : false; //Right
        (j < this.columns-1 && i < this.rows-1 && this.blocks[i+1][j+1].haveMine ) ? m++ : false; //Right + Down
        (i < this.rows-1 && this.blocks[i+1][j].haveMine ) ? m++ : false; //Down
        (i < this.rows-1 && j > 0 && this.blocks[i+1][j-1].haveMine ) ? m++ : false; //Down + Right

        return m;
    };
}
