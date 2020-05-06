// global config
var debug = true  // debug mode true-false
var default_grid = {
    x: 10,
    y: 150,
    cell_width: 100,
    cell_sapacing: 5,
    margin_bot: 100,
    margin_left: 50,
    file_ext: ".svg"
}


// start
var map = localStorage.getItem('map');

if(!map){ // if new map
    generate_grid(default_grid, div_grid)
} else {
    
    console.log(map)
    map = JSON.parse(map)
    if(debug) console.log('map start')
    if(debug) console.log(map)
    div_grid(default_grid) // load map
    contruct_inventary()
}

//getAdjacentCells(0, 0)


// collapse declare
$('#inventory').collapse({
    toggle: false
})
