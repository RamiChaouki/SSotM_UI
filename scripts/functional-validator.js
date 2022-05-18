function formValidation(ev) {
    $('#warnings').empty();
    let inputs = $('#booking_form input, #booking_form select');
    // console.log(inputs);
    let emptyFields = [];

    for (let index = 0; index < inputs.length; index++) {
        // console.log(!inputs[index].value);
        if (!inputs[index].value) {
            emptyFields.push(inputs[index])
        }
    }

    // console.log(emptyFields.length);

    FieldsValidator();

    let excludeIDs = ['allergies-text', 'other-diets', 'submit_form'];
    if (emptyFields.length > 0) {
        ev.preventDefault();
        $('#warnings').addClass("text-warning text-center");
        for (let emptyElement of emptyFields) {

            // console.log(emptyElement.id);
            if (excludeIDs.includes(emptyElement.id)) {
                continue;
            }

            // $('#warnings').append(`<p>${isEmpty} is a required field</p>`);
            if (emptyElement.name) {
                $('#warnings').append(`<p>${emptyElement.name} is a required field</p>`);
            } else if (emptyElement.labels[0]) {
                $('#warnings').append(`<p>${emptyElement.labels[0].innerHTML} is a required field</p>`);
            } else {
                $('#warnings').append(`<p>${isEmpty} is a required field</p>`);
            }

        }
        document.querySelector('#warnings').scrollIntoView(true);
    }

}

function FieldsValidator() {
    // validate name fileds
    let applicantName = [$('#fname'), $('#lname')];
    let adultNames = getFNLN("#targetDiv_adult div");
    let childNames = getFNLN("#targetDiv_children div");
    namesInputList = applicantName.concat(adultNames, childNames);
    console.log(namesInputList);

    let lang = document.getElementById('lang').getElementsByTagName('option')[0].innerHTML;
    warningString = (lang == 'English') ? 'This field should include letters only (accents accepted)' : 'Ce champ ne doit contenir que des lettres (accents acceptés)';

    for (element of namesInputList) {
        // console.log(element)
        // console.log(alphaTextValidator(element))
        if (element.val()) {
            if (!alphaTextValidator(element)) {
                if (element.prev().prop('tagName').toLowerCase() != 'p') {
                    $(`<p class = 'text-warning'>${warningString}</p>`).insertBefore(element);
                } 
            } else if (element.prev().prop('tagName').toLowerCase() == 'p') {
                element.prev().detach();
            }
        }
    }
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

function alphaTextValidator(input) {
    let regex = new RegExp('^[A-zÀ-ú]+$', 'g');
    return regex.test(input.val());
}