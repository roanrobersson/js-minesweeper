class Field {
    constructor (configs) {
        this.columns = configs.columns;
        this.rows = configs.rows;
        this.mines = configs.mines;
        this.blocks = new Array2D(this.rows, this.columns);
        this.htmlElement = document.createElement("div");
        this.htmlElement.id = 'field';
        this.htmlElement.style.borderWidth = "inherit";
        this.lastBlockClicked = null;
    };

    initialize() {
        this._createAllBlocks();
    };

    update() {
        if (game.ended) return;
        let blocksTemp = this.blocks.toArray1D();
        for(const i in blocksTemp) blocksTemp[i].update(); 
    };

    _createAllBlocks() {
        for(let i = 0; i < this.rows; i++) {
            let htmlRowElement = document.createElement("div");
            htmlRowElement.classList.add('row');
            this.htmlElement.appendChild(htmlRowElement);

            for(let  j = 0; j < this.columns; j++) {
                let blockConfigs = {
                    haveMine : false,
                    row: i,
                    column: j,
                    field : this,
                }
                let block = new Block(blockConfigs);
                block.initialize();
                htmlRowElement.appendChild(block.htmlElement);
                this.blocks[i][j] = block;
            }
        }

        if (!game.secureStart) {
            this._putMines(this.blocks.toArray1D());
            this._setNearbyMinesCount(this.blocks.toArray1D());
        }
    };

    _putMines(blocks) {
        let blocksTemp = blocks;
        let minesRemaining = this.mines;
        
        while( minesRemaining > 0) {
            let random = getRandomIntInclusive(0, blocksTemp.length-1);
            blocksTemp[random].haveMine = true;
            blocksTemp.splice(random , 1);
            minesRemaining--;
        }
    };

    _getBlocksWithouSecureBlock(blocks, secureBlock) {
        let blocksWithoutSecureBlock = blocks.toArray1D();
        const index = blocksWithoutSecureBlock.indexOf(secureBlock);
        blocksWithoutSecureBlock.splice(index, 1);
        return blocksWithoutSecureBlock;
    };

    _setNearbyMinesCount(blocks) {
        for(const i in blocks) blocks[i].nearbyMinesCount = this._getNearbyMinesCount(blocks[i]);
    };

    _getNearbyBlocks(block) {
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
    
    _getNearbyMinesCount(block) {
        let m = 0;
        let blockList = this._getNearbyBlocks(block);
        for (const i in blockList) 
            if (blockList[i].haveMine) m++;
        return m;
    };

    showNearbyBlocks(block) {
        let blockList = this._getNearbyBlocks(block);
        for (const i in blockList) {
            const b = blockList[i];
            if (!b.openned && b.mark == null) b.select();
        }     
    };

    unshowNearbyBlocks(block) {
        let blockList = this._getNearbyBlocks(block);
        for (const i in blockList) {
            const b = blockList[i];
            if (b.selected) b.unselect();
        }
    };

    recursiveOpenBlocks(block) {
        let nearbyBlocks = this._getNearbyBlocks(block);
        for (const i in nearbyBlocks) {
            let b = nearbyBlocks[i];
            if (!b.haveMine && !b.openned && b.mark == null) b.open();
        }
    };

    revealAllField() {
        for(const i in this.blocks) 
            for(const j in this.blocks[0]) 
                this.blocks[i][j].reveal();
    };

    resetField() {
        for(const i in this.blocks) 
            for(const j in this.blocks[0])
                this.blocks[i][j].resetBlock();
        if (!game.secureStart) {
            this._putMines(this.blocks.toArray1D());
            this._setNearbyMinesCount(this.blocks.toArray1D());
        }      
    };

    allSecureBlocksOppenned() {
        let count = 0;
        let blocksTemp = this.blocks.toArray1D();
        for(const i in blocksTemp) 
            if (blocksTemp[i].openned)
                count++;
        return count == blocksTemp.length - game.mines;
    };

    onBlockOpen(block) {
        if (game.secureStartPendent) {

            const blocksWithoutSecureBlock = this._getBlocksWithouSecureBlock(this.blocks, block);
            this._putMines(blocksWithoutSecureBlock);
            this._setNearbyMinesCount(this.blocks.toArray1D());

            game.secureStartPendent = false;
        }
    };
}
