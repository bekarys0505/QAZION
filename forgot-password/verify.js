document.getElementById("verifyForm").addEventListener("submit", function(e){
  e.preventDefault();
  const entered = document.getElementById("verifyCode").value.trim();
  const saved = localStorage.getItem("verifyCode");

  if (entered === saved) {
    alert("✅ Код дұрыс!");
    window.location.href = "new-password.html";
  } else {
    alert("❌ Коды дұрыс емес!");
  }
});
