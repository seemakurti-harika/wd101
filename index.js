function getEntries() {
  let entries = localStorage.getItem("userEntries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
}

function displayEntries() {
  const entries = getEntries();
  const tableBody = document.querySelector("#entriesTable tbody");
  tableBody.innerHTML = "";

  entries.forEach(entry => {
    const row = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = entry.name;

    const td2 = document.createElement("td");
    td2.textContent = entry.email;

    const td3 = document.createElement("td");
    td3.textContent = entry.password;

    const td4 = document.createElement("td");
    td4.textContent = entry.dob;

    const td5 = document.createElement("td");
    td5.textContent = entry.acceptTerms ? "true" : "false";

    row.append(td1, td2, td3, td4, td5);
    tableBody.appendChild(row);
  });
}

function isValidAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18 && age <= 55;
}

document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  if (!isValidAge(dob)) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  if (!acceptTerms) {
    alert("You must accept the terms and conditions.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptTerms
  };

  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem("userEntries", JSON.stringify(entries));

  displayEntries();
  this.reset(); // clear form
});

window.addEventListener("load", displayEntries);
