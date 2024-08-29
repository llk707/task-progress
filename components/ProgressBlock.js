class ProgressBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          #container-progress.show {
            visibility: visible;
          }
          #progress-path {
            transition: stroke-dashoffset 0.5s;
          }
        </style>
        <div id="container-progress">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="55"
            stroke="#ddd"
            stroke-width="10"
            fill="none"
          />
          <path
            id="progress-path"
            stroke="#005DFF"
            stroke-width="10"
            fill="none"
            d="M60 5 a 55 55 0 1 1 0 110 a 55 55 0 1 1 0 -110"
          />
        </svg>
      </div>
      `;

    // Начальные значения
    this.updateProgress(0);
    this.toggleAnimation(false);
    this.toggleVisibility(false);
  }

  // Метод для обновления прогресса
  updateProgress(value) {
    const progressPath = this.shadowRoot.querySelector("#progress-path");
    value = parseInt(value, 10) || 0;
    const radius = 55;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    progressPath.setAttribute("stroke-dasharray", circumference);
    progressPath.setAttribute("stroke-dashoffset", offset);
  }

  // Метод для включения/выключения анимации
  toggleAnimation(isAnimated) {
    const progressPath = this.shadowRoot.querySelector("#progress-path");
    if (isAnimated) {
      progressPath.style.transformOrigin = "center center";
      progressPath.style.animation = "rotate 2s linear infinite";
    } else {
      progressPath.style.animation = "none";
    }
  }

  // Метод для включения/выключения видимости блока
  toggleVisibility(isVisible) {
    const svgElement = this.shadowRoot.querySelector("#container-progress svg");
    svgElement.style.visibility = isVisible ? "hidden" : "visible";
  }

  // Публичные методы API
  setValue(value) {
    this.updateProgress(value);
  }

  setAnimated(isAnimated) {
    this.toggleAnimation(isAnimated);
  }

  setHidden(isHidden) {
    this.toggleVisibility(isHidden);
  }
}

customElements.define("progress-block", ProgressBlock);
