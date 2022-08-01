$(document).ready(function (){
    for(let i=0;i<40;i++){
        $("tbody").append(` <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`);
    }
});

function create_world(){
    let world = [];
    let neighbours = {};
    for(let i=0;i<40;i++){
        let row = [];
        for(let j=0;j<40;j++){
            let n = [];
            if (Math.random() >= 0.5){
                row.push(1);
            } else {
                row.push(0);
            }
            // considering j constant
            if (i+1 >= 0 && i+1 <= 39){
                n.push([i+1,j]);
            }
            if (i-1 >= 0 && i-1 <= 39){
                n.push([i-1,j]);
            }
            // considering i constant
            if (j+1 >= 0 && j+1 <= 39){
                n.push([i,j+1]);
            }
            if (j-1 >= 0 && j-1 <= 39){
                n.push([i,j-1]);
            }
            // considering diagonal neighbours
            if (i-1 >= 0 && i-1 <= 39 && j+1 >= 0 && j+1 <= 39){
                n.push([i-1,j+1]);
            }
            if (i-1 >= 0 && i-1 <= 39 && j-1 >= 0 && j-1 <= 39){
                n.push([i-1,j-1]);
            }
            if (i+1 >= 0 && i+1 <= 39 && j+1 >= 0 && j+1 <= 39){
                n.push([i+1,j+1]);
            }
            if (i+1 >= 0 && i+1 <= 39 && j-1 >= 0 && j-1 <= 39){
                n.push([i+1,j-1]);
            }
            neighbours[[i,j].toString()] = n;
        }
        world.push(row);
    }
    return [world,neighbours];
}