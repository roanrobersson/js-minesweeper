const MOUSE_LEFT = 0;
const MOUSE_RIGHT = 2;
var MOUSE_LEFT_DOWN = false;
var MOUSE_RIGHT_DOWN = false;


document.body.onmousedown = (event) => { 
    let button = event.button;
    if (button == MOUSE_LEFT) { MOUSE_LEFT_DOWN = true }
    if (button == MOUSE_RIGHT) { MOUSE_RIGHT_DOWN = true }
}

document.body.onmouseup= (event) => { 
    let button = event.button;
    if (button == MOUSE_LEFT) { MOUSE_LEFT_DOWN = false }
    if (button == MOUSE_RIGHT) { MOUSE_RIGHT_DOWN = false }
}

//Generate random integer number
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


