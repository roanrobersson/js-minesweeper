
let game = new Game("game");
game.initialize();

//installMines(field, mines);

/*
function installMines(field, mines) {
    let minesCount = mines;
    let columns = field.rows;
    let rows = field[0].length;

    
    let block = field[getRandomIntInclusive(0, columns-1)][getRandomIntInclusive(0, rows-1)];

    if (minesCount > 0) {
        if(block.haveMine === false) {
            block.haveMine = true;
            minesCount--;
        }
    } else {
        return;
    }   
}
*/