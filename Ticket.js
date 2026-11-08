/* =========================================================
   ticket.js - used by ticket.html
   Reads the saved registration and fills in the ticket.
   Sends the visitor to index.html if nothing was saved.
   ========================================================= */

var stored = localStorage.getItem("codingConfTicket");

// Route guard: no saved data means the form was skipped
if (stored === null) {
  window.location.href = "index.html";
} else {
  var data = JSON.parse(stored);

  // textContent keeps user text from being run as HTML
  document.getElementById("banner-name").textContent = data.name;
  document.getElementById("ticket-name").textContent = data.name;
  document.getElementById("ticket-email").textContent = data.email;
  document.getElementById("ticket-serial").textContent = data.serial;
  document.getElementById("ticket-avatar").src = data.avatar;
  document.getElementById("ticket-avatar").alt = "Avatar of " + data.name;

  // GitHub link: the URL has no @, the label keeps it
  var githubLink = document.getElementById("ticket-github");
  githubLink.textContent = data.github;
  githubLink.href = "https://github.com/" + data.github.slice(1);
}

// Clear the saved ticket and start a new registration
document.getElementById("new-ticket").addEventListener("click", function () {
  localStorage.removeItem("codingConfTicket");
  window.location.href = "login.html";
});