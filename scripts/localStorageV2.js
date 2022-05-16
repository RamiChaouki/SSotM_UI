
var province = document.getElementById("province");
var provinceValue = province.options[province.selectedIndex].value;
var adultNum = document.getElementById('number-of-adults');
var adultNumValue = adultNum.options[adultNum.selectedIndex].value;
var childNum = document.getElementById('number-of-children');
var adultNumValue = childNum.options[childNum.selectedIndex].value;
var lenOfStay = document.getElementById('length-of-stay');
var lenOfStayValue = lenOfStay.options[lenOfStay.selectedIndex].value;
var paymentMethod = document.querySelector("input[name='payment-method']:checked").id;


const completedForm = document.querySelectorAll("input[type='text']");
    alert(completedForm);
debugger;
    

//for (i of document.querySelector("input[name='payment-method']:checked").id;)

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