function insert_img(img_uri, store_name){
    alert(img_uri);
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO store_images (img_uri, store_name) VALUES(?, ?)', [img_uri, store_name], function(tx, result){
            alert("success");
            location.reload();
        });
    });
}