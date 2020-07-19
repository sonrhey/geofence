// // var crd = pos.coords;
// var latitude = 10.287681;
// var longitude = 123.8969322;

// // var latitude = crd.latitude;
// // var longitude = crd.longitude;

// var mapObj = new GMaps({
//     el: '#map',
//     lat: latitude,
//     lng: longitude
// });


var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
  
function success(pos) {
    // $("#location").modal("show");
    var crd = pos.coords;
    var latitude = crd.latitude;
    var longitude = crd.longitude;

    var mapObj = new GMaps({
        el: '#map',
        lat: latitude,
        lng: longitude,
        disableDefaultUI: true
    });

    mapObj.map.set("disableDefaultUI", true);

    var circle = mapObj.drawCircle({
    lat: latitude,
    lng: longitude,
    radius: 500,
    fillColor: 'yellow',
    fillOpacity: 0.5,
    strokeWeight: 0,
    click: function(e){
        alert('You are inside of your fence!')
    }
    });

    setInterval(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var marker = mapObj.addMarker({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                draggable: false,
                fences: [circle],
                outside: function(marker, fence) {
                    alert('This marker has been moved outside of its fence');
                }
                });

                google.maps.event.trigger(marker, 'dragend');
            });
        }
        mapObj.removeMarkers();
    }, 3000);

}

function error(err) {
console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);