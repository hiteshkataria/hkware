const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_029PFILK1ogaEUJtQ_SF5TjIh0idUweeohWPtKRm0yKCtsVdseyibirYt9SxQut7gQ/exec';

// === SESSION HELPERS ===
function getSessionEmail() {
  return localStorage.getItem('sessionEmail');
}

function isLoggedIn(callback) {
  const email = getSessionEmail();
  if (!email) return callback(false, null);

  fetch(`${SCRIPT_URL}?action=isLoggedIn&email=${encodeURIComponent(email)}`)
    .then(res => res.json())
    .then(response => callback(response.loggedIn, email))
    .catch(() => callback(false, null));
}

function logoutAndRedirect() {
  const email = getSessionEmail();
  if (email) {
    fetch(`${SCRIPT_URL}?action=logout&email=${encodeURIComponent(email)}`)
      .finally(() => {
        localStorage.removeItem('sessionEmail');
        window.location.href = 'index.html';
      });
  } else {
    window.location.href = 'index.html';
  }
}

// === LOGIN PAGE INIT ===
function initializeLoginPage() {
  const loginSpinner = document.getElementById('loginSpinner');
  if (loginSpinner) loginSpinner.classList.add('hidden');

  const email = localStorage.getItem('sessionEmail');
  if (email) {
    fetch(`${SCRIPT_URL}?action=isLoggedIn&email=${encodeURIComponent(email)}`)
      .then(response => response.json())
      .then(response => {
        if (response.loggedIn) {
          showDashboard(response.email);
        } else {
          localStorage.removeItem('sessionEmail');
          showLogin();
        }
      })
      .catch(() => {
        const error = document.getElementById('error');
        if (error) error.innerText = "Couldn't verify session.";
        showLogin();
      });
  } else {
    showLogin();
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      login();
    });
  }
}


// === LOGIN FUNCTION ===
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
        showDashboard(response.email);
        document.getElementById('error').innerText = "";
      } else {
        document.getElementById('error').innerText = response.message;
      }
    })
    .catch(() => {
      loginButton.disabled = false;
      loginButtonText.classList.remove('hidden');
      loginSpinner.classList.add('hidden');
      document.getElementById('error').innerText = 'Network error. Please try again.';
    });
}

// === DASHBOARD / PAGE UI ===
function showLogin() {
  document.getElementById('loginSection')?.classList.remove('hidden');
  document.getElementById('dashboardSection')?.classList.add('hidden');
  document.getElementById('pageContentSection')?.classList.add('hidden');
}

function showDashboard(email) {
  document.getElementById('loginSection')?.classList.add('hidden');
  document.getElementById('dashboardSection')?.classList.remove('hidden');
  document.getElementById('userEmail')?.innerText = email;
}

function openPage(pageName) {
  document.getElementById('dashboardSection')?.classList.add('hidden');
  document.getElementById('pageContentSection')?.classList.remove('hidden');

  let title = '';
  let content = '';

  switch (pageName) {
    case 'partyInfo':
      title = 'Party Info';
      content = 'Here you can manage Party.';
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
  document.getElementById('pageContentSection')?.classList.add('hidden');
  document.getElementById('dashboardSection')?.classList.remove('hidden');
}

// === PROTECTED PAGE INIT ===
function initializeProtectedPage() {
  isLoggedIn((loggedIn, email) => {
    if (loggedIn) {
      document.getElementById('userEmail').innerText = email;
      document.getElementById('pageContent').classList.remove('hidden');
    } else {
      localStorage.removeItem('sessionEmail');
      window.location.href = 'index.html';
    }
  });
}
