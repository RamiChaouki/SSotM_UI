var p = new Promise((resolve, reject) => {
    
    $("body").prepend("<nav id='ajax'></nav>");
    var xhr = new XMLHttpRequest();
    var htmlLoaded = 0;
    xhr.open('GET', 'template-html.txt');
    xhr.onreadystatechange = function () {
        //console.log(`state changed: ${xhr.readyState}`);

        if (xhr.readyState == 4 && xhr.status == 200) {
            $("nav#ajax").append(xhr.responseText);
            htmlLoaded = 1;
            console.log(`first html loaded status:${htmlLoaded} `);
            if(htmlLoaded==1){
            resolve("it's resolved")}
            else{reject("it's rejected")}
        }
    }
    xhr.send();

});



function setLang(en,fr) {
    p
        .then(function () {
            console.log("message");
            $("#english").val(en);
            console.log($('#english').val());
            $("#francais").val(fr);
        })
        .catch(function () {
            console.log("message");
            $("#english").val(en);
            console.log($('#english').val());
            $("#francais").val(fr);
        });

}
