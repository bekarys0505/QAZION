document.getElementById("newpass-form").addEventListener("submit", function(e){
  e.preventDefault();

  const newPass = document.getElementById("newPassword").value.trim();
  const confirm = document.getElementById("confirmPassword").value.trim();

  if (newPass.length < 6) return alert("⚠️ Пароль кемінде 6 таңбалы болуы керек!");
  if (newPass !== confirm) return alert("❌ Парольдер сәйкес емес!");

  alert("✅ Пароль сәтті жаңартылды!");
  localStorage.removeItem("verifyCode");
  localStorage.removeItem("resetEmail");
  window.location.href = "../Login/LOGIN.html";
});
