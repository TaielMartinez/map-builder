// KEYBOARD PRESS //
$(document).keypress(function(e){
    console.log(e.which)
    switch (e.which) {
        case 96:   // change toolbar
            if(grid_show) toolbar_alternate();
            break;
        case 111:  // show and hide configuration
            if(grid_show) map_config_collapse();
            break;
        case 112:  // download .map
            if(grid_show) download_map();
            break;
        case 45:  // zoom out
            if(grid_show) {
                let val = Number($('#grid_zoom').val());
                showVal(val-1)
                console.log($('#grid_zoom').val())
            }
        case 115:  // zoom out
            if(grid_show) {
                let val = Number($('#grid_zoom').val());
                showVal(val-1)
                console.log($('#grid_zoom').val())
            }
        case 61:  // zoom in
            if(grid_show) {
                let val = Number($('#grid_zoom').val());
                showVal(val+1)
                console.log($('#grid_zoom').val())
            }
            break;
        case 43:  // zoom in
            if(grid_show) {
                let val = Number($('#grid_zoom').val());
                showVal(val+1)
                console.log($('#grid_zoom').val())
            }
            break;
        case 119:  // zoom in
            if(grid_show) {
                let val = Number($('#grid_zoom').val());
                showVal(val+1)
                console.log($('#grid_zoom').val())
            }
            break;
        case 122:
            toolbar_alternate(0);
            break;
        case 120:
            toolbar_alternate(1);
            break;
        case 99:
            toolbar_alternate(2);
            break;
        case 49:
            tool_select(toolbar_actual, 1);
            break;
        case 50:
            tool_select(toolbar_actual, 2);
            break;
        case 51:
            tool_select(toolbar_actual, 3);
            break;
        case 52:
            tool_select(toolbar_actual, 4);
            break;
        case 53:
            tool_select(toolbar_actual, 5);
            break;
        case 54:
            tool_select(toolbar_actual, 6);
            break;
        case 55:
            tool_select(toolbar_actual, 7);
            break;
        case 56:
            tool_select(toolbar_actual, 8);
            break;
        case 57:
            tool_select(toolbar_actual, 9);
            break;
        case 48:
            tool_select(toolbar_actual, 10);
            break;
    
        default:
            break;
    }
    //var checkMoz=(e.which==122 && e.ctrlKey ? 1 : 0);
});

// KEYBOARD PRESS