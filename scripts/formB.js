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
    console.log(lang)
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

}  // end function addTextField


function addPaymentInfo(paymentList) {
    let payment_method = document.querySelector("input[type='radio'][name='payment-method']:checked").id;
    console.log(payment_method);
    let cards = ["visa", "mastercard", "americanexpress"];
    let currentDate = new Date();
    if (cards.includes(payment_method)) {
        if($('paymentInfo')){
            $( "#paymentInfo" ).remove();
        }
        $('#targetDiv_payment').append(`
        <div id="paymentInfo">

        <label for="card-number" class="form-label">Credit Card Number</label>
        <input type="text" class="form-control" id="card-number" placeholder="Card Number" size="35"
          maxlength="16" required>
          <br>
        <label for="card-holder" class="form-label">Name of card holder</label>
        <input type="text" class="form-control" id="card-holder" placeholder="Name of holder as it appears on the card"
          size="35" maxlength="100">
          <br>
        <label for="cvs" class="form-label">CVS</label>
        <input type="text" class="form-control" id="cvs" placeholder="The 3-4 digits on the back of your card"
          size="4" maxlength="4">
          <br>
          <label for="expiry-date">Expiry Date</label>
          <input type="month" id="expiry-date" name="expiry-date" min=${currentDate} value=${currentDate}>

          </div>
`);
    }
 else {
    
    if($('paymentInfo')){
        $( "#paymentInfo" ).remove();
    }
            
        $('#targetDiv_payment').append(`
        <div id="paymentInfo">

        <label for="wallet-address" class="form-label">Credit Card Number </label>
        <input type="text" class="form-control" id="wallet-address" placeholder="Card Number" size="35"
          maxlength="35" required>
          </div>
`);
    }
}


$(document).ready(function () {
    //  window.alert('Welcome to  website')
});