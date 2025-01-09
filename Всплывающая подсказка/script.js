document.addEventListener('DOMContentLoaded', () => {
    const tooltips = document.querySelectorAll('.has-tooltip');
  
    tooltips.forEach((tooltip) => {
      tooltip.addEventListener('click', (event) => {
        event.preventDefault();
  
        // Закрыть все активные подсказки
        const activeTooltip = document.querySelector('.tooltip_active');
        if (activeTooltip) {
          activeTooltip.classList.remove('tooltip_active');
          if (activeTooltip === tooltip.nextElementSibling) {
            return; // Закрываем уже активную подсказку
          }
        }
  
        // Создаём или используем существующую подсказку
        let tooltipElement = tooltip.nextElementSibling;
        if (!tooltipElement || !tooltipElement.classList.contains('tooltip')) {
          tooltipElement = document.createElement('div');
          tooltipElement.classList.add('tooltip');
          tooltipElement.textContent = tooltip.getAttribute('title');
          document.body.appendChild(tooltipElement);
        }
  
        // Устанавливаем позицию
        const position = tooltip.getAttribute('data-position') || 'bottom';
        tooltipElement.setAttribute('data-position', position);
  
        const rect = tooltip.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
  
        if (position === 'top') {
          tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
          tooltipElement.style.top = `${rect.top - tooltipRect.height}px`;
        } else if (position === 'bottom') {
          tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
          tooltipElement.style.top = `${rect.bottom}px`;
        } else if (position === 'left') {
          tooltipElement.style.left = `${rect.left - tooltipRect.width}px`;
          tooltipElement.style.top = `${rect.top + rect.height / 2}px`;
        } else if (position === 'right') {
          tooltipElement.style.left = `${rect.right}px`;
          tooltipElement.style.top = `${rect.top + rect.height / 2}px`;
        }
  
        // Показываем подсказку
        tooltipElement.classList.add('tooltip_active');
      });
    });
  
    // Закрытие подсказки при клике вне её области
    document.addEventListener('click', (event) => {
      if (!event.target.classList.contains('has-tooltip')) {
        const activeTooltip = document.querySelector('.tooltip_active');
        if (activeTooltip) {
          activeTooltip.classList.remove('tooltip_active');
        }
      }
    });
  });
  