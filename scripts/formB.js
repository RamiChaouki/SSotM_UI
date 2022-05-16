// Java Script for formB page


/*
 * 
 * @param {*} dropDownList 
 */
/*
function addAdultInfo(dropDownList) {
    // target div for creating a new adult input boxes
    console.log(dropDownList.id);
    const targetDiv = document.getElementById('targetDiv_adult');
    const currentAdults = targetDiv.getElementsByTagName('div');
    const nbOfCurrentAdults = currentAdults.length;
    // create a unique identifier for the new text field
    let nbOfNewadults = parseInt(dropDownList.value);
    // list of boxes to be created per adult
    const boxes = ['fname', 'lname', 'age', 'allergen'];
    const labelsText = ['First Name', 'Last Name', 'Age', 'Allergen']

    let diffCurrNew = nbOfNewadults - nbOfCurrentAdults
    if (diffCurrNew > 0) {
        for (let counter = nbOfCurrentAdults + 1; counter <= nbOfNewadults; counter++) {
            // create div with an id
            let adultDiv = document.createElement('div');
            let adultDiv_id = 'Adult' + counter;
            // create and add div heading
            adultDiv.id = adultDiv_id;
            let divHeading = document.createElement('h5');
            divHeading.innerHTML = 'Adult ' + counter;
            adultDiv.appendChild(divHeading);


            // create fname, lname, and Age input boxes
            for (let index = 0; index < boxes.length; index++) {
                // boxType
                let boxType = boxes[index];

                // div heading
                // boxLabel
                let boxLabel = document.createElement('label');
                boxLabel.setAttribute('for', (adultDiv_id + '_' + boxType));
                boxLabel.setAttribute('class', 'form-label');
                boxLabel.innerHTML = labelsText[index];


                let boxInput = document.createElement('input');
                boxInput.setAttribute('id', (adultDiv_id + '_' + boxType));
                boxInput.setAttribute('required', 'required');
                boxInput.setAttribute('class', 'form-control');

                (boxType == 'age') ? boxInput.setAttribute('type', 'number') : boxInput.setAttribute('type', 'text');
                // boxInput.setAttribute('size', '20');

                adultDiv.appendChild(boxLabel);
                adultDiv.appendChild(boxInput);
            }

            // console.log(adultDiv);
            targetDiv.appendChild(adultDiv);
            targetDiv.appendChild(document.createElement('br'));
            // console.log(document.getElementById(adultDiv_id));
        }
    }

    if (diffCurrNew < 0) {
        for (let counter = nbOfCurrentAdults - 1; counter >= nbOfNewadults; counter--) {
            let removedDiv = currentAdults[counter];
            targetDiv.removeChild(removedDiv);
        }
    }

}  // end function addTextField
*/

/**
 * A function that adds/removes info boxes for adults or children based on selection
 * @param {*} dropDownList 
 */
function addInfo(dropDownList) {
    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    // console.log(lang)
    // list of boxes to be created per adult
    const boxes = ['fname', 'lname', 'age', 'allergen'];
    let labelsText;
    if (lang == 'English') {
        labelsText = ['First Name', 'Last Name', 'Age', 'Allergens'];
    } else {
        labelsText = ['Prénom', 'Nom de famille', 'Âge', 'Allergènes'];
    }

    // target div for creating a new adult input boxes
    let target = (dropDownList.id == 'number-of-adults') ? 'Adult' : 'Child';
    let targetDiv_id = (target == 'Adult') ? 'targetDiv_adult' : 'targetDiv_children';
    const targetDiv = document.getElementById(targetDiv_id);

    // number of current subDivs on page
    const targetDivChildren = targetDiv.getElementsByTagName('div');
    const currentNb = targetDivChildren.length;

    // new number of divs to be created according to selection
    let newNb = parseInt(dropDownList.value);

    // difference between number of current divs and new div elements to be created
    let diffCurrNew = newNb - currentNb
    // if diffCurrNew > 0 => we should create new div elements for new humans
    if (diffCurrNew > 0) {
        for (let counter = currentNb + 1; counter <= newNb; counter++) {
            // create div with an id
            let newDiv = document.createElement('div');
            let newDiv_id = target + counter;
            // create and add div heading
            newDiv.id = newDiv_id;
            let divHeading = document.createElement('h5');
            if (lang == 'English') {
                divHeading.innerHTML = target + ' ' + counter;
            } else {
                if (target == 'Adult') {
                    divHeading.innerHTML = 'Adulte ' + counter;
                }
                if (target == 'Child') {
                    divHeading.innerHTML = 'Enfant ' + counter;
                }
            }

            newDiv.appendChild(divHeading);


            // create fname, lname, and Age input boxes
            for (let index = 0; index < boxes.length; index++) {
                // boxType
                let boxType = boxes[index];

                // div heading
                // boxLabel
                let boxLabel = document.createElement('label');
                boxLabel.setAttribute('for', (newDiv_id + '_' + boxType));
                boxLabel.setAttribute('class', 'form-label');
                boxLabel.innerHTML = labelsText[index];


                let boxInput = document.createElement('input');
                boxInput.setAttribute('id', (newDiv_id + '_' + boxType));
                boxInput.setAttribute('name', (newDiv_id + ' ' + boxType));
                boxInput.setAttribute('required', 'required');
                boxInput.setAttribute('class', 'form-control');

                (boxType == 'age') ? boxInput.setAttribute('type', 'number') : boxInput.setAttribute('type', 'text');
                // boxInput.setAttribute('size', '20');

                newDiv.appendChild(boxLabel);
                newDiv.appendChild(boxInput);
            }

            // console.log(adultDiv);
            targetDiv.appendChild(newDiv);
            targetDiv.appendChild(document.createElement('br'));
        }
    }

    // if diffCurrNew < 0; we should remove from those on page 
    if (diffCurrNew < 0) {
        for (let counter = currentNb - 1; counter >= newNb; counter--) {
            let removedDiv = targetDivChildren[counter];
            targetDiv.removeChild(removedDiv);
        }
    }

}  // end function addInfo()

/**
 * A function that adds payment info based on checked radio box
 * @param {*} paymentList 
 */
function addPaymentInfo(paymentList) {
    // Page language detection
    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    // text to be presented accodrding to detected language

    const stringList_json = `{
        "english": {
            "cardNumber": "Credit Card Number",
            "cardHolder": "Card holder",
            "CVS": "The 3-4 digits on the back of your card",
            "expiryDate": "Expiry Date",
            "cryptoWallet": "Crypto wallet address"

            },
        "french": {
            "cardNumber": "Numéro de Carte de Crédit",
            "cardHolder": "Titulaire de la carte",
            "CVS": "Les 3-4 chiffres au dos de votre carte",
            "expiryDate": "Date d'expiration",
            "cryptoWallet": "Adresse du portefeuille crypto"

        }}`;

    stringList = (lang == 'English') ? JSON.parse(stringList_json).english : JSON.parse(stringList_json).french;
    // identify checked button from payment methods
    let payment_method = document.querySelector("input[type='radio'][name='payment-method']:checked").id;
    // console.log(payment_method);
    // identify current month (to be used as minimum in expiry date)
    let currentDate = new Date();
    const startDate = new Date("2015-03");
    startDate.setMonth(currentDate.getMonth());
    startDate.setFullYear(currentDate.getFullYear());
    // card payment methods
    let cards = ["visa", "mastercard", "americanexpress"];
    // if selected payment method uses cards, then show info boxes for cards to be filled
    if (cards.includes(payment_method)) {
        // if there is already a payment method, remove it
        if ($('paymentInfo')) {
            $("#paymentInfo").remove();
        }
        // add info boxes rto be filled
        $('#targetDiv_payment').append(`
        <div id="paymentInfo">

        <label for="card-number" class="form-label">${stringList.cardNumber}</label>
        <input type="text" class="form-control" id="card-number" size="35" maxlength="16" required>
          <br>
        <label for="card-holder" class="form-label">${stringList.cardHolder}</label>
        <input type="text" class="form-control" id="card-holder" size="35" maxlength="100">
          <br>
        <label for="cvs" class="form-label">CVS</label>
        <input type="text" class="form-control" id="cvs" placeholder=${stringList.CVS} size="4" maxlength="4">
          <br>
          <label for="expiry-date">${stringList.expiryDate}</label>
          <input type="month" id="expiry-date" name="expiry-date" min=${startDate} value='yyyy-MM'>

          </div>
`);
    }
    // if selected payment method uses crypto, show info box to inpu wallet number
    else {
        // if there is already a payment method, remove it
        if ($('paymentInfo')) {
            $("#paymentInfo").remove();
        }

        $('#targetDiv_payment').append(`
        <div id="paymentInfo">

        <label for="wallet-address" class="form-label">${stringList.cryptoWallet}</label>
        <input type="text" class="form-control" id="wallet-address" size="35" maxlength="35" required>
          </div>
`);
    }
} // end addPaymentInfo() function

/*
$(document).ready(function () {
    //  window.alert('Welcome to  website')
});
*/

/**
 * 
 */
function formValidation(ev) {
    
    let inputs = $('#booking_form input, #booking_form input');
    // console.log(inputs);
    let emptyFields = [];

    for(let index = 0; index < inputs.length; index++) {
        // console.log(!inputs[index].value);
        if(!inputs[index].value) {
            emptyFields.push(inputs[index])
        }
    }

    console.log(emptyFields.length);

    let excludeIDs = ['allergies-text', 'other-diets', 'submit_form'];
    if(emptyFields.length > 0) {
        ev.preventDefault();
        $('#warnings').addClass("alert alert-danger col-md-4 offset-md-4 text-center");
        for(let emptyElement of emptyFields) {

            console.log(emptyElement.id);
            if(excludeIDs.includes(emptyElement.id)) {
                continue;
            }
            
            // $('#warnings').append(`<p>${isEmpty} is a required field</p>`);
            if(emptyElement.name){
                $('#warnings').append(`<p>${emptyElement.name} is a required field</p>`);
            } else if(emptyElement.labels[0]){
                $('#warnings').append(`<p>${emptyElement.labels[0].innerHTML} is a required field</p>`);
            } else {
                $('#warnings').append(`<p>${isEmpty} is a required field</p>`);
        }
            
        }
        document.querySelector('#warnings').scrollIntoView(true);
    }
    
}

  