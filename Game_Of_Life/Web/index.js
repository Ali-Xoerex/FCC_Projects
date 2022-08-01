$(document).ready(async function (){
    for(let i=0;i<40;i++){
        $("tbody").append(` <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`);
    }
    $("#startstop").click(function () {
        // start and stop
        if (clear === 1){
            clear = 0;
        }
        if (stop === 1){
            stop = 0;
        } else if (stop === 0){
            stop = 1;
        }
    });
    
    $("#clear").click(function () {
        // clears the board
        clear = 1;
        generations = 0;
        $("#gens").text(0);
        out = create_world(true);
        w = out[0];
        $("td").css("background-color","white"); 
    });

    $("#random").click(function () {
        generations = 0;
        $("#gens").text(0);
        out = create_world(false);
        w = out[0];
        clear = 0;
        stop = 0;
    });
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    var out, w, n;
    var clear = 0;
    var stop = 0;
    var generations = 0;
    out = create_world(false);
    w = out[0];
    n = out[1];

    while (true){
        if (!clear && !stop){
            draw(w);
            await sleep(100);
            evolution(w,n);
            generations++;
            $("#gens").text(generations);
        } else if (clear) {
            generations = 0;
            $("#gens").text(0);
            await sleep(200);
        } else if (stop){
            await sleep(200);
        }
    }
});

function create_world(empty){
    let world = [];
    let neighbours = {};
    for(let i=0;i<40;i++){
        let row = [];
        for(let j=0;j<40;j++){
            let n = [];
            if (empty){
                row.push(0);
            } else if (Math.random() >= 0.5){
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
            } else {
                // background red
                $(table_rows[i].children[j]).css("background-color","red");
            }
        }
    }
}

function evolution(w,n){
    for(let i=0;i<40;i++){
        for(let j=0;j<40;j++){
            let neighbours = n[[i,j].toString()];
                let lives = 0;
                neighbours.forEach(function(el) {
                   if (w[el[0]][el[1]] === 1){
                       lives ++;
                   }
            });
            if (w[i][j] === 0){
                // we have a dead cell
                if (lives === 3){
                    w[i][j] = 1; // revive dead cell
                }
            
            } else {
              // we have a live cell
              if (lives < 2){
                  w[i][j] = 0;
              } else if (lives > 3){
                  w[i][j] = 0;
              }
            }
        }
    }
}
