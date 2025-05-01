const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZs7Xr2OxZdwMg-iZFJYaBDrj3ik5H-mkXKncQrMPyvPXvnfDmkWGP9O0eFpVxe_U1Xw/exec';

// Function to check if the user is logged in
function checkLogin(callback) {
  const email = localStorage.getItem('email');
  if (!email) {
    window.location.href = 'index.html';
    return;
  }

  fetch(`${SCRIPT_URL}?action=isLoggedIn&email=${encodeURIComponent(email)}`)
    .then(res => res.json())
    .then(data => {
      if (data.loggedIn) {
        callback(data.email);
      } else {
        localStorage.removeItem('email');
        window.location.href = 'index.html';
      }
    })
    .catch(() => {
      localStorage.removeItem('email');
      window.location.href = 'index.html';
    });
}

// Function to perform login
function login(email, password, callback) {
  fetch(`${SCRIPT_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        localStorage.setItem('email', response.email);
        callback(response.email);
      } else {
        alert(response.message); // You can show an error message here
      }
    })
    .catch(() => {
      alert('Network error. Please try again.');
    });
}

// Function to perform logout
function logout(callback) {
  const email = localStorage.getItem('email');
  fetch(`${SCRIPT_URL}?action=logout&email=${encodeURIComponent(email)}`)
    .then(() => {
      localStorage.removeItem('email');
      callback();
    })
    .catch(() => {
      localStorage.removeItem('email');
      callback();
    });
}
