// AUTHOR: Ali, Rami, Dmitry
// LAST UPDATED: MAY 18, 2022

// Java Script for formB page

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
                // boxInput.setAttribute('required', 'required');
                boxInput.setAttribute('class', 'form-control');

                (boxType == 'age') ? boxInput.setAttribute('type', 'number') : boxInput.setAttribute('type', 'text');
                // boxInput.setAttribute('size', '20');
                if (boxType == 'age') {
                    console.log($(boxInput))
                    if (target == 'Adult') {
                        $(boxInput).addClass('adult_age');
                    } else {
                        $(boxInput).addClass('child_age');
                    }
                }

                if (boxType == 'allergen') {
                    $(boxInput).addClass('allergen-text');
                }

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
 * A function that adds payment info based on checked radio box (french and english)
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
    const startDate = currentDate.toISOString().slice(0,7);
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
        <label for="cvs" class="form-label">CVS <sup class="bi bi-info-lg" title= ${stringList.CVS}>i</sup></label>
        <input type="text" class="form-control" id="cvs" size="4" maxlength="4">
          <br>
          <label for="expiry-date">${stringList.expiryDate}</label>
          <input type="month" id="expiry-date" name="expiry-date" min=${startDate} value=${startDate}>

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
 * A function that validates that all elements in the form are filled
 * @param {event} ev 
 */
function formFillValidator(ev) {
    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    warningString = (lang == 'English') ? 'is a required field' : 'est un champ obligatoire';

    let inputs = $('#booking_form input, #booking_form select, #booking_form fieldset');
    // console.log(inputs);
    let emptyFields = [];

    let excludeIDs = ['allergies-text', 'other-diets', 'submit_form'];

    for (let index = 0; index < inputs.length; index++) {
        if (inputs[index].getAttribute("role") == 'switch') {
            continue;
        }
        if (excludeIDs.includes(inputs[index].getAttribute("id"))) {
            continue;
        }
        if(inputs[index].classList.contains('allergen-text')) {
            continue;
        }
        // console.log(!inputs[index].value);
        if ((inputs[index].type == 'text') && !inputs[index].value) {
            emptyFields.push(inputs[index]);
        }
        if ((inputs[index].type == 'select-one') && !inputs[index].value) {
            emptyFields.push(inputs[index]);
        }
        // if ((inputs[index].id == 'payment-method') && !inputs[index].value) {
        //     emptyFields.push(inputs[index]);
        // }
        if ((inputs[index].type == 'checkbox') && !inputs[index].checked) {
            emptyFields.push(inputs[index]);
        }
    }


    // console.log(emptyFields);
    if (emptyFields.length > 0) {
        ev.preventDefault();
        // $('#warnings').addClass("text-center");
        for (let emptyElement of emptyFields) {

            // // console.log(emptyElement.id);
            // if (excludeIDs.includes(emptyElement.id)) {
            //     continue;
            // }

            // $('#warnings').append(`<p>${isEmpty} is a required field</p>`);
            if (emptyElement.name) {
                $('#warnings').append(`<p class = 'text-warning'>${emptyElement.name} ${warningString}</p>`);
            } else if (emptyElement.labels[0]) {
                $('#warnings').append(`<p class = 'text-warning'>${emptyElement.labels[0].innerHTML} ${warningString}</p>`);
            } else {
                $('#warnings').append(`<p class = 'text-warning'>${emptyElement.id} ${warningString}</p>`);
            }

        }
        
        document.querySelector('#warnings').scrollIntoView(true);
    }

    return emptyFields.length;
}

/**
 * A function that validate that the inputs in different fields are filled properly (regex-based)
 * It calls other functions that validate different types of fields  (name, address, numerical...)
 */
function FieldsValidator(ev) {
    // validate name fileds
    let applicantName = [$('#fname'), $('#lname')];
    let adultNames = getFNLN("#targetDiv_adult div");
    let childNames = getFNLN("#targetDiv_children div");
    namesInputList = applicantName.concat(adultNames, childNames);
    // console.log(namesInputList);
    alphaTextValidator(namesInputList);


    let addressInputList = [$('#address')];
    // console.log(addressInputList);
    addressValidator(addressInputList);

    let emailInputList = [$('#email')];
    // console.log(emailInputList);
    emailValidator(emailInputList);

    let postalCodeInputList = [$('#postal_code')];
    // console.log(postalCodeInputList);
    postalCodeValidator(postalCodeInputList);

    let phoneInputList = [$('#phone')];
    // console.log(phoneInputList);
    phoneValidator(phoneInputList);

    let cardInputList = [$('#card-number')];
    // console.log(cardInputList);
    cardNumberValidator(cardInputList);

    let cvsInputList = [$('#cvs')];
    // console.log(cvsInputList);
    cvsValidator(cvsInputList);

    let adultsAgeInputList = [$('.adult_age')];
    // console.log(cvsInputList);
    adultAgeValidator(adultsAgeInputList);

    let childrenAgeInputList = [$('.child_age')];
    // console.log(cvsInputList);
    childAgeValidator(childrenAgeInputList);

    invalidFields = document.getElementsByClassName('text-warning');
    console.log(invalidFields);
    if(invalidFields.length > 0) {
        ev.preventDefault();
        document.querySelector('#warnings').scrollIntoView(true);
    }

    return invalidFields.length;

}

function getFNLN(targetDiv) {
    let divs = $(targetDiv);
    let namesInput = [];
    for (let div of divs) {
        let elements = $(div).children('input');
        for (let e = 0; e < 2; e++) {
            namesInput.push($(elements[e]));
        }
    }
    return namesInput;
}

/**
 * 
 * @param {Array} inputList 
 */
function alphaTextValidator(inputList) {

    const regex = new RegExp('^[A-zÀ-ú]+$', 'i');

    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    warningString = (lang == 'English') ? 'This field should include letters only (accents accepted)' : 'Ce champ ne doit contenir que des lettres (accents acceptés)';

    for (let element of $(inputList)) {
        // console.log(element);
        let element_value = $(element).val();
        // console.log('element_value = ' + element_value);
        if (element_value) {
            let test = regex.test(element_value);
            // console.log('test = ' + test);
            let pre_element = $(element).prev();
            // console.log('pre_element = ' + pre_element)
            // console.log('pre_element_tagName = ' + pre_element.prop('tagName').toLowerCase())
            // console.log('test2 = ' + pre_element.prop('tagName').toLowerCase() == 'p');
            if (!test) {
                if (pre_element.prop('tagName').toLowerCase() != 'p') {
                    $(`<p class = 'text-warning'>${warningString}</p>`).insertBefore(element);
                }
            } else if (pre_element.prop('tagName').toLowerCase() == 'p') {
                $(element).prev().detach();
            }
        }
    }
}

function addressValidator(inputList) {
    // let regex = new RegExp('^[0-9]+\s?[A-zÀ-ú\-\s\d]+$', 'i')
    const regex = new RegExp('^[0-9]+[\w\.\s\-\d].*$', 'i');

    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    warningString = (lang == 'English') ? "The address format you entered is invalid" : "Le format d/'adresse que vous avez saisi n/'est pas valide";

    for (let element of $(inputList)) {
        // console.log(element);
        let element_value = $(element).val();
        // console.log('element_value = ' + element_value);
        if (element_value) {
            // console.log('regex = ' + regex)
            let test = regex.test(element_value);
            // console.log('test = ' + test);
            // console.log('match = ' + element_value.match(regex));
            let pre_element = $(element).prev();
            // console.log('pre_element = ' + pre_element)
            // console.log('pre_element_tagName = ' + pre_element.prop('tagName').toLowerCase())
            // console.log('test2 = ' + pre_element.prop('tagName').toLowerCase() == 'p');
            if (!test) {
                if (pre_element.prop('tagName').toLowerCase() != 'p') {
                    $(`<p class = 'text-warning'>${warningString}</p>`).insertBefore(element);
                }
            } else if (pre_element.prop('tagName').toLowerCase() == 'p') {
                $(element).prev().detach();
            }
        }
    }
}


function postalCodeValidator(inputList) {
    let regex = new RegExp('^[A-z][0-9][A-z]\u0020?[0-9][A-z][0-9]$', 'i')

    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    warningString = (lang == 'English') ? "The postal code you entered is invalid" : "Le code postale que vous avez saisi n/'est pas valide";

    for (let element of $(inputList)) {
        // console.log(element);
        let element_value = $(element).val();
        // console.log('element_value = ' + element_value);
        if (element_value) {
            // console.log('regex = ' + regex)
            let test = regex.test(element_value);
            // console.log('test = ' + test);
            // console.log('match = ' + element_value.match(regex));
            let pre_element = $(element).prev();
            // console.log('pre_element = ' + pre_element)
            // console.log('pre_element_tagName = ' + pre_element.prop('tagName').toLowerCase())
            // console.log('test2 = ' + pre_element.prop('tagName').toLowerCase() == 'p');
            if (!test) {
                if (pre_element.prop('tagName').toLowerCase() != 'p') {
                    $(`<p class = 'text-warning'>${warningString}</p>`).insertBefore(element);
                }
            } else if (pre_element.prop('tagName').toLowerCase() == 'p') {
                $(element).prev().detach();
            }
        }
    }
}


function emailValidator(inputList) {
    let regex = new RegExp('^[A-z_0-9\.\-]+@[a-zA-Z_].+?\.[a-zA-Z]{2,3}$', 'i')

    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    warningString = (lang == 'English') ? "The email address you entered is invalid" : "Le format de courriel que vous avez saisi n/'est pas valide";

    for (let element of $(inputList)) {
        // console.log(element);
        let element_value = $(element).val();
        // console.log('element_value = ' + element_value);
        if (element_value) {
            // console.log('regex = ' + regex)
            let test = regex.test(element_value);
            // console.log('test = ' + test);
            // console.log('match = ' + element_value.match(regex));
            let pre_element = $(element).prev();
            // console.log('pre_element = ' + pre_element)
            // console.log('pre_element_tagName = ' + pre_element.prop('tagName').toLowerCase())
            // console.log('test2 = ' + pre_element.prop('tagName').toLowerCase() == 'p');
            if (!test) {
                if (pre_element.prop('tagName').toLowerCase() != 'p') {
                    $(`<p class = 'text-warning'>${warningString}</p>`).insertBefore(element);
                }
            } else if (pre_element.prop('tagName').toLowerCase() == 'p') {
                $(element).prev().detach();
            }
        }
    }
}


function phoneValidator(inputList) {
    // let regex = new RegExp('^\u002B?\u0028?[0-9]+\u0029?\u002D?\u0020?[0-9]+\u002D?\u0020?[0-9]+', 'i')
    let regex = new RegExp('^[0-9\+]+$', 'i')

    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    warningString = (lang == 'English') ? "This field only accept numbers (optional [+] sign at the beginning)" : "Ce champ n'accepte que des chiffres (signe [+] facultatif au début)";

    for (let element of $(inputList)) {
        // console.log(element);
        let element_value = $(element).val();
        // console.log('element_value = ' + element_value);
        if (element_value) {
            // console.log('regex = ' + regex)
            let test = regex.test(element_value);
            // console.log('test = ' + test);
            // console.log('match = ' + element_value.match(regex));
            let pre_element = $(element).prev();
            // console.log('pre_element = ' + pre_element)
            // console.log('pre_element_tagName = ' + pre_element.prop('tagName').toLowerCase())
            // console.log('test2 = ' + pre_element.prop('tagName').toLowerCase() == 'p');
            if (!test) {
                if (pre_element.prop('tagName').toLowerCase() != 'p') {
                    $(`<p class = 'text-warning'>${warningString}</p>`).insertBefore(element);
                }
            } else if (pre_element.prop('tagName').toLowerCase() == 'p') {
                $(element).prev().detach();
            }
        }
    }
}

function cardNumberValidator(inputList) {
    let regex = new RegExp('^[0-9]{16}$', 'i')

    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    warningString = (lang == 'English') ? 'This field should include the 16 numbers on your card' : 'Ce champ doit inclure les 16 chiffres de votre carte';

    for (let element of $(inputList)) {
        // console.log(element);
        let element_value = $(element).val();
        // console.log('element_value = ' + element_value);
        // console.log('element_value_length = ' + element_value.length);
        if (element_value) {
            // console.log('regex = ' + regex)
            let test = regex.test(element_value);
            // console.log('test = ' + test);
            // console.log('match = ' + element_value.match(regex));
            let pre_element = $(element).prev();
            // console.log('pre_element = ' + pre_element)
            // console.log('pre_element_tagName = ' + pre_element.prop('tagName').toLowerCase())
            // console.log('test2 = ' + pre_element.prop('tagName').toLowerCase() == 'p');
            if (!test) {
                if (pre_element.prop('tagName').toLowerCase() != 'p') {
                    $(`<p class = 'text-warning'>${warningString}</p>`).insertBefore(element);
                }
            } else if (pre_element.prop('tagName').toLowerCase() == 'p') {
                $(element).prev().detach();
            }
        }
    }
}

function cvsValidator(inputList) {
    let regex = new RegExp('^[0-9]{3,4}$', 'i')

    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    warningString = (lang == 'English') ? 'This field should include the 3-4 numbers on the back of your card' : 'Ce champ doit inclure les 3-4 chiffres au dos de votre carte';

    for (let element of $(inputList)) {
        // console.log(element);
        let element_value = $(element).val();
        // console.log('element_value = ' + element_value);
        // console.log('element_value_length = ' + element_value.length);
        if (element_value) {
            // console.log('regex = ' + regex)
            let test = regex.test(element_value);
            // console.log('test = ' + test);
            // console.log('match = ' + element_value.match(regex));
            let pre_element = $(element).prev();
            // console.log('pre_element = ' + pre_element)
            // console.log('pre_element_tagName = ' + pre_element.prop('tagName').toLowerCase())
            // console.log('test2 = ' + pre_element.prop('tagName').toLowerCase() == 'p');
            if (!test) {
                if (pre_element.prop('tagName').toLowerCase() != 'p') {
                    $(`<p class = 'text-warning'>${warningString}</p>`).insertBefore(element);
                }
            } else if (pre_element.prop('tagName').toLowerCase() == 'p') {
                $(element).prev().detach();
            }
        }
    }
}


function adultAgeValidator(inputList) {

    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    warningString = (lang == 'English') ? 'Adult age should be between 18 and 65 years' : 'Ce domaine doit avoir entre 18 et 60 ans';

    for (let element of $(inputList)) {
        // console.log(element);
        let element_value = parseFloat($(element).val());
        // console.log('element_value = ' + element_value);
        // console.log('element_value_length = ' + element_value.length);
        if (element_value) {
            // console.log('regex = ' + regex)
            let test = (element_value >= 18 && element_value <= 65);
            // console.log('test = ' + test);
            // console.log('match = ' + element_value.match(regex));
            let pre_element = $(element).prev();
            // console.log('pre_element = ' + pre_element)
            // console.log('pre_element_tagName = ' + pre_element.prop('tagName').toLowerCase())
            // console.log('test2 = ' + pre_element.prop('tagName').toLowerCase() == 'p');
            if (!test) {
                if (pre_element.prop('tagName').toLowerCase() != 'p') {
                    $(`<p class = 'text-warning'>${warningString}</p>`).insertBefore(element);
                }
            } else if (pre_element.prop('tagName').toLowerCase() == 'p') {
                $(element).prev().detach();
            }
        }
    }
}

function childAgeValidator(inputList) {

    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    warningString = (lang == 'English') ? 'Adult age should be between 18 and 65 years' : 'Ce domaine doit avoir entre 18 et 60 ans';

    for (let element of $(inputList)) {
        // console.log(element);
        let element_value = parseFloat($(element).val());
        // console.log('element_value = ' + element_value);
        // console.log('element_value_length = ' + element_value.length);
        if (element_value) {
            // console.log('regex = ' + regex)
            let test = (element_value >= 12 && element_value < 18);
            // console.log('test = ' + test);
            // console.log('match = ' + element_value.match(regex));
            let pre_element = $(element).prev();
            // console.log('pre_element = ' + pre_element)
            // console.log('pre_element_tagName = ' + pre_element.prop('tagName').toLowerCase())
            // console.log('test2 = ' + pre_element.prop('tagName').toLowerCase() == 'p');
            if (!test) {
                if (pre_element.prop('tagName').toLowerCase() != 'p') {
                    $(`<p class = 'text-warning'>${warningString}</p>`).insertBefore(element);
                }
            } else if (pre_element.prop('tagName').toLowerCase() == 'p') {
                $(element).prev().detach();
            }
        }
    }
}