$(document).ready(function (){
    for(let i=0;i<40;i++){
        $("tbody").append(` <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`);
    }
    let out, w, n;
    out = create_world();
    w = out[0];
    n = out[1];

    draw(w);
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

function draw(world){
    let table_rows = $("tbody").children();
    for (let i=0;i<40;i++){
        for (let j=0;j<40;j++){
            if (world[i][j] === 0){
                // background white
                $(table_rows[i].children[j]).css("background-color","white");
                console.log("========");
            } else {
                // background red
                $(table_rows[i].children[j]).css("background-color","red");
            }
        }
    }
}
