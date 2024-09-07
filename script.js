// Getting form elements
var form = document.getElementById('resumeForm');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var aboutInput = document.getElementById('about');
var educationInput = document.getElementById('education');
var experienceInput = document.getElementById('experience');
var skillsInput = document.getElementById('skills');

// Getting resume display elements
var resumeName = document.getElementById('resumeName');
var resumeEmail = document.getElementById('resumeEmail');
var resumePhone = document.getElementById('resumePhone');
var resumeAbout = document.getElementById('resumeAbout').getElementsByTagName('p')[0];
var resumeEducation = document.getElementById('resumeEducation').getElementsByTagName('p')[0];
var resumeExperience = document.getElementById('resumeExperience').getElementsByTagName('p')[0];
var skillsList = document.getElementById('skillsList');

// Add event listener to form submission
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    // Update resume content with user input
    resumeName.innerText = nameInput.value;
    resumeEmail.innerText = "Email: " + emailInput.value;
    resumePhone.innerText = "Phone: " + phoneInput.value;
    resumeAbout.innerText = aboutInput.value;
    resumeEducation.innerText = educationInput.value;
    resumeExperience.innerText = experienceInput.value;

    // Clear skills list and add new skills
    skillsList.innerHTML = '';
    var skills = skillsInput.value.split(','); // Split comma-separated values
    skills.forEach(function (skill) {
        var li = document.createElement('li');
        li.innerText = skill.trim();
        skillsList.appendChild(li);
    });
});

// Inline editing functionality

// Getting reference to the edit button
var editButton = document.getElementById('edit-btn');
var editableSections = ['resumeName', 'resumeEmail', 'resumePhone', 'resumeAbout', 'resumeEducation', 'resumeExperience', 'skillsList'];

// Function to enable content editing
function enableEditing() {
    editableSections.forEach(function (id) {
        var section = document.getElementById(id);
        if (section) {
            section.contentEditable = 'true'; // Make it editable
            section.style.border = '1px solid #ccc'; // Optional: Add border to indicate editing
        }
    });
    // Change the button text to indicate save action
    editButton.textContent = 'Save Changes';
    editButton.removeEventListener('click', enableEditing);
    editButton.addEventListener('click', saveChanges);
}

// Function to save the changes
function saveChanges() {
    editableSections.forEach(function (id) {
        var section = document.getElementById(id);
        if (section) {
            section.contentEditable = 'false'; // Disable editing
            section.style.border = 'none'; // Remove the border
        }
    });
    // Revert the button back to edit mode
    editButton.textContent = 'Enable Editing';
    editButton.removeEventListener('click', saveChanges);
    editButton.addEventListener('click', enableEditing);
}

// Add event listener to the edit button
editButton.addEventListener('click', enableEditing);

// Optional: Save changes when pressing Enter inside an editable field
editableSections.forEach(function (id) {
    var section = document.getElementById(id);
    if (section) {
        section.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent creating new lines
                saveChanges();
            }
        });
    }
});
