(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var nameInput = document.getElementById("contact-name");
  var emailInput = document.getElementById("contact-email");
  var subjectInput = document.getElementById("contact-subject");
  var messageInput = document.getElementById("contact-message");
  var errorName = document.getElementById("error-name");
  var errorEmail = document.getElementById("error-email");
  var errorSubject = document.getElementById("error-subject");
  var errorMessage = document.getElementById("error-message");
  var formSuccess = document.getElementById("form-success");

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var minMessageLength = 10;

  function clearErrors() {
    [errorName, errorEmail, errorSubject, errorMessage].forEach(function (el) {
      if (el) el.textContent = "";
    });
    [nameInput, emailInput, subjectInput, messageInput].forEach(function (el) {
      if (el) el.classList.remove("error");
    });
  }

  function showError(field, message) {
    var errEl = field === "name" ? errorName : field === "email" ? errorEmail : field === "subject" ? errorSubject : errorMessage;
    var inputEl = field === "name" ? nameInput : field === "email" ? emailInput : field === "subject" ? subjectInput : messageInput;
    if (errEl) errEl.textContent = message;
    if (inputEl) inputEl.classList.add("error");
  }

  function validate() {
    clearErrors();
    if (formSuccess) formSuccess.hidden = true;
    var valid = true;

    var name = nameInput ? nameInput.value.trim() : "";
    if (!name) {
      showError("name", "Name is required.");
      valid = false;
    }

    var email = emailInput ? emailInput.value.trim() : "";
    if (!email) {
      showError("email", "Email is required.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      showError("email", "Please enter a valid email address.");
      valid = false;
    }

    var subject = subjectInput ? subjectInput.value.trim() : "";
    if (!subject) {
      showError("subject", "Subject is required.");
      valid = false;
    }

    var message = messageInput ? messageInput.value.trim() : "";
    if (!message) {
      showError("message", "Message is required.");
      valid = false;
    } else if (message.length < minMessageLength) {
      showError("message", "Message must be at least " + minMessageLength + " characters.");
      valid = false;
    }

    return valid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    clearErrors();
    form.reset();
    if (formSuccess) formSuccess.hidden = false;
  });
})();
