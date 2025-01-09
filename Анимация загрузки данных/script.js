// Получаем ссылки на элементы
const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');

// Функция для создания элемента валюты
function createCurrencyElement(charCode, value) {
  const item = document.createElement('div');
  item.classList.add('item');

  const codeElement = document.createElement('div');
  codeElement.classList.add('item__code');
  codeElement.textContent = charCode;

  const valueElement = document.createElement('div');
  valueElement.classList.add('item__value');
  valueElement.textContent = value;

  const currencyElement = document.createElement('div');
  currencyElement.classList.add('item__currency');
  currencyElement.textContent = 'руб.';

  item.appendChild(codeElement);
  item.appendChild(valueElement);
  item.appendChild(currencyElement);

  return item;
}

// Функция загрузки данных
async function loadCurrencies() {
  try {
    // Отображаем анимацию загрузки
    loader.classList.add('loader_active');

    // Выполняем запрос к API
    const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    const currencies = data.response.Valute;

    // Очищаем контейнер и добавляем новые элементы
    itemsContainer.innerHTML = '';
    for (const key in currencies) {
      const currency = currencies[key];
      const currencyElement = createCurrencyElement(currency.CharCode, currency.Value);
      itemsContainer.appendChild(currencyElement);
    }
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
    itemsContainer.innerHTML = '<p>Ошибка загрузки данных. Попробуйте позже.</p>';
  } finally {
    // Скрываем анимацию загрузки
    loader.classList.remove('loader_active');
  }
}

// Запускаем загрузку данных
loadCurrencies();
