//  Java Script fucntions for the Splash page
/**
 * A function that changes the language of text on page
 */
function changeLang() {

    lang = document.getElementById('lang');
    console.log(lang.innerHTML)
    if(lang.innerHTML == 'EN') {
        lang.innerHTML = 'FR'
    } else {
        lang.innerHTML = 'EN'
    }
    
    console.log(lang.innerHTML)
    let demoText = document.getElementById('demo_text');
    let redirectText = document.getElementById('reditect_text');
    demoText.innerHTML = (lang.innerHTML == 'EN') ? 'Next Available Launch in' : 'Prochain Lancement Disponible dans';
    redirectText.innerHTML = (lang.innerHTML == 'EN') ? 'Next Available Launch in' : 'Prochain Lancement Disponible dans';
    
    let launchDate = "Jan 5, 2023 13:00:00";
    countdown(launchDate);
}

/**
 * Calculatiuon of time till launch date; returns time difference in milliseconds
 * @param {text} launchDate 
 * @returns 
 */
function calculateLaunchTime(launchDate) {
    
    // Set the date we're counting down to
    var countDownDate = new Date(launchDate).getTime();

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    return distance;
}

/**
 * A function that calculates days, hours, minutes and seconds until launch date then present them on splash page
 * @param {text} lunchDate 
 */
function countdown(launchDate) {

    let distance = calculateLaunchTime(launchDate);

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    let lang = document.getElementById('lang').innerHTML;
    if(lang == 'EN'){
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
    } else {
        document.getElementById("demo").innerHTML = days + "j " + hours + "h "
        + minutes + "m " + seconds + "s ";
    }

}



// // Update the count down every 1 second
// let launchDate = "Jan 5, 2023 13:00:00";
// let distance = calculateLaunchTime(launchDate);
// const demoInterval = setInterval('countdown();', 1000);
// // If the count down is over, write some text 
// if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
// }