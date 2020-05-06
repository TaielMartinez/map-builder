function generate_grid(grid, callback){
    map = new Object()
    map.rows = new Array()

    for (let y = 0; y < grid.y; y++) {
        map.rows[y] = {
            cells: new Array()
        }
        for (let x = 0; x < grid.x; x++) {
            map.rows[y].cells[x] = {
                layers: new Array()
            }
            for (let z = 0; z < 3; z++) {
                map.rows[y].cells[x].layers[z] = {
                    item: 0,
                    turn: 0
                }
            }
        }
    }

    if(debug)console.log('generate_grid')
    if(debug)console.log(map)
    callback(grid)
}


function div_grid(grid){
    let html = "";
    for (let y = 0; y < map.rows.length; y++) {
        for (let x = 0; x < map.rows[y].cells.length; x++) {
            for (let z = 0; z <3; z++) {

                offsetY = 0;
                if (y % 2 != 0){
                    offsetY = grid.cell_width*-0.433 - grid.cell_sapacing / 2;
                }

                let bottom = (grid.cell_width*0.86) * x + offsetY + grid.cell_sapacing * x + grid.margin_bot
                let left =  (grid.cell_width*0.75) * y + grid.cell_sapacing * y + grid.margin_left
                let item = map.rows[y].cells[x].layers[z].item
                let turn = map.rows[y].cells[x].layers[z].turn
                let file
                if(z > 0 && item == 0){
                    file = ".png"
                } else {
                    file = grid.file_ext
                }

                html = html + `<img src="../Render/`+z+`/`+item+`/`+turn+file+`" 
                class="cells layout_`+z+` cell_`+x+`_`+y+`_`+z+`" 
                onclick="" 
                width="`+grid.cell_width+`"
                style="position: absolute;
                left: `+left+`px; 
                bottom: `+(bottom - (grid.x*86))+`px;
                z-index: `+z+`">`

            }
        }
    }

    $('.grid').html(html)

    if(debug) console.log('div_grid')
}