const nameInput = document.getElementById('name');
//Add focus state to Name field on page load
nameInput.focus();

const otherJobInput = document.getElementById('other-job-role');
//Other Job input is hidden on page load
otherJobInput.style.display = 'none';


const titleInput = document.getElementById('title');

//This function shows or hides Other job role input field based on change event.  Field only appears if job role is other.
const showHideOtherField = () => {
    if (titleInput.value === 'other') {
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

//When the design input is changed, only the colors for that design will display in the Color dropdown
designInput.addEventListener('change', () => {
    const heartJS = document.querySelectorAll('option[data-theme="heart js"]');
    const jsPuns = document.querySelectorAll('option[data-theme="js puns"]')
    colorInput.removeAttribute('disabled', 'true');
    if (designInput.value === 'js puns') {
        jsPuns.forEach(pun => {
            pun.style.display = '';
        });

        heartJS.forEach(heart => {
            heart.style.display = 'none';
        });
    } else if (designInput.value = 'heart js') {
        heartJS.forEach(heart => {
            heart.style.display = '';
        });

        jsPuns.forEach(pun => {
            pun.style.display = 'none';
        })
    }

})