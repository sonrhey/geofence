$(document).ready(function(){
    function getParameterByName(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    } 
    
    var getaccountname = getParameterByName('account_name');
    var getaccountid = getParameterByName('account_id');
    var userprofile = getParameterByName('user_profile');
    var ipconfig = ipaddress();
    
    var getcontacts = $(function(){
        var information = "user_id="+getaccountid;
        var url = ipconfig+"getcontacts.php";
        $.ajax({
            type: "GET",
            url: url,
            data: information,
            success: function(response){
                $('.contacts-list').html(response);
            }
        });
    });

    $('#contacts-submit').on('submit', function(e){
        e.preventDefault();
        var information = $(this).serialize()+"&user_id="+getaccountid;
        var url = ipconfig+"contact.php";
        postRequest(url, information);
    });
    
    function postRequest(url, data){
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function(response){
                var decode = $.parseJSON(response);
                alert(decode.message);
                location.reload();
            }
        });
    }
});