const modal = document.getElementById("modal");
const loading = document.getElementById("loading");
const configMenu = document.getElementById("configMenu");
const menuCaller = document.getElementById("menuCaller");
const closeButton = document.getElementById("closeButton");
const rowsValue = document.getElementById("rowsValue");
const columnsValue = document.getElementById("columnsValue");
const minesValue = document.getElementById("minesValue");
const zoomValue = document.getElementById("zoomValue");
const secureSwitchButton = document.getElementById("secureSwitchButton");
const secureValue = document.getElementById("secureValue");

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
    rows : game.rows,
    columns : game.columns,
    mines : game.mines,
    zoom : game.zoom,
    secureStart : game.secureStart,
}

modal.style.userSelect = "none";

menuCaller.onclick = menuOpen;

modal.onclick = (ev) => {
    if (ev.target == modal) modal.classList.add("hidden");
};

closeButton.onclick = () => { modal.classList.add("hidden") };

function menuOpen() { modal.classList.remove("hidden") };

function update() {
    loading.classList.remove("hidden");
    
    rowsValue.innerHTML = menuData.rows;
    columnsValue.innerHTML = menuData.columns;
    minesValue.innerHTML = menuData.mines;
    zoomValue.innerHTML = menuData.zoom + "x";
    secureValue.innerHTML = (menuData.secureStart) ? "TRUE" : "FALSE";

    const configs = {
        htmlElement: document.getElementById("game"),
        columns : menuData.columns,
        rows : menuData.rows,
        mines : menuData.mines,
        zoom : menuData.zoom,
        secureStart : menuData.secureStart,
    };
    
    game.htmlElement.innerHTML = "";
    game = new Game(configs);
    game.initialize();

    setTimeout(() => {
        loading.classList.add("hidden");
    }, 300);
}

rowsPlus.onclick = () => { 
    if (menuData.rows < 100) {
        menuData.rows++; 
        update();
    }
};

columnsPlus.onclick = () => { 
    if (menuData.columns < 100) {
        menuData.columns++; 
        update();
    }  
};

minesPlus.onclick = () => { 
    const maxMines = (menuData.rows * menuData.columns) -2 ;
    if (menuData.mines <  maxMines) {
        menuData.mines++; 
        update();
    }
};

zoomPlus.onclick = () => { 
    if (menuData.zoom < 10) {
        menuData.zoom++;
        update();
    }
};

rowsMinus.onclick = () => {
    const futureMaxMines = (menuData.rows * menuData.columns) -2 ;
    if(menuData.rows > 2 && menuData.mines <  futureMaxMines) {
        menuData.rows--; 
        update();
    }
};

columnsMinus.onclick = () => { 
    const futureMaxMines = (menuData.rows * menuData.columns) -2 ;
    if(menuData.columns > 8 && menuData.mines <  futureMaxMines) {
        menuData.columns--;
        update();
    }
};

minesMinus.onclick = () => { 
    if(menuData.mines > 1) {
        menuData.mines--;
        update();
    }
};

zoomMinus.onclick = () => { 
    if(menuData.zoom > 1) {
        menuData.zoom--; 
        update();
    }
};

easyPreset.onclick = () => {
    menuData.columns = 9;
    menuData.rows = 9;
    menuData.mines = 10;
    update();
};

mediumPreset.onclick = () => {
    menuData.columns = 25;
    menuData.rows = 15;
    menuData.mines = 50;
    update();
};

hardPreset.onclick = () => {
    menuData.columns = 50;
    menuData.rows = 20;
    menuData.mines = 300;
    update();
};


secureSwitchButton.onclick = () => {
    if (menuData.secureStart) {
        menuData.secureStart = false;
        update();
    } else {
        menuData.secureStart = true;
        update();
    }
}