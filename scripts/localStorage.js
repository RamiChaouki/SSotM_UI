function submitForm (ev) {
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

    // new form submission object - takes all non-changing text, radio and selection fields
    const newSubmission = {
        "fname" : document.getElementById("fname").value,
        "lname" : document.getElementById("lname").value,
        "address" : document.getElementById("address").value,
        "city" : document.getElementById("city").value,
        "province" : provinceValue,
        "postal_code" : document.getElementById("postal_code").value,
        "email" : document.getElementById("email").value,
        "phone" : document.getElementById("phone").value,
        "package" : document.querySelector("input[name='packages']:checked").id,
        "length-of-stay" : lenOfStayValue,
        "number-of-adults" : adultNumValue,
        "number-of-children" : childNumValue,
        "payment-method" : document.querySelector("input[name='payment-method']:checked").id,

    }
}

    // create an array of selected dietary restrictions    
    const dietary_restrictions = document.querySelectorAll("input[type='checkbox'][role='switch']:checked");
    debugger;


    // ALI - for adults the IDs are adult1, adult1_fn, adult1_ln, adult1_age, adult1_allergen
            //for children its child1, child1_fname, child1_lname, child1_age, child1_allergen




localStorage.setItem('submittedForm', JSON.Stringify(newSubmission));

console.warn('new submission', {newSubmission});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("submit_form").addEventListener("click", submitForm);
})

