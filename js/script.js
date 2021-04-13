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