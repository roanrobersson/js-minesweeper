//Game
const configs = {
    htmlElement: document.getElementById("game"),
    columns: 9,
    rows: 9,
    mines: 10,
    zoom: 2,
};
let game = new Game(configs);       
game.initialize();