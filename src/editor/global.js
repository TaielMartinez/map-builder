// global config
var debug = true  // debug mode true-false
var defile = ".svg" // default sprite format
var default_grid = {
    x = 10,
    y = 10
}


// start
var map = localStorage.getItem('map')

if(!map){
    generate_grid(default_grid)
}