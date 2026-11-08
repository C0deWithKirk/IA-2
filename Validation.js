/* =========================================================
   validation.js - used by login.html
   Checks the form, shows errors in the page, saves the data
   to localStorage, then sends the user to ticket.html.
   ========================================================= */

// Rules
var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // user@domain.com
var GITHUB_PATTERN = /^@[A-Za-z0-9-]{1,39}$/;     // @ then the handle
var MAX_FILE_SIZE = 500 * 1024;                    // 500KB in bytes
var ALLOWED_TYPES = ["image/jpeg", "image/png"];

var form = document.getElementById("registrationForm");

/**
 * Show or clear the error text under one field.
 * @param {string} inputId - id of the input, e.g. "email"
 * @param {string} errorId - id of its error span, e.g. "emailError"
 * @param {string} message - error text, or "" to clear it
 */
function setError(inputId, errorId, message) {
  document.getElementById(errorId).textContent = message;
  var input = document.getElementById(inputId);
  if (message) {
    input.setAttribute("aria-invalid", "true");
  } else {
    input.removeAttribute("aria-invalid");
  }
}

/**
 * Check every field. Returns true only if all pass.
 * @returns {boolean}
 */
function validateForm() {
  var valid = true;
  var name = document.getElementById("fullName").value.trim();
  var email = document.getElementById("email").value.trim();
  var github = document.getElementById("github").value.trim();
  var file = document.getElementById("avatar").files[0];

  // Full name: required, cannot be only spaces
  if (name === "") {
    setError("fullName", "nameError", "Enter your full name.");
    valid = false;
  } else {
    setError("fullName", "nameError", "");
  }

  // Email: must look like user@domain.com
  if (!EMAIL_PATTERN.test(email)) {
    setError("email", "emailError", "Enter a valid email like user@domain.com.");
    valid = false;
  } else {
    setError("email", "emailError", "");
  }

  // GitHub: must start with @
  if (!GITHUB_PATTERN.test(github)) {
    setError("github", "githubError", "Enter a username that starts with @, like @octocat.");
    valid = false;
  } else {
    setError("github", "githubError", "");
  }

  // Avatar: must exist, be JPEG/PNG and be under 500KB
  if (!file) {
    setError("avatar", "avatarError", "Choose an avatar image.");
    valid = false;
  } else if (ALLOWED_TYPES.indexOf(file.type) === -1) {
    setError("avatar", "avatarError", "Use a JPEG or PNG image.");
    valid = false;
  } else if (file.size > MAX_FILE_SIZE) {
    setError("avatar", "avatarError", "Image is too large. Choose one under 500KB.");
    valid = false;
  } else {
    setError("avatar", "avatarError", "");
  }

  return valid;
}

// Take over the submit event
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateForm()) {
    // Send keyboard focus to the first field with a problem
    var firstInvalid = form.querySelector("[aria-invalid='true']");
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  // Read the image, save everything, then open the ticket page
  var reader = new FileReader();
  reader.onload = function () {
    var serial = "#" + String(Math.floor(Math.random() * 100000)).padStart(5, "0");
    var ticketData = {
      name: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      github: document.getElementById("github").value.trim(),
      avatar: reader.result, // image stored as a data URL
      serial: serial
    };
    localStorage.setItem("codingConfTicket", JSON.stringify(ticketData));
    window.location.href = "ticket.html";
  };
  reader.readAsDataURL(document.getElementById("avatar").files[0]);
});