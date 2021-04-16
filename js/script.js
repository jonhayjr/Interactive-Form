//Add focus state to Name field on page load
document.getElementById('name').focus();

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
            //Select first item in dropdown by default
            jsPuns[0].selected = true;
        });

        heartJS.forEach(heart => {
            heart.hidden = true;
            heart.selected = false;
        });
    } else if (inputValue === 'heart js') {
        heartJS.forEach(heart => {
            heart.hidden = false;
            //Select first item in dropdown by default
            heartJS[0].selected = true;
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
const getActivitiesCost = () => {
    const activitiesCost = document.getElementById('activities-cost');
    const registerCheckboxes = document.querySelectorAll('#activities input[type="checkbox"');
    //Gets total value from paragraph and removes surrounding text.
    let currentTotal = 0;

    //Loops through each checkbox and grabs total from each checked box
    registerCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            currentTotal += parseInt(checkbox.dataset.cost);
        }
    })

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

//If field is valid, this function will add valid class to parent element.  If this field is invalid, the function will add invalid class plus hint.
const displayValidOrInvalid = (parent, hint, valid) => {
    if (valid) {
        parent.classList.add('valid');
        parent.classList.remove('not-valid');
        hint.style.display = 'none';
    } else {
        parent.classList.add('not-valid');
        parent.classList.remove('valid');
        hint.style.display = 'block';
    }
}

//Validates name input.  If name input isn't blank or empty, true is returned.  
const isNameValid = () => {
    const nameInput = document.getElementById('name');
    const isValid = nameInput.value ? true : false;
    const parentElement = nameInput.parentElement;
    const hintElement = parentElement.lastElementChild;

   displayValidOrInvalid(parentElement, hintElement, isValid);

    return isValid;
}

//Uses regex to check is email is in valid format
const isEmailValid = () => {
    const emailInput = document.getElementById('email');
    const regex = /^[^@.]+[@]\w+\.com$/;
   const isValid = regex.test(emailInput.value);
   const parentElement = emailInput.parentElement;
   const hintElement = parentElement.lastElementChild;

   displayValidOrInvalid(parentElement, hintElement, isValid);

   return isValid;
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
    const isValid = totalChecked > 0 ? true : false;
    const parentElement = document.getElementById('activities');
    const hintElement = parentElement.lastElementChild;

    displayValidOrInvalid(parentElement, hintElement, isValid);

    return isValid;
}

//Checks to make sure that CC number is between 13 and 16 digits.
const isCCNumberValid = () => {
    const ccNumber = document.getElementById('cc-num');
    const regex = /^\d{13,16}$/;
    const isValid = regex.test(ccNumber.value);
    const parentElement = ccNumber.parentElement;
    const hintElement = parentElement.lastElementChild;

    displayValidOrInvalid(parentElement, hintElement, isValid);

    return isValid;
}

//Checks to make sure that zip code is 5 digits
const isZipValid = () => {
    const ccZip = document.getElementById('zip');
    const regex = /^\d{5}$/;
    const isValid = regex.test(ccZip.value);
    const parentElement = ccZip.parentElement;
    const hintElement = parentElement.lastElementChild;

    displayValidOrInvalid(parentElement, hintElement, isValid);

    return isValid;
}

//Checks to make sure that CCV is 3 digits
const isCCVValid = () => {
    const cvv = document.getElementById('cvv');
    const regex = /^\d{3}$/;
    const isValid = regex.test(cvv.value);
    const parentElement = cvv.parentElement;
    const hintElement = parentElement.lastElementChild;

   displayValidOrInvalid(parentElement, hintElement, isValid);

    return isValid;
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

    if (!isCCNumberValid() && paymentDropdown.value === 'credit-card') {
        e.preventDefault();
    }

    if(!isZipValid() && paymentDropdown.value === 'credit-card') {
        e.preventDefault();
    }

    if (!isCCVValid() && paymentDropdown.value === 'credit-card') {
        e.preventDefault();
    }
     
}

//Listens for submit event on form and runs isFormValid function
form.addEventListener('submit', isFormValid);

//Prevents multiple checkboxes with the same time from being submitted
const checkConflictingActivities = (e) => {
    const registerCheckboxes = document.querySelectorAll('#activities input[type="checkbox"');
    const selectedTime = e.target.dataset.dayAndTime;
    const selectedActivity = e.target.nextElementSibling.innerText;
    const isChecked = e.target.checked;
    const parentElement = e.target.parentElement;
    //Removes disabled class from parent of checked item
    parentElement.classList.remove('disabled'); 
    
   
    registerCheckboxes.forEach(checkbox => {
        //Checks for checkboxes with same day and time as the selected checkbox
        if (checkbox.checked && checkbox.dataset.dayAndTime === selectedTime && checkbox.nextElementSibling.innerText !==   selectedActivity) {
            //Removes checkbox, adds disabled class and recalculates the activities cost
            checkbox.checked = false;
            checkbox.parentElement.classList.add('disabled');
            getActivitiesCost();
        } else if (checkbox.checked === false && checkbox.dataset.dayAndTime === selectedTime && isChecked === false) {
            //If selected item is no longer checked and checkbox is checked, disabled class is removed
            checkbox.parentElement.classList.remove('disabled');
        }
    })
}


//Loop through each activitiesCheckboxes
const registerCheckboxes = document.querySelectorAll('#activities input[type="checkbox"');
registerCheckboxes.forEach(checkbox => {
    //Add event listener for focus event.  Adds focus class to parent label of checkbox.
    checkbox.addEventListener('focus', (e) => {
        const parentLabel = e.target.parentElement;
        parentLabel.classList.add('focus');
    });
    //Add event listener for blur event.  Removes focus class from parent labels
    checkbox.addEventListener('blur', (e) => {
        const focusLabel = document.querySelectorAll('label.focus');
        focusLabel.forEach(label => {
            label.classList.remove('focus');
        })
    });

    //Checks for conflicting events when activity checkbox is updated
    checkbox.addEventListener('change', checkConflictingActivities);
});

//Added real-time error messages on Name, Email and CC Fields.  Each input has a keyup event listener that calls the related validation helper function. 
const nameInput = document.getElementById('name');
nameInput.addEventListener('keyup', isNameValid);

const emailInput = document.getElementById('email');
emailInput.addEventListener('keyup', isEmailValid);

const ccNumber = document.getElementById('cc-num');
ccNumber.addEventListener('keyup', isCCNumberValid);

const ccZip = document.getElementById('zip');
ccZip.addEventListener('keyup', isZipValid);

const cvv = document.getElementById('cvv');
cvv.addEventListener('keyup', isCCVValid);