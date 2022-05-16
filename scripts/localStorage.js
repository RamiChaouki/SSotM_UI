function submitForm(ev) {
    ev.preventDefault();
    // form new submission

    //variables for grabbing the selection values
    var province = document.getElementById("province");
    var provinceValue = province.options[province.selectedIndex].value;
    var adultNum = document.getElementById('number-of-adults');
    var adultNumValue = adultNum.options[adultNum.selectedIndex].value;
    var childNum = document.getElementById('number-of-children');
    var adultNumValue = childNum.options[childNum.selectedIndex].value;
    var lenOfStay = document.getElementById('length-of-stay');
    var lenOfStayValue = lenOfStay.options[lenOfStay.selectedIndex].value;


    // create an array of selected dietary restrictions    
    const dietary_restrictions = [];
    let index = 0;
    for (let i of document.querySelectorAll("input[type='checkbox'][role='switch']:checked")) {
        dietary_restrictions[index] = i.id;
        index++;
    };

    // new form submission object - takes all non-changing text, radio and selection fields
    const newSubmission = {
        "fname": document.getElementById("fname").value,
        "lname": document.getElementById("lname").value,
        "address": document.getElementById("address").value,
        "city": document.getElementById("city").value,
        "province": provinceValue,
        "postal-code": document.getElementById("postal_code").value,
        "email": document.getElementById("email").value,
        "phone": document.getElementById("phone").value,
        "package": document.querySelector("input[name='packages']:checked").id,
        "length-of-stay": lenOfStayValue,
        "diet-restrictions": dietary_restrictions,
        "allergen": document.getElementById("allergiestxt").value,
        "other": document.getElementById("othertxt").value,
        "number-of-adults": adultNumValue,
        "number-of-children": childNumValue,
        "additional-passengers": readAdditionalPassengers(adultNumValue, childNumValue),
        "payment-method": document.querySelector("input[name='payment-method']:checked").id,
    }


    // reads the fields of form for Adults and Children into an array of objects called additionalPassengers
    function readAdditionalPassengers(adultNumValue, childNumValue) {
        const additionalPassengers = [];
        let aNumber = parseInt(adultNumValue);
        let cNumber = parseInt(childNumValue);
        for (let i = 0; i < aNumber; i++) {
            additionalPassengers[i + 1] = {
                adult_num: toString(i + 1),
                adult_fn: document.getElementById('adult' + toString(i + 1) + '_fn').value,
                adult_ln: document.getElementById('adult' + toString(i + 1) + '_ln').value,
                adult_age: document.getElementById('adult' + toString(i + 1) + '_age').value,
                adult_allergen: document.getElementById('adult' + toString(i + 1) + '_allergen').value,
            }
        }
        for (let j = 0 + aNumber; j < cNumber + aNumber; j++) {
            additionalPassengers[j + 1] = {
                child_num: toString(j + 1 - aNumber),
                child_fn: document.getElementById('child' + toString(j + 1 - aNumber) + '_fn').value,
                child_ln: document.getElementById('child' + toString(j + 1 - aNumber) + '_ln').value,
                child_age: document.getElementById('child' + toString(j + 1 - aNumber) + '_age').value,
                child_allergen: document.getElementById('child' + toString(j + 1 - aNumber) + '_allergen').value,
            }
        }
        // return the array
        return (additionalPassengers);
    }

}




// ALI - for adults the IDs are adult1, adult1_fn, adult1_ln, adult1_age, adult1_allergen
//for children its child1, child1_fname, child1_lname, child1_age, child1_allergen




localStorage.setItem('submittedForm', JSON.Stringify(newSubmission));
//----------------------------------------------------------------------
// Storing data:
// const myObj = {name: "John", age: 31, city: "New York"};
// const myJSON = JSON.stringify(myObj);
// localStorage.setItem("testJSON", myJSON);

// // Retrieving data:
// let text = localStorage.getItem("testJSON");
// let obj = JSON.parse(text);
// document.getElementById("demo").innerHTML = obj.name;
//----------------------------------------------------------------------    

console.warn('new submission', { newSubmission });

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("submit_form").addEventListener("click", submitForm);
})

