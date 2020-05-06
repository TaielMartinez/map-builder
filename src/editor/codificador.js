function getAdjacentCells (x, y){

    let adjacent = new Array()
    let l_x = map.rows[0].cells.length
    let l_y = map.rows[0].cells.length

    adjacent[0] = [false, x, y - 1]
    adjacent[3] = [false, x, y + 1]

    if(x % 2 == 0){

        adjacent[2] = [false, x + 1, y + 1]
        adjacent[1] = [false, x + 1, y]
        adjacent[4] = [false, x - 1, y + 1]
        adjacent[5] = [false, x - 1, y]
        
    } else {

        adjacent[2] = [false, x + 1, y - 1]
        adjacent[1] = [false, x + 1, y]
        adjacent[4] = [false, x - 1, y - 1]
        adjacent[5] = [false, x - 1, y]

    }

    if(debug) console.log('getAdjacentCells')
    if(debug) console.log(adjacent)

    for (let i = 0; i < adjacent.length; i++) {
        if ((map.rows.length <= adjacent[i][1] || map.rows[0].length <= adjacent[i][2] 
            || 0 > adjacent[i][1] || 0 > adjacent[i][2])){
                adjacent[i][0] = true
        }
    }
    
    if(debug) console.log('getAdjacentCells')
    if(debug) console.log(adjacent)
    return adjacent

}