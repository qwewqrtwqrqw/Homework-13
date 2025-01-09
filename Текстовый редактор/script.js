// Получаем элементы
const textEditor = document.getElementById('text-editor');
const saveButton = document.getElementById('save-button');
const clearButton = document.getElementById('clear-button');

// Восстановление текста из локального хранилища
document.addEventListener('DOMContentLoaded', () => {
  const savedText = localStorage.getItem('text-editor-content');
  if (savedText) {
    textEditor.value = savedText;
  }
});

// Сохранение текста в локальное хранилище
saveButton.addEventListener('click', () => {
  const text = textEditor.value;
  localStorage.setItem('text-editor-content', text);
  alert('Текст сохранён!');
});

// Очистка содержимого
clearButton.addEventListener('click', () => {
  textEditor.value = '';
  localStorage.removeItem('text-editor-content');
});
