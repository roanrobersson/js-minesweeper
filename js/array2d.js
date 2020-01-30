class Array2D extends Array{
    constructor(w, h) {
        super();
        for(let i = 0; i < w; i++) this[i] = new Array(9);
    };

    toArray1D() {
        let arr = [];
        for(let i in this) 
            for(let j in this[i]) 
                arr.push(this[i][j]);
        return arr;
    };
}