//Generate random integer number
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setImage(imgName, htmlImgElement, zoom) {
    let oldImgName = htmlImgElement.src.replace(/^.*[\\\/]/, '').replace(".png", "");
    if (oldImgName == imgName) return; 
    htmlImgElement.src = 'img/' + imgName +'.png';
    htmlImgElement.onload = () => {
        htmlImgElement.width = htmlImgElement.naturalWidth * zoom;
        htmlImgElement.height = htmlImgElement.naturalHeight * zoom;
    };
};