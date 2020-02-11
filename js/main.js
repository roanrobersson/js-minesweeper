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

//Modal menu
const modal = document.getElementsByClassName("modal")[0];
const configMenu = document.getElementById("configMenu");
const menuCaller = document.getElementById("menuCaller");
const closeButton = document.getElementById("closeButton");
const rowsValue = document.getElementById("rowsValue");
const columnsValue = document.getElementById("columnsValue");
const minesValue = document.getElementById("minesValue");
const zoomValue = document.getElementById("zoomValue");

const rowsPlus = document.getElementById("rowsPlus");
const columnsPlus = document.getElementById("columnsPlus");
const minesPlus = document.getElementById("minesPlus");
const zoomPlus = document.getElementById("zoomPlus");
const rowsMinus = document.getElementById("rowsMinus");
const columnsMinus = document.getElementById("columnsMinus");
const minesMinus = document.getElementById("minesMinus");
const zoomMinus = document.getElementById("zoomMinus");

const easyPreset = document.getElementById("easyPreset");
const mediumPreset = document.getElementById("mediumPreset");
const hardPreset = document.getElementById("hardPreset");

let menuData = {
    rows: game.rows,
    columns: game.columns,
    mines: game.mines,
    zoom: game.zoom,
}

menuCaller.onclick = menuOpen;

modal.onclick = (ev) => {
    if (ev.target == modal) modal.classList.add("hidden");
};

configMenu.onclick = () => { update() };

closeButton.onclick = () => {
    modal.classList.add("hidden");
};

function menuOpen() {
    modal.classList.remove("hidden");
    update();
};

function update() {
    rowsValue.innerHTML = menuData.rows;
    columnsValue.innerHTML = menuData.columns;
    minesValue.innerHTML = menuData.mines;
    zoomValue.innerHTML = menuData.zoom + "x";
}

rowsPlus.onclick = () => { 
    if (menuData.rows < 100)
        menuData.rows++; 
};
columnsPlus.onclick = () => { 
    if (menuData.columns < 100)
    menuData.columns++; 
};
minesPlus.onclick = () => { 
    const maxMines = (menuData.rows * menuData.columns) -2 ;
    if (menuData.mines <  maxMines)
    menuData.mines++; 
};
zoomPlus.onclick = () => { 
    if (menuData.zoom < 10)
        menuData.zoom++; 
};
rowsMinus.onclick = () => {
    const futureMaxMines = (menuData.rows * menuData.columns) -2 ;
    if(menuData.rows > 2 && menuData.mines <  futureMaxMines) 
        menuData.rows--; 
};
columnsMinus.onclick = () => { 
    const futureMaxMines = (menuData.rows * menuData.columns) -2 ;
    if(menuData.columns > 2 && menuData.mines <  futureMaxMines) 
        menuData.columns--; 
};
minesMinus.onclick = () => { 
    if(menuData.mines > 1) 
        menuData.mines--; 
};
zoomMinus.onclick = () => { 
    if(menuData.zoom > 1) 
        menuData.zoom--; 
};

easyPreset.onclick = () => {
    menuData.columns = 9;
    menuData.rows = 9;
    menuData.mines = 10;
}
mediumPreset.onclick = () => {
    menuData.columns = 20;
    menuData.rows = 50;
    menuData.mines = 100;
}
hardPreset.onclick = () => {
    menuData.columns = 40;
    menuData.rows = 20;
    menuData.mines = 300;
}
