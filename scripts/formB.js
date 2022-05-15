// Java Script for formB page
/**
 * 
 * @param {*} dropDownList 
 */
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


