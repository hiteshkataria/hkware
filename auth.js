window.onload = function () {
  const email = localStorage.getItem("sessionEmail");
  if (!email) {
    window.location.href = "index.html"; // Redirect to login if not logged in
  }
};
