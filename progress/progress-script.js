// Функция инициализации после загрузки и вставки HTML
export function initializeProgressBlock() {
  const progressPath = document.getElementById("progress-path");
  const progressValueInput = document.getElementById("progress-value");
  const animateToggle = document.getElementById("animate-toggle");
  const hideToggle = document.getElementById("hide-toggle");

  let isAnimating = false;
  let isHidden = false;

  // Функция для обновления прогресса
  function updateProgress(value) {
    value = parseInt(value, 10) || 0;

    // Установка значения для индикатора
    const radius = 55;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    progressPath.setAttribute("stroke-dasharray", circumference);
    progressPath.setAttribute("stroke-dashoffset", offset);
  }

  // Функция для включения/выключения анимации
  function toggleAnimation(isAnimated) {
    if (isAnimated) {
      // Устанавливаем центр вращения в середину элемента
      progressPath.style.transformOrigin = "center center";
      progressPath.style.animation = "rotate 2s linear infinite";
    } else {
      progressPath.style.animation = "none";
    }
  }

  // Функция для включения/выключения видимости блока
  function toggleVisibility(isVisible) {
    const svgElement = document.querySelector("#container-progress svg");
    svgElement.style.visibility = !isVisible ? "visible" : "hidden";
  }

  // API
  const progressAPI = {
    setValue(value) {
      value = value < 100 ? value : 100;
      updateProgress(value);
      progressValueInput.value = value;
    },
    setAnimated(isAnimated) {
      isAnimating = isAnimated;
      toggleAnimation(isAnimated);
      animateToggle.checked = isAnimated;
    },
    setHidden(isHidden) {
      this.isHidden = isHidden;
      toggleVisibility(isHidden);
      hideToggle.checked = isHidden;
    },
  };

  // Обработчики событий
  progressValueInput.addEventListener("input", () => {
    progressAPI.setValue(progressValueInput.value);
  });
  animateToggle.addEventListener("change", (e) => {
    progressAPI.setAnimated(e.target.checked);
  });
  hideToggle.addEventListener("change", (e) => {
    progressAPI.setHidden(e.target.checked);
  });

  // Инициализация
  progressAPI.setValue(progressValueInput.value);
  progressAPI.setAnimated(animateToggle.checked);
  progressAPI.setHidden(hideToggle.checked);

  // Экспорт API
  window.progressAPI = progressAPI;
}

// // Устанавливаем значение прогресса на 50%
// window.progressAPI.setValue(50);

// // Включаем анимацию
// window.progressAPI.setAnimated(true);

// // Показываем блок
// window.progressAPI.setHidden(false);
