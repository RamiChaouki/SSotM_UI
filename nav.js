window.addEventListener("load", shownav);
$("body").prepend("<nav></nav>");
var xhr = new XMLHttpRequest();
function shownav() {

    xhr.open('GET', 'template-html.txt');
    xhr.onreadystatechange = function () {
        console.log(`state changed: ${xhr.readyState}`);
        if (xhr.readyState == 4 && xhr.status == 200) {
            $("nav").append(xhr.responseText);
        }
    }
    xhr.send();

}