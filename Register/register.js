function registerUser() {
  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  const btn = document.getElementById("registerBtn");
  const clickSound = document.getElementById("clickSound");
  const dingSound = document.getElementById("dingSound");

  if (!fullname || !email || !username || !password || !confirmPassword) {
    alert("Барлық өрісті толтырыңыз!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Парольдер сәйкес емес!");
    return;
  }

  if (clickSound) clickSound.play();

  btn.disabled = true;
  btn.querySelector(".btn-text").textContent = "Тіркелуде...";
  btn.classList.add("loading");

  setTimeout(() => {
    btn.classList.remove("loading");
    btn.classList.add("success");
    btn.querySelector(".btn-text").textContent = "Сәтті тіркелдіңіз!";
    if (dingSound) dingSound.play();
  }, 1500);

  setTimeout(() => {
    window.location.href = "../login.html";
  }, 2500);
}
