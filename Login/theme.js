const toggle = document.getElementById('themeToggle');
toggle.addEventListener('change', () => {
  if(toggle.checked){
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  }
});
