var imgdata;

$(document).ready(function(){
    var countries_calling_codes = $(function(){
        $.ajax({
            type: 'GET',
            url: 'https://restcountries.eu/rest/v2/all',
            success: function(response){
                var count = response.length;
                for(var i=0;i<count;i++){
                    $('.calling-codes').append('<option value="'+response[i].callingCodes+'">'+response[i].alpha3Code+' +'+response[i].callingCodes+'</option>');
                    $('.calling-code-flag').attr('src', response[0].flag);
                }
            }
        });
    });
    var ipconfig = ipaddress();
    $('#register').submit(function(e){
        e.preventDefault();
        // $('#message-loading').modal('show');
        var informations = $(this).serialize();
        saveToDB(informations);
        // $.ajax({
        //     type: "POST",
        //     url: ipconfig+'register.php',
        //     data: informations,
        //     success: function(response){
        //         alert(response);
        //         // $('#message-loading').modal('hide');
        //         var decode = $.parseJSON(response);
        //         $('.message').html(decode.message);
        //         location.replace('dashboard.html?account_name='+decode.account_name+"&account_id="+decode.account_id);
        //     },
        //     error: function(error){
        //         alert(error.responTxt);
        //     }
        // });
    });

    $('.calling-codes').on('change', function(){
        var callingCodes = this.value;
        changeFlag(callingCodes);
    });

    $('.camera').on('click', function(){
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
            sourceType: Camera.PictureSourceType.CAMERA, 
            destinationType: Camera.DestinationType.FILE_URI,
        });
      });
  
      $('.gallery').on('click', function(){
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY, 
            // allowEdit: true,
            destinationType: Camera.DestinationType.FILE_URI,
            correctOrientation: true
        });
      });

    function changeFlag(callingCode){
        $.ajax({
            type: "GET",
            url: "https://restcountries.eu/rest/v2/callingcode/"+callingCode,
            success: function(response){
                $('.calling-code-flag').attr('src', response[0].flag);
            }
        });
    }

    function onSuccess(imageURI) {
    $('#choose-source').modal("hide");
    // Set image source
    imgdata = imageURI  + '?' + Math.random();
    $("#img").removeClass("fa fa-user fa-3x");
    $("#img").css({"background-image":"url('"+imgdata+"')", "background-size":"cover", "border":"2px solid #ff7a45"});
    }
    
    function onFail(message) {
    alert('Failed because: ' + message);
    }

    function saveToDB(informations){
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imgdata.substr(imgdata.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";

        var params = {};
        params.value1 = "test";
        params.value2 = "param";

        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imgdata, ipconfig+"register.php?"+informations+"", function(result){
            var decode = $.parseJSON(result.response);
            alert(decode.message);
            // alert(decode.message);
            location.replace('dashboard.html?account_name='+decode.account_name+"&account_id="+decode.account_id+"&user_profile="+decode.img_path);
        }, function(error){
            alert('error : ' + JSON.stringify(error));
        }, options);
    }
});