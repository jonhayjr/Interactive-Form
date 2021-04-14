const nameInput = document.getElementById('name');
//Add focus state to Name field on page load
nameInput.focus();

const otherJobInput = document.getElementById('other-job-role');
//Other Job input is hidden on page load
otherJobInput.style.display = 'none';


const titleInput = document.getElementById('title');

//This function shows or hides Other job role input field based on change event.  Field only appears if job role is other.
const showHideOtherField = (e) => {
    if (e.target.value === 'other') {
        otherJobInput.style.display = 'block';
   } else {
        otherJobInput.style.display = 'none';
   }
}

titleInput.addEventListener('change', showHideOtherField);

const colorInput = document.getElementById('color');
//Color field is disabled on initial page load
colorInput.setAttribute('disabled', 'true');

const designInput = document.getElementById('design');

//This function will show colors for related design that is selected.
const updateColorSelection = (e) => {
    const heartJS = document.querySelectorAll('option[data-theme="heart js"]');
    const jsPuns = document.querySelectorAll('option[data-theme="js puns"]')

    const inputValue = e.target.value;
    colorInput.removeAttribute('disabled', 'true');

    if (inputValue === 'js puns') {
        jsPuns.forEach(pun => {
            pun.hidden = false;
            pun.selected = true;
        });

        heartJS.forEach(heart => {
            heart.hidden = true;
            heart.selected = false;
        });
    } else if (inputValue === 'heart js') {
        heartJS.forEach(heart => {
            heart.hidden = false;
            heart.selected = true;
        });

        jsPuns.forEach(pun => {
            pun.hidden = true;
            pun.selected = false;
        })
    }
}

//When the design input is changed, only the colors for that design will display in the Color dropdown
designInput.addEventListener('change', updateColorSelection);

const registerActivitiesFieldset = document.getElementById('activities');

///This update total cost based on whether or not checkbox is selected
const getActivitiesCost = (e) => {
    const activitiesCost = document.getElementById('activities-cost');
    //Gets total value from paragraph and removes surrounding text.
    let currentTotal = parseInt(activitiesCost.innerHTML.replace('Total: $', ''));

    //If checkbox is checked, cost is added.  If checkbox is unchecked, cost is subtracted.
    if (e.target.nodeName ==='INPUT' && e.target.checked === true) {
        currentTotal += parseInt(e.target.dataset.cost);
    } else if (e.target.nodeName === 'INPUT' && e.target.checked === false) {
        currentTotal -= parseInt(e.target.dataset.cost);
    }
    //Adds new total to paragraph text
    activitiesCost.innerHTML = `Total: $${currentTotal}`;
}

//When change event occurs in Register Activities Fieldset, getActivitiesCost function is triggered.
registerActivitiesFieldset.addEventListener('change', getActivitiesCost);

//Selects CreditCard payment method by default and hides Paypal and Bitcoin sections
const creditCardPayment = document.querySelector('option[value="credit-card"]');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const creditCardDiv = document.getElementById('credit-card');

creditCardPayment.selected = true;
paypalDiv.hidden = true;
bitcoinDiv.hidden = true;


const paymentDropdown = document.getElementById('payment');

//This function shows or hides info on the payment screen based on the payment method that the user selects.  For example, if a user selects credit card, the Paypal and Bitcoin sections will be hidden
const getPaymentSection = (e) => {
    if (e.target.value === 'credit-card') {
        creditCardDiv.hidden = false;
        paypalDiv.hidden = true;
        bitcoinDiv.hidden = true;
    } else if (e.target.value === 'paypal') {
        creditCardDiv.hidden = true;
        paypalDiv.hidden = false;
        bitcoinDiv.hidden = true;
    } else if (e.target.value === 'bitcoin') {
        creditCardDiv.hidden = true;
        paypalDiv.hidden = true;
        bitcoinDiv.hidden = false;
    }
}

//Listens for user selection on payment dropdown and calls getPaymentSectionFunction
paymentDropdown.addEventListener('change', getPaymentSection);

//Validates name input.  If name input isn't blank or empty, true is returned.  
const isNameValid = () => {
    const nameInput = document.getElementById('name');
    if (nameInput.value) {
        return true;
    } else {
        return false;
    }
}

//Uses regex to check is email is in valid format
const isEmailValid = () => {
    const emailInput = document.getElementById('email');
    const regex = /^[^@.]+[@]\w+\.\w+$/;
   return regex.test(emailInput.value);
}