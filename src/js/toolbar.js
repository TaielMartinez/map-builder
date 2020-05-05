// procedural construct toolbar
// modify "tool_qua" in the next function to change quantity tools
// modify "tool_texture_qua" in the next function to change texture tools
// Iclude tool 0, 0 is default texture
let tool_qua = 15;
let tool_texture_qua = 15;
let tool_object_qua = 15;
construct_toolbar()
construct_toolbar_texture()
construct_toolbar_object()
// use "./src/img/tools/[tool_qua].png" to load a new tools
// use "./src/img/textures/[tool_qua].png" to load a new texture

function construct_toolbar(){
    let html = '<span class="mt-2 mr-1">Caminos</span>';

    for (let index = 1; index < tool_qua; index++) {
        html = html + `
            <div class="icon tool_1_`+index+`"  onclick="tool_select(1, `+index+`)" >
                <img src="src/img/1/`+index+`.svg" alt="">
            </div>
        `;
    }


    $('.toolbar').html(html)
};

function construct_toolbar_texture(){
    let html = '<span class="mt-2 mr-3">Suelos</span>';

    for (let index = 1; index < tool_texture_qua; index++) {
        html = html + `
            <div class="icon tool_0_`+index+`"  onclick="tool_select(0, `+index+`)" >
                <img src="src/img/0/`+index+`.svg" alt="">
            </div>
        `;
    }


    $('.toolbar_texture').html(html)
};

function construct_toolbar_object(){
    let html = '<span class="mt-2 mr-2">Objetos</span>';

    for (let index = 1; index < tool_qua; index++) {
        html = html + `
            <div class="icon tool_2_`+index+`"  onclick="tool_select(2, `+index+`)" >
                <img src="src/img/2/`+index+`.svg" alt="">
            </div>
        `;
    }


    $('.toolbar_object').html(html)
};

// Construct .assests divs in .control_view
let index = 0;
let html = "";
while (index < 20) {
    html = html + ` <div class="sprites_img sprites_img_`+index+`"></div>`;
    index++
}

$('.control_view .assests').html(html)



// Actual tool selected
var tool_selected = [1, 1];
// Defeine 0 to default tool
//$('.tool_1_1').css('background-color','#222222')

// click item in toolbar (type = tool 1, texture 0 or object 2)(item id)
function tool_select(type, tool){
console.log("capa :"+type)
    // clear tools selected color
    for (let layer = 0; layer < 3; layer++) {
        for (let index = 0; index < tool_qua; index++) {
            $('.tool_'+layer+'_'+index).css('background-color','#ffffff00');
        }
    }
    

    // Select tool
    tool_selected = [type, tool]
    // Print tool selected in toolbar
    $('.tool_'+type+'_'+tool).css('background-color','#222222')
    $('.control_view .viewer_img').css('background-image', 'url("src/img/sprite/'+type+'/'+tool+'/0'+file_format+'")')
    $('.control_view .details .details_id').text('Item ID: '+tool)
    if(type==0) $('.control_view .details .details_class').text('Clase: Texturas y Terrenos');
    if(type==1) $('.control_view .details .details_class').text('Clase: Caminos y Canales');
    if(type==2) $('.control_view .details .details_class').text('Clase: Objetos');
    $('.control_view .details .details_layer').text('Capa: '+type)


    let index = 0;
    while ((stop == false && index < 20) || index < 30) {
        
        $('.sprites_img_'+index).css('background-image', 'url("src/img/sprite/'+type+'/'+tool+'/'+index+file_format+'")')
        
        index++
    }

};




var clicks_cache = 0;
//Click hexagon in grid (hexagon cordinates)
function grid_click(y, x, butt){
    if(butt.button == 0){  // if left click
        console.log(y)
        console.log(x)
        console.log(tool_selected[0])
        console.log(tool_selected[1])

        map.grid[y][x][tool_selected[0]][0] = tool_selected[1];  // print hexagon
        $('.grid_'+tool_selected[0]+' .'+y+'-'+x).css('background-image', 'url("src/img/sprite/'+tool_selected[0]+'/'+map.grid[y][x][tool_selected[0]][0]+'/0'+file_format+'")');

        console.log(map)

    } else if(butt.button == 2) { // if rigth click

        if(map.grid[y][x][2][0] == 0){}else{ // if .grid_2 is print -> clear and stop
            map.grid[y][x][2] = [0, 0];
            $('.grid_2 .'+y+'-'+x).css('background-image', 'url("src/img/sprite/2/0/0'+file_format+'")');
            return
        }
        
        if(map.grid[y][x][1][0] == 0){}else{ // if .grid_1 is print -> clear and stop
            map.grid[y][x][1] = [0, 0];
            $('.grid_1 .'+y+'-'+x).css('background-image', 'url("src/img/sprite/1/0/0'+file_format+'")');
            return
        }
        
        if(map.grid[y][x][0][0] = 0){}else{ // if .grid_0 is print -> clear and stop
            map.grid[y][x][0] == [0, 0];
            $('.grid_0 .'+y+'-'+x).css('background-image', 'url("src/img/sprite/0/0/0'+file_format+'")');
            return
        }
        
    }

    if(clicks_cache > 20){
        cache_save()
        console.log("Auto Save")
        clicks_cache = 0
    } else {
        clicks_cache++
    }
};




// Map options bar hide and show
var map_config_collapse_bool = false;
function map_config_collapse(){
    if(map_config_collapse_bool){
        $('#map_config_collapse_options').collapse('hide');
        map_config_collapse_bool = false;
    } else {
        $('#map_config_collapse_options').collapse('show');
        map_config_collapse_bool = true;
    }
}

// click to download button
function download_map(){
    if(save_config()){
        var json_unity = save_config();
        json_unity.rows = reparser_unity();
        json_unity.grid = map.grid;
        $("<a/>", {
            "download": json_unity.name+"_v"+json_unity.version+".map",
            "href": "data:application/json," + encodeURIComponent(JSON.stringify(json_unity))
        }).appendTo("body")
            .click(function() {
            $(this).remove()
        })[0].click()

        cache_save()
    } else {
        cache_save()
        error.log("Error, save_config() don't return")
    }
}

// import input values to map object
function save_config(){
    var json_unity = new Object();

    map.name = $('.map_name').val();
    map.version = $('.map_version').val();
    map.map_id = $('.map_id').val();
    map.author = $('.map_author').val();
    map.materials[0] = $('.map_materials_0').val();
    map.materials[1] = $('.map_materials_1').val();
    map.materials[2] = $('.map_materials_2').val();
    map.materials[3] = $('.map_materials_3').val();
    map.materials[4] = $('.map_materials_4').val();
    map.materials[5] = $('.map_materials_5').val();
    map.materials[6] = $('.map_materials_6').val();
    map.materials[7] = $('.map_materials_7').val();

    json_unity.name = $('.map_name').val();
    json_unity.version = $('.map_version').val();
    json_unity.map_id = $('.map_id').val();
    json_unity.author = $('.map_author').val();
    json_unity.materials = new Array();
    json_unity.materials[0] = $('.map_materials_0').val();
    json_unity.materials[1] = $('.map_materials_1').val();
    json_unity.materials[2] = $('.map_materials_2').val();
    json_unity.materials[3] = $('.map_materials_3').val();
    json_unity.materials[4] = $('.map_materials_4').val();
    json_unity.materials[5] = $('.map_materials_5').val();
    json_unity.materials[6] = $('.map_materials_6').val();
    json_unity.materials[7] = $('.map_materials_7').val();

    return json_unity;
}

function reparser_unity(){
    var json_unity = new Object();
    json_unity.grid = new Array();

    for (let y = 0; y < map.grid.length; y++) {
        let a = new Array();
        for (let x = 0; x < map.grid[y].length; x++) {
            a.push({layers: 
                [
                    {
                        "item": map.grid[y][x][0][0],
                        "turn": map.grid[y][x][0][1]
                    },
                    {
                        "item": map.grid[y][x][1][0],
                        "turn": map.grid[y][x][1][1]
                    },
                    {
                        "item": map.grid[y][x][2][0],
                        "turn": map.grid[y][x][2][1]
                    }
                ]
            })
        }
        json_unity.grid.unshift({
            cells: a
        })
    }

    console.log(json_unity.grid)
    return json_unity.grid;
}

// save map object in LocalStorage (navegator cache)
function cache_save(){
    localStorage.setItem('map', '');
    localStorage.setItem('map', JSON.stringify(map));
}



// TOOLBAR ALTERNATE
let toolbar_actual = 1;
let grid_show = false;
function toolbar_alternate(toolbar_change){
    if(toolbar_change) toolbar_actual = toolbar_change;
    if(toolbar_actual == 1){
        toolbar_actual = 2;
        $('#toolbar_collapse').collapse('hide');
        $('#toolbar_object_collapse').collapse('show');
        $('#toolbar_texture_collapse').collapse('hide');
    } else if (toolbar_actual == 2){
        toolbar_actual = 0;
        $('#toolbar_collapse').collapse('hide');
        $('#toolbar_object_collapse').collapse('hide');
        $('#toolbar_texture_collapse').collapse('show');
    } else {
        toolbar_actual = 1;
        $('#toolbar_object_collapse').collapse('hide');
        $('#toolbar_texture_collapse').collapse('hide');
        $('#toolbar_collapse').collapse('show');
    }
    tool_select(toolbar_actual, 1);
}