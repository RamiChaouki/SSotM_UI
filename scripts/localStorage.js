
        // AUTHOR: Dmitry
        // LAST UPDATED: MAY 17

// Reads form into local storage
const submitForm = (event) => {
    event.preventDefault();  // to stop the form submitting

    //variables for grabbing the selection values
    var province = document.getElementById('province');
    var provinceValue = province.options[province.selectedIndex].value;
    var adultNum = document.getElementById('number-of-adults');
    var adultNumValue = adultNum.options[adultNum.selectedIndex].value;
    var childNum = document.getElementById('number-of-children');
    var childNumValue = childNum.options[childNum.selectedIndex].value;
    var lenOfStay = document.getElementById('length-of-stay');
    var lenOfStayValue = lenOfStay.options[lenOfStay.selectedIndex].value;

    // create an array of selected dietary restrictions    
    const dietary_restrictions = [];
    let index = 0;
    for (let i of document.querySelectorAll("input[type='checkbox'][role='switch']:checked")) {
        dietary_restrictions[index] = i.id;
        index++;
    };

    // reads the fields of form for Adults and Children into an array of objects called additionalPassengers
    function readAdditionalPassengers(adultNumValue, childNumValue) {
        var additionalPassengers = [];
        let aNumber = parseInt(adultNumValue);
        let cNumber = parseInt(childNumValue);
        // loop to add adults objects into additionalPassengers array of objects
        for (let i = 1; i <= aNumber; i++) {
            var adult = {
                "adult_num": i.toString(),
                "adult_fn": document.getElementById("Adult" + i + "_fname").value,
                "adult_ln": document.getElementById("Adult" + i + "_lname").value,
                "adult_age": document.getElementById("Adult" + i + "_age").value,
                "adult_allergen": document.getElementById("Adult" + i + "_allergen").value,
            }
            additionalPassengers.push(adult);
        }
        // loop to add children objects into additionalPassengers array of objects
        for (let j = 1; j <= cNumber; j++) {
            var child = {
                "child_num": j.toString(),
                "child_fn": document.getElementById("Child" + j + "_fname").value,
                "child_ln": document.getElementById("Child" + j + "_lname").value,
                "child_age": document.getElementById("Child" + j + "_age").value,
                "child_allergen": document.getElementById("Child" + j + "_allergen").value,
            }
            additionalPassengers.push(child);
        }
        // return the array   
        return (additionalPassengers);
    }

    function getPayDetails() {
        let pay_id = document.querySelector("input[name='payment-method']:checked").id;
        let cards = ["visa", "mastercard", "americanexpress"];
        var payDetails = {};
        if (cards.includes(pay_id)) {
            payDetails = {
                "cardNumber": document.getElementById("card-number").value,
                "cardHolder": document.getElementById("card-holder").value,
                "CVS": document.getElementById("cvs").value,
                "expiryDate": document.getElementById("expiry-date").value,
            }
        } else {
            payDetails = {
                "cryptoWallet": document.getElementById("wallet-address").value
            }
        }
        return payDetails;
    }
    // new form submission object - takes all non-changing text, radio and selection fields
    const newSubmission = {
        "fname": document.getElementById("fname").value,
        "lname": document.getElementById("lname").value,
        "address": document.getElementById("address").value,
        "city": document.getElementById("city").value,
        "province": provinceValue,
        "postal_code": document.getElementById("postal_code").value,
        "email": document.getElementById("email").value,
        "phone": document.getElementById("phone").value,
        "package": document.querySelector("input[name='packages']:checked").id,
        "length_of_stay": lenOfStayValue,
        "diet_restrictions": dietary_restrictions,
        "allergen": document.getElementById("allergiestxt").value,
        "other": document.getElementById("othertxt").value,
        "number_of_adults": adultNumValue,
        "number_of_children": childNumValue,
        "additional_passengers": readAdditionalPassengers(adultNumValue, childNumValue),
        "payment_method": document.querySelector("input[name='payment-method']:checked").id,
        "payment_details": getPayDetails(),
    }

    const myJSONSubmission = JSON.stringify(newSubmission);
    localStorage.setItem("JSONSub", myJSONSubmission);

    window.location.assign("./successful-process.html");
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit_form').addEventListener('click', submitForm);
})