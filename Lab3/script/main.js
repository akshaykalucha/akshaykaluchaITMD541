const bill = document.getElementById('bill-charge');
const customInput = document.getElementById('custom-tip');
const tip = document.querySelector('#tipInput');
const tipOutput = document.querySelector('#tipOutput');
const billError = document.querySelector('.error-message');
const customError = document.querySelector('.custom-error-message');
const form = document.getElementById("tip-form");
const tipSection = document.querySelector(".select-tip-section");
const tipDisplayed = document.getElementById("total-tip-amount");
const totalAmountDisplayed = document.getElementById("total-amount");


let tipValue = 0; 
let customValue = 0;

// Preventing form submission
var preventFunc = function(event) {
    event.preventDefault();
    parseInt(bill.value) > 0 && parseInt(tip.value) > 0 >= 100 ? calcTipAmount() : null;
};

// Calculate final tip amount
function calcTipAmount() {
    const tipAmount = parseInt(bill.value) // bill amount
    const tipPercent = parseInt(tip.value) // tip percent
    let totalTip = tipAmount * (tipPercent / 100); // get tip from tip amount and tip percent
    let totalAmount = tipAmount + totalTip; // total amount with tip
    parseInt(bill.value) > 0 && parseInt(tip.value) >= 0 ? tipDisplayed.innerHTML = `$${totalTip.toFixed(2)}` : null; // display tip amount
    parseInt(bill.value) > 0 && parseInt(tip.value) >= 0 ? totalAmountDisplayed.innerHTML = `$${totalAmount.toFixed(2)}` : null; // display total amount
}

// Setting custom tip value
document.querySelector('#custom-tip').onchange = function () { 
    const customValue = customInput.value; // Getting the custom value
    // setting the tip range value to custom value
    customValue !== ""  && parseInt(customValue) > 0 && parseInt(customValue) <=100 ? tip.value = customValue : null;
    // showing custom value in span
    customValue !== ""  && parseInt(customValue) > 0 && parseInt(customValue) <=100 ? tipOutput.innerHTML = `${customValue}%` : null;
}


// Setting tip value acc to range
document.querySelector('#tipInput').onchange = function () { 
    // Getting the bill value
    const tipRange = tip.value;
    // Showing bill value in span
    tipOutput.innerHTML = `${tipRange}%`;
}


// Reset button
const resetButton = function() {
    bill.value = "0";
    tip.value = 0;
    customInput.value = "";
    tipOutput.innerHTML = "0%";
    tipDisplayed.innerHTML = "$0.00";
    totalAmountDisplayed.innerHTML = "$0.00";
}


// Error messages
const errorFunc = function() {
    bill.value !== "" && parseInt(bill.value) > 0 ? billError.style.visibility = "hidden" : billError.style.visibility = "visible";
}
const checkCustomError = function() {
    customInput.value == "" || parseInt(customInput.value) >= 0 && parseInt(customInput.value) <=100 ? customError.style.visibility = "hidden" : customError.style.visibility = "visible";
}


// Event listeners
bill.addEventListener("keyup", errorFunc);
customInput.addEventListener("keyup", checkCustomError);
form.addEventListener("submit", preventFunc, true);
tipSection.addEventListener("change", calcTipAmount);