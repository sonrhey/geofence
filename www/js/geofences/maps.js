var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
  
function activate(pos, getaccountid) {
    $('#location').modal("show");
    var latitude = pos.geofence_latitude;
    var longitude = pos.geofence_longitude;
    var radius = Number(pos.geofence_radius);
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
    radius: radius,
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
                draggable: true,
                fences: [circle],
                outside: function(marker, fence) {
                    alert('This marker has been moved outside of its fence');
                    sendMessageToContacts(getaccountid);
                }
                });

                google.maps.event.trigger(marker, 'dragend');
            });
        }
        mapObj.removeMarkers();
    }, 3000);

}

function sendMessageToContacts(getaccountid){
    var ipconfig = ipaddress();
    $.ajax({
        type: "POST",
        url: ipconfig+"sendmessage.php",
        data: {user_id:getaccountid},
        success: function(response){

        }
    });
}