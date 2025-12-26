function showAnimation() {
  const btn = document.getElementById("loginBtn");
  const btnText = btn.querySelector(".btn-text");
  const btnSpinner = btn.querySelector(".btn-spinner");
  const btnCheck = btn.querySelector(".btn-check");

  const clickSound = document.getElementById("clickSound");
  const dingSound = document.getElementById("dingSound");

  const username = document.querySelector('input[type="text"]');
  const password = document.querySelector('input[type="password"]');

  if (!username.value.trim() || !password.value.trim()) {
    alert("Логин және парольді толтырыңыз!");
    username.style.border = "2px solid red";
    password.style.border = "2px solid red";
    return;
  } else {
    username.style.border = "none";
    password.style.border = "none";
  }

  if (clickSound) clickSound.play();

  btn.disabled = true;
  btnText.textContent = "Жүктелуде...";
  btnSpinner.style.display = "inline-block";
  btn.classList.add("loading");

  setTimeout(() => {
    btnSpinner.style.display = "none";
    btnCheck.style.display = "inline-block";
    btnText.textContent = "Қош келдіңіз!";
    if (dingSound) dingSound.play();
  }, 1500);

  setTimeout(() => {
    window.location.href = "../Платформа/index.html";
  }, 2500);
}
