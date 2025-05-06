//const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZs7Xr2OxZdwMg-iZFJYaBDrj3ik5H-mkXKncQrMPyvPXvnfDmkWGP9O0eFpVxe_U1Xw/exec';
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbykzRl69oHA-B739cT78n8cnH_F2Se8TfUPmWJ9Xmx786fCJxFHbAxjtIR1OTr60ow5cw/exec';

window.onload = function () {
  // Show loading screen
  document.getElementById('loadingScreen')?.classList.remove('hidden');

  // Check if session exists
  const email = localStorage.getItem('sessionEmail');
  const token = localStorage.getItem('token');
  if (email && token) {
    fetch(`${SCRIPT_URL}?action=isLoggedIn&email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(response => {
                document.getElementById('loadingScreen')?.classList.add('hidden');
        if (response.loggedIn) {
          showDashboard(response.email);
        } else {
          localStorage.removeItem('sessionEmail'); // Clear stale session
          localStorage.removeItem('token');
          showLogin();
        }
      })
      .catch(() => {
                document.getElementById('loadingScreen')?.classList.add('hidden');
        document.getElementById('error').innerText = "Couldn't verify session.";
        showLogin();
      });
  } else {
        document.getElementById('loadingScreen')?.classList.add('hidden');
    showLogin();
  }

  // Set up login form handler
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
         localStorage.setItem('sessionEmail', response.email);
        localStorage.setItem('token', 'valid'); // or response.token if available
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
  const email = localStorage.getItem('sessionEmail');
  if (!email) {
    showLogin();
    return;
  }

  fetch(`${SCRIPT_URL}?action=logout&email=${encodeURIComponent(email)}`)
    .then(() => {
      localStorage.removeItem('sessionEmail');
      showLogin();
    })
    .catch(() => {
      localStorage.removeItem('sessionEmail');
      showLogin();
    });
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
  switch(pageName) {
    case 'partyInfo':
      window.location.href = 'party-info.html';
      break;
    case 'purchase':
      window.location.href = 'purchase.html';
      break;
    case 'sales':
      window.location.href = 'sales.html';
      break;
    case 'return':
      window.location.href = 'return.html';
      break;
    case 'report':
      window.location.href = 'report.html';
      break;
  }
}


function backToDashboard() {
  document.getElementById('pageContentSection').classList.add('hidden');
  document.getElementById('dashboardSection').classList.remove('hidden');
}
