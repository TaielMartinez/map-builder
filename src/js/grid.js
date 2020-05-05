// Principal menu
function new_map_menu(val){
    if(val){  // y and x selected
        let map_y = $('.new_map_menu_y').val();
        let map_x = $('.new_map_menu_x').val();
        console.log(map_y)
        console.log(map_x)
        construct_grid(false, map_y, map_x);
    } else {  // new map select
        $('#open_select_collapse').collapse('hide');
    }
}


//    On file select ejecut "construct_grid()"
$(".inputfile").change(function(e) {
    onChange(e);
});

function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    var obj = JSON.parse(event.target.result);
    construct_grid(obj)
}
//------------


// Grid construct (map_import = map object or false) (y and x to new grid generate) (cache boolean)
// (false, false, false, false) is a new 50x50 grid generate
function construct_grid(map_import, y, x, cache){

    //console.log(map) // test log
    // Show HUD in screen
    $('#open_collapse').collapse('hide');
    $('#map_config_collapse').collapse('show');
    $('#toolbar_collapse').collapse('show');
    $('#underbar_collapse').collapse('show');
    grid_show = true;
    $('.loading_grid').css('display', 'block')
    $('#control_view_collapse').collapse('show');


    // new map setting
    y_length = 10;
    x_length = 10;
    def_texture = 0;
    file_format = '.svg';

    if(cache){ // If press "load cache" button
        map_import = JSON.parse(localStorage.getItem('map'));
        map = map_import;
        if(!localStorage.getItem('map')){ // if don't exits cache data
            alert('No hay datos en la cache!');
        }
    }

    if(!map_import){ // if don't load mapa

        map_import = map;

        if(y){y_length=y} //if usea "new map" and declarate specific width
        if(x){x_length=x}



        // Generate new grid structure

        //console.log(x_grid); // test log
        for (let y = 0; y < y_length; y++) {
            let x_grid = new Array(0);
            let z_grid = [
                [def_texture, 0],
                [def_texture, 0],
                [def_texture, 0]
            ];
            for (let x = 0; x < x_length; x++) {
                x_grid.push(z_grid);
            }
            map.grid.push(x_grid)
        }
    } else {
        console.log(map_import)
        map = map_import;
    }


    // DOM (html) generated
    let html = "";

    for (let y = 0; y < map.grid.length; y++) {
        html = html + '<div class="row linea2">';
        for (let x = 0; x < map.grid[0].length; x++) {
            html = html + `
                <div class="`+y+`-`+x+` cuadrado" onmousedown="grid_click('`+y+`','`+x+`', event)"></div>
                <div class="`+y+`-`+(x+1)+` cuadrado2" onmousedown="grid_click('`+y+`','`+(x+1)+`', event)"></div>
            `;
            x++
        }
        html = html + '</div>';
    }

    console.log(map) // control log
    $(".grid_0").html(html);
    $(".grid_1").html(html);
    $(".grid_2").html(html);


    // Sprites select and print
    for (let y = 0; y < map.grid.length; y++) {
        for (let x = 0; x < map.grid[0].length; x++) {
            rotation_cod(y, x, 0)
            rotation_cod(y, x, 1)
            rotation_cod(y, x, 2)
            $('.grid_0 .'+y+'-'+x).css('background-image', 'url("src/img/sprite/0/'+map.grid[y][x][0][0]+'/'+rotation_dec(map.grid[y][x][0][1], y, x)+file_format+'")')
            $('.grid_1 .'+y+'-'+x).css('background-image', 'url("src/img/sprite/1/'+map.grid[y][x][1][0]+'/'+rotation_dec(map.grid[y][x][1][1], y, x)+file_format+'")')
            $('.grid_2 .'+y+'-'+x).css('background-image', 'url("src/img/sprite/2/'+map.grid[y][x][2][0]+'/'+rotation_dec(map.grid[y][x][2][1], y, x)+file_format+'")')
        }
    }

    rotation_cod(3,3,2)
    // .grid css modify
    let px = 28 * map.grid[0].length; // calculate body witdh
    $('.grid').css('width', px+'px')  // hexagon + margin = 28px
    
    tool_select(1, 1) // Select tool
}



// Rotation decodification
// (layer = tool)

function rotation_cod(y, x, layer){
    let sprite = map.grid[y][x][layer][0];
    let cell = map.grid[y][x][layer][0];
    let as = new Array();
    


    if(y <= y.length){ // adjacent sprite 1
        as[0] = fun_comp(map.grid[y+1][x][layer][0], cell);
    } else {
        as[0] = 0;
    }

    if(x < x.length){ // adjacent sprite 2
        if(x%2 == 0){
            if(y > 0){
                as[1] = fun_comp(map.grid[y-1][x+1][layer][0], cell);
            } else {
                as[1] = 0;
            }
        } else {
            as[1] = fun_comp(map.grid[y][x+1][layer][0], cell);
        }
    } else {
        as[1] = 0;
    }

    if(y > 0 && x < x.length){ // adjacent sprite 3
        as[2] = map.grid[y-1][x+1][layer][0];
    } else {
        as[2] = 0;
    }

    if(y > 0){ // adjacent sprite 4
        as[3] = map.grid[y-1][x][layer][0];
    } else {
        as[3] = 0;
    }

    if(y > 0 && x > 0){ // adjacent sprite 5
        as[4] = map.grid[y-1][x-1][layer][0];
    } else {
        as[4] = 0;
    }

    if(x > 0){ // adjacent sprite 6
        if(x%2 == 0){
            if(y < y.length){
                as[5] = map.grid[y+1][x-1][layer][0];
            } else {
                as[5] = 0;
            }
        } else {
            as[5] = map.grid[y][x-1][layer][0];
        }
    } else {
        as[5] = 0;
    }

    console.log(as)
}

function fun_comp(val1, val2){
    if(val1 == val2){
        return 1;
    } else {
        return 0;
    }
}

function rotation_dec(num, y, x){
    if(num == 0){
        return 0;
    }
}