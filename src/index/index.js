// on load .map
$('.open_map').change(function(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var obj = JSON.parse(event.target.result);
        console.log(obj)
        localStorage.setItem('map', JSON.stringify(obj))
        window.location.href = "/editor"
    }
    reader.readAsText(e.target.files[0]);
})

//on click new map 
function new_map(){
    localStorage.removeItem('map')
    window.location.href = "/editor"
}

function load_cache(){
    window.location.href = "/editor"
}