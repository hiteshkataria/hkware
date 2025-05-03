const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZs7Xr2OxZdwMg-iZFJYaBDrj3ik5H-mkXKncQrMPyvPXvnfDmkWGP9O0eFpVxe_U1Xw/exec';

window.onload = function () {
  showLogin();
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    login();
  });
};

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const loginButton = document.getElementById('loginButton');
  const loginButtonText = document.getElementById('loginButtonText');
  const loginSpinner = document.getElementById('loginSpinner');

  loginButton.disabled = true;
  loginButtonText.classList.add('hidden');
  loginSpinner.classList.remove('hidden');

  fetch(`${SCRIPT_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
    .then(res => res.json())
    .then(response => {
      loginButton.disabled = false;
      loginButtonText.classList.remove('hidden');
      loginSpinner.classList.add('hidden');

      if (response.success) {
        showDashboard(response.email);
        document.getElementById('error').innerText = "";
      } else {
        document.getElementById('error').innerText = response.message;
      }
    })
    .catch(err => {
      loginButton.disabled = false;
      loginButtonText.classList.remove('hidden');
      loginSpinner.classList.add('hidden');
      document.getElementById('error').innerText = 'Network error. Please try again.';
    });
}

function logout() {
  const email = document.getElementById('userEmail').innerText;
  fetch(`${SCRIPT_URL}?action=logout&email=${encodeURIComponent(email)}`)
    .then(() => showLogin())
    .catch(() => showLogin());
}

function showLogin() {
  document.getElementById('loginSection').classList.remove('hidden');
  document.getElementById('dashboardSection').classList.add('hidden');
  document.getElementById('pageContentSection').classList.add('hidden');
}

function showDashboard(email) {
  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('dashboardSection').classList.remove('hidden');
  document.getElementById('userEmail').innerText = email;
}

function openPage(pageName) {
  document.getElementById('dashboardSection').classList.add('hidden');
  document.getElementById('pageContentSection').classList.remove('hidden');

  let title = '';
  let content = '';

  switch(pageName) {
    case 'partyInfo':
      title = 'Party Information';
      content = 'Here you can manage Party Information.';
      break;
    case 'purchase':
      title = 'Purchase';
      content = 'Here you can manage Purchases.';
      break;
    case 'sales':
      title = 'Sales';
      content = 'Here you can manage Sales.';
      break;
    case 'return':
      title = 'Returns';
      content = 'Here you can manage Returns.';
      break;
    case 'report':
      title = 'Reports';
      content = 'Here you can view Reports.';
      break;
  }

  document.getElementById('pageTitle').innerText = title;
  document.getElementById('pageContent').innerText = content;
}

function backToDashboard() {
  document.getElementById('pageContentSection').classList.add('hidden');
  document.getElementById('dashboardSection').classList.remove('hidden');
}
