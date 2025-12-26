const noteArea = document.getElementById('noteArea');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');

// Жергілікті сақтау
saveBtn.addEventListener('click', () => {
  const content = noteArea.value.trim();
  if (content) {
    localStorage.setItem('notebookContent', content);
    alert('✅ Мәтін сақталды!');
  } else {
    alert('⚠️ Мәтін бос!');
  }
});

// Блокнотты тазалау
clearBtn.addEventListener('click', () => {
  noteArea.value = '';
  localStorage.removeItem('notebookContent');
});

// Бетті жүктегенде сақталған мәтінді шығару
window.addEventListener('load', () => {
  const saved = localStorage.getItem('notebookContent');
  if (saved) noteArea.value = saved;
});
