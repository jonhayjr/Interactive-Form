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
colorInput.hidden = true;

const designInput = document.getElementById('design');

//This function will show colors for related design that is selected.
const updateColorSelection = (e) => {
    const heartJS = document.querySelectorAll('option[data-theme="heart js"]');
    const jsPuns = document.querySelectorAll('option[data-theme="js puns"]')

    const inputValue = e.target.value;
    colorInput.hidden = false;

    if (inputValue === 'js puns') {
        jsPuns.forEach(pun => {
            pun.selected = true;
        });

        heartJS.forEach(heart => {
            heart.hidden = true;
        });
    } else if (inputValue === 'heart js') {
        heartJS.forEach(heart => {
            heart.selected = true;
        });

        jsPuns.forEach(pun => {
            pun.hidden = true;
        })
    }
}

//When the design input is changed, only the colors for that design will display in the Color dropdown
designInput.addEventListener('change', updateColorSelection);
designInput.addEventListener('touch', updateColorSelection);