document.getElementById("login-btn").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;

  if (!name || !username || !password) {
    alert("Please fill out all the fields before registering.");
    return;
  }

  if (name && username) {
    document.querySelector(".form-box").classList.add("hidden");
    document.getElementById("success-box").classList.remove("hidden");
    document.getElementById("registered-username").textContent = username;
  }
});
