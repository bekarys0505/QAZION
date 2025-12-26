(function() {
  emailjs.init("4ol-A2AmdIxwKq27n"); // мұнда өз EmailJS public key-іңді қой
})();

document.getElementById("forgotForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();

  if (!email) return alert("⚠️ Электрондық поштаны енгізіңіз!");

  const code = Math.floor(1000 + Math.random() * 9000); // 4 таңбалы код
  localStorage.setItem("verifyCode", code);
  localStorage.setItem("resetEmail", email);

  const params = {
    to_email: email,
    code: code
  };

  emailjs.send("service_1phawiv", "template_08nwe4a", params)
    .then(() => {
      alert("✅ Код поштаңызға жіберілді!");
      window.location.href = "verify-code.html";
    })
    .catch((err) => {
      console.error(err);
      alert("❌ Код жіберу кезінде қате кетті!");
    });
});
