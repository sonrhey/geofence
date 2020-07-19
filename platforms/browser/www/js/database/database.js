var db = openDatabase('local_ettendance', '1.0', 'local_ettendance', 2 * 1024 * 1024);

function create_table(){
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE store_images (img_uri text, store_name text)');
    });
}

function destroy_table(){
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE store_images');
    });
}

create_table();
// destroy_table();