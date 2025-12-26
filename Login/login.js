document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();

  const btn = this.querySelector('.login-btn');
  btn.textContent = 'Кіру...';
  btn.disabled = true;

  // 0.7 секундтан кейін платформаға бағыттау
  setTimeout(() => {
    window.location.href = "../Платформа/index.html";
  }, 700);
});
