function contruct_inventary(){

    

}


var inv_show = false
var zoom_time;
var zoom_time_on;
function show_inventory(){
    if(inv_show){
        $('#inventory').collapse('hide');
        inv_show = false
        clearTimeout(zoom_time);
    } else {
        $('#inventory').collapse('show');
        inv_show = true
        zoom_timer();
    }

    

    if(debug) console.log('show_inventory')    

}

function zoom_timer() {

    let zoom
    let margin
    //if(detectZoom.device() == 1) zoom = 1 
    //if(detectZoom.device() > 1) zoom = 0.8; margin = 2
    //if(detectZoom.device() > 0.8) zoom = 0.6; margin = 1

    zoom = ((detectZoom.device() ))

    if(debug) console.log(zoom)
    document.getElementById("inventory").style.transform = "scale("+zoom+" )";
    $('#inventory').css('margin-left', margin+'%')
    zoom_time = setTimeout(zoom_timer, 500);
}
