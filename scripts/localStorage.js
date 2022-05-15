function submitForm (ev) {
    ev.preventDefault();
    // form new submission

    //variables for grabbing the selection values
    var province = document.getElementById("province");
    var provinceValue = province.optioins[province.selectedIndex].value;
    var adultNum = document.getElementById('number-of-adults');
    var adultNumValue = adultNum.options[adultNum.selectedIndex].value;
    var childNum = document.getElementById('number-of-children');
    var adultNumValue = childNum.options[childNum.selectedIndex].value;
    var lenOfStay = document.getElementById('length-of-stay');
    var lenOfStayValue = lenOfStay.options[lenOfStay.selectedIndex].value;

    // new form submission object
    const newSubmission = {
        "fname" : document.getElementById("fname").value,
        "lname" : document.getElementById("lname").value,
        "address" : document.getElementById("address").value,
        "city" : document.getElementById("city").value,
        "province" : provinceValue,
        "postal_code" : document.getElementById("postal_code").value,
        "email" : document.getElementById("email").value,
        "phone" : document.getElementById("phone").value,
        "package" : document.querySelector("input[name='packages']:checked").value,
        "length-of-stay" : lenOfStayValue,
        "number-of-adults" : adultNumValue,
        "number-of-children" : childNumValue,
        "payment-method" : document.querySelector("input[name='payment-method']:checked").value,
        "card-wallet" : document.getElementById("card-wallet").value,
        "cvs" : document.getElementById("cvs").value,
        
        
    }
}

document.getElementById("submit_form").addEventListener("click", submitForm);