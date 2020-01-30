class Field {
    constructor (configs) {
        this.columns = configs.columns;
        this.rows = configs.rows;
        this.zoom = configs.zoom;
        this.mines = configs.mines;
        this.parent = configs.parent;
        this.input = configs.input;
        this.blocks = new Array2D(this.rows, this.columns);
        this.htmlElement = document.createElement("div");
        this.htmlElement.id = 'field';
    };

    initialize() {
        this.createBlocks();
        this.putMines();
        this.setNearbyMines();
    };

    update() {
        let blocksTemp = this.blocks.toArray1D();
        for(let i in blocksTemp) blocksTemp[i].update(); 
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
                    input : this.input,
                }
                let block = new Block(blockConfigs);
                htmlRowElement.appendChild(block.htmlElement);
                this.blocks[i][j] = block;
            }
        }
    };

    putMines() {
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

    getNearbyBlocks(block) {
        let r = block.row;
        let c = block.column;
        let blockList = [];

        if (c > 0) blockList.push(this.blocks[r][c-1]);
        if (c > 0 && r > 0) blockList.push(this.blocks[r-1][c-1]);
        if (r > 0) blockList.push(this.blocks[r-1][c]);
        if (c < this.columns-1 && r > 0) blockList.push(this.blocks[r-1][c+1]);
        if (c < this.columns-1) blockList.push(this.blocks[r][c+1]);
        if (c < this.columns-1 && r < this.rows-1) blockList.push(this.blocks[r+1][c+1]);
        if (r < this.rows-1) blockList.push(this.blocks[r+1][c]);
        if (r < this.rows-1 && c > 0) blockList.push(this.blocks[r+1][c-1]);

        return blockList;
    };
    
    countNearbyMines(block) {
        let m = 0;
        let blockList = this.getNearbyBlocks(block);
        for (let i in blockList) if (blockList[i].haveMine) m++;
        return m;
    };

    showNearbyBlocks(block) {
        let blockList = this.getNearbyBlocks(block);
        for (let i in blockList) blockList[i].select();
    };

    unshowNearbyBlocks(block) {
        let blockList = this.getNearbyBlocks(block);
        for (let i in blockList) blockList[i].unselect();
    };

    recursiveOpen(block) {
        let nearbyBlocks = this.getNearbyBlocks(block);
        for (let i in nearbyBlocks) {
            let b = nearbyBlocks[i];
            if (!b.haveMine && b.status == "close") b.open();
        }
    };
}
