
window.onload = function () {
  showLoader();

  const email = localStorage.getItem('sessionEmail');
  const token = localStorage.getItem('token');

  if (email && token) {
    fetch(`${ENV_CONFIG.SCRIPT_URL}?action=isLoggedIn&token=${encodeURIComponent(token)}`)
      .then(res => res.json())
      .then(response => {
        if (response.loggedIn) {
          showDashboard(response.email);
        } else {
          localStorage.removeItem('sessionEmail');
          localStorage.removeItem('token');
	  localStorage.removeItem('role');
          showLogin();
        }
      })
      .catch(() => {
        document.getElementById('error').innerText = "Couldn't verify session.";
        showLogin();
      })
      .finally(() => {
        hideLoader();
      });
  } else {
    showLogin();
	    hideLoader();
  }

  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    login();
  });
};


function showLoader() {
  document.getElementById('loadingScreen')?.classList.remove('hidden');
//  document.getElementById('mainContent')?.classList.add('hidden');
}

function hideLoader() {
  document.getElementById('loadingScreen')?.classList.add('hidden');
  document.getElementById('mainContent')?.classList.remove('hidden');
}



function login() {
  showLoader();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const loginButton = document.getElementById('loginButton');
  const loginButtonText = document.getElementById('loginButtonText');
  const loginSpinner = document.getElementById('loginSpinner');

  // UI: disable button + show spinner
  loginButton.disabled = true;
  loginButtonText.classList.add('hidden');
  loginSpinner.classList.remove('hidden');


  fetch(`${ENV_CONFIG.SCRIPT_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        localStorage.setItem('sessionEmail', response.email);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        showDashboard(response.email);
      } else {
        document.getElementById('error').innerText = response.message || 'Login failed.';
      }
    })
    .catch(() => {
      document.getElementById('error').innerText = 'Login request failed.';
    })
    .finally(() => {
      // Re-enable button and hide spinner
      loginButton.disabled = false;
      loginButtonText.classList.remove('hidden');
      loginSpinner.classList.add('hidden');

      hideLoader();
    });
}

function logout() {
  const email = localStorage.getItem('sessionEmail');
  if (!email) {
    showLogin();
    return;
  }

  showLoader(); // Show loading indicator

  fetch(`${ENV_CONFIG.SCRIPT_URL}?action=logout&email=${encodeURIComponent(email)}`)
    .then(() => {
      localStorage.removeItem('sessionEmail');
      localStorage.removeItem('token'); // Optional: clean token as well
      localStorage.removeItem('role');
      showLogin();
    })
    .catch(() => {
      localStorage.removeItem('sessionEmail');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      showLogin();
    })
    .finally(() => {
      hideLoader(); // Always hide loader, success or failure
    });
}


function showLogin() {
  document.getElementById('loginSection').classList.remove('hidden');
  document.getElementById('dashboardSection').classList.add('hidden');
  document.getElementById('pageContentSection').classList.add('hidden');
}

function showDashboard(email) {
  document.getElementById('userEmail').innerText = email;
  document.getElementById('loginSection')?.classList.add('hidden');
  document.getElementById('dashboardSection')?.classList.remove('hidden');
  document.getElementById('pageContentSection')?.classList.add('hidden');
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
