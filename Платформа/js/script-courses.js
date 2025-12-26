// Аккордеон эффект (егер лекциялар қосқың келсе)
document.querySelectorAll('.course-title').forEach(title => {
  title.addEventListener('click', () => {
    const next = title.nextElementSibling;
    if (next && next.tagName === 'DIV') {
      next.style.display = next.style.display === 'block' ? 'none' : 'block';
    }
  });
});
function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('active');
}