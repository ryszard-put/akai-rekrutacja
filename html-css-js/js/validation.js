(function() {
  const form = document.querySelector('#akai-form');
  const [nameInput, lastNameInput, emailInput] = document.querySelectorAll(
    '.input'
  );
  const sectionCheckboxes = document.querySelectorAll('.section-input');
  const errorContainer = document.querySelector('.error-container');

  function validateText(text) {
    return text.trim() === '' ? false : true;
  }

  function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(re);
  }

  function validateSections(sections) {
    let sectionsList = [...sections];
    let checkedSections = sectionsList.filter(section => section.checked);
    if (checkedSections.length > 0) return true;
    else return false;
  }

  window.addEventListener('click', e => {
    errorContainer.classList.remove('active');
    errorContainer.innerHTML = '<h3>Czegoś brakuje :(</h3>';
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const errorMessages = [];
    if (!validateText(nameInput.value) || !validateText(lastNameInput.value)) {
      errorMessages.push('- Wszystkie pola muszą być wypełnione');
    }
    if (!validateEmail(emailInput.value)) {
      errorMessages.push('- Niepoprawny email');
    }
    if (!validateSections(sectionCheckboxes)) {
      errorMessages.push('- Zaznacz przynajmniej jedną opcję');
    }

    if (errorMessages.length === 0) e.target.submit();
    else {
      errorContainer.innerHTML += errorMessages.join('<br>');
      errorContainer.classList.add('active');
    }
  });
})();
