//       BLOBAL VAR       //

var map = {
    json_version: "1.1.0",
    name: "",
    version: 0,
    map_id: 0,
    author: "",
    materials: new Array,
    grid: new Array()
}

// disable rigth click contextual menu
document.addEventListener('contextmenu', event => event.preventDefault());

//console.log(map) // test log


//       BLOBAL VAR


//       GRID ZOOM       //
function setZoom(zoom,el) {
      
    transformOrigin = [0,0];
      el = el || instance.getContainer();
      var p = ["webkit", "moz", "ms", "o"],
          s = "scale(" + zoom + ")",
          oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

      for (var i = 0; i < p.length; i++) {
          el.style[p[i] + "Transform"] = s;
          el.style[p[i] + "TransformOrigin"] = oString;
      }

      el.style["transform"] = s;
      el.style["transformOrigin"] = oString;
    
}

function showVal(a){
    $('#grid_zoom').val(a)
    $('#grid_zoom_num').val(a)
 var zoomScale = Number(a)/10;
 setZoom(zoomScale,document.getElementsByClassName('grid_0')[0])
 setZoom(zoomScale,document.getElementsByClassName('grid_1')[0])
 setZoom(zoomScale,document.getElementsByClassName('grid_2')[0])
 //       GRID ZOOM
}





//       COLLAPSE DECLARATED       //

    $('#map_config_collapse').collapse({
        toggle: false
    })

    $('#toolbar_collapse').collapse({
        toggle: false
    })

    $('#toolbar_texture_collapse').collapse({
        toggle: false
    })

    $('#toolbar_object_collapse').collapse({
        toggle: false
    })

    $('#underbar_collapse').collapse({
        toggle: false
    })

    $('#open_collapse').collapse({
        toggle: true
    })

    $('#open_select_collapse').collapse({
        toggle: true
    })

    $('#new_map_menu_collapse').collapse({
        toggle: false
    })

    $('#control_view_collapse').collapse({
        toggle: false
    })


//       COLLAPSE DECLARATED