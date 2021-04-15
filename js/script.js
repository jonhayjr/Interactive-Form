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

//This function checks to make sure at least one activity was selected.
const isActivitySelected = () => {
    const activitiesCheckboxes = document.querySelectorAll('#activities input');

    let totalChecked = 0;

    //Loops through each checkbox field to see if it is checked.  If it's checked, 1 is added to the total.
    activitiesCheckboxes.forEach(activity => {
        if (activity.checked === true) {
            totalChecked += 1;
        }
    });
    
    //If one or more fields is checked, true is returned.  False is returned in all other scenarios.
    if (totalChecked > 0) {
        return true;
    } else {
        return false;
    }
}

//Checks to make sure that CC number is between 13 and 16 digits.
const isCCNumberValid = () => {
    const ccNumber = document.getElementById('cc-num');
    const regex = /^\d{13,16}$/;
    return regex.test(ccNumber.value);
}

//Checks to make sure that zip code is 5 digits
const isZipValid = () => {
    const ccZip = document.getElementById('zip');
    const regex = /^\d{5}$/;
    return regex.test(ccZip.value);
}

//Checks to make sure that CCV is 3 digits
const isCCVValid = () => {
    const cvv = document.getElementById('cvv');
    const regex = /^\d{3}$/;
    return regex.test(cvv.value);
}


const form = document.querySelector('form');

//This function runs various helper functions to check if form is valid.
const isFormValid = (e) => {

    //If name is invalid, prevents form from being submitted.
    if (!isNameValid()) {
        e.preventDefault();
    }  

    //If email is invalid, prevents form from being submitted.
    if (!isEmailValid()) {
        e.preventDefault();
    }

    //If no activity is selected, prevents form from being submitted
    if (!isActivitySelected()) {
        e.preventDefault();
    }

    const paymentDropdown = document.getElementById('payment');
    //If payment method of Credit Card is selected and CC Number is invalid or Zip Code is invalid or CCV invalid, prevents from being submitted.
    if (paymentDropdown.value === 'credit-card' && (!isCCNumberValid() || !isZipValid() || !isCCVValid())) {
        e.preventDefault();
    }
        
}

//Listens for submit event on form and runs isFormValid function
form.addEventListener('submit', isFormValid);