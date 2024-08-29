class ProgressBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    // Обработчики событий
    this.shadowRoot
      .querySelector("#progress-value")
      .addEventListener("input", (e) => this.updateProgress(e.target.value));
    this.shadowRoot
      .querySelector("#animate-toggle")
      .addEventListener("change", (e) =>
        this.toggleAnimation(e.target.checked)
      );
    this.shadowRoot
      .querySelector("#hide-toggle")
      .addEventListener("change", (e) =>
        this.toggleVisibility(e.target.checked)
      );
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          .container {
            position: relative;
            background: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 90px;
            border: 1px solid #ccc;
          }
          .progress-label {
            position: absolute;
            top: 10px;
            left: 10px;
          }
          .container-progress {
            width: 120px;
            height: 116px;
          }
          .container-bar {
            width: 140px;
          }
          @media (orientation: portrait) {
            .container {
              width: 320px;
              height: 568px;
              flex-direction: column;
            }
          }
          @media (orientation: landscape) {
            .container {
              width: 568px;
              height: 320px;
              flex-direction: row;
            }
          }
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
          .value-input {
            width: 45px;
            height: 30px;
            padding: 5px 7px;
            margin: 3px 20px 3px 0px;
            border-radius: 30px;
            border: 1px solid #000000;
            font-size: 16px;
            box-sizing: border-box;
            text-align: center;
            font-weight: bold;
          }
          .value-input::-webkit-outer-spin-button,
          .value-input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          .value-input[type="number"] {
            -moz-appearance: textfield;
          }
          .switch {
            position: relative;
            display: inline-flex;
            align-items: center;
            width: 100%;
            height: 30px;
            margin: 3px 0 3px 0;
          }
          .switch input[type="checkbox"] {
            display: none;
          }
          .slider {
            position: relative;
            cursor: pointer;
            width: 45px;
            height: 30px;
            margin-left: 0;
            margin-right: 20px;
            background-color: #dfe6f0;
            border-radius: 30px;
            transition: background-color 0.4s;
          }
          .slider::before {
            position: absolute;
            content: "";
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background-color: white;
            left: 2px;
            bottom: 3px;
            transition: transform 0.4s, left 0.4s;
          }
          input:checked + .slider {
            background-color: #005dff;
          }
          input:checked + .slider::before {
            transform: translateX(17px);
          }
          .text {
            font-size: 15px;
            font-weight: 600;
            font-family: "Arial";
          }
        </style>
        <div class="container">
          <div class="progress-label text">Progress</div>
  
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
  
          <div class="container-bar">
            <label>
              <input
                type="number"
                id="progress-value"
                class="value-input"
                max="100"
                min="0"
              /><span class="text">Value</span>
            </label>
            <label class="switch">
              <input type="checkbox" id="animate-toggle" />
              <span class="slider"></span>
              <span class="text">Animate</span>
            </label>
            <label class="switch">
              <input type="checkbox" id="hide-toggle" />
              <span class="slider"></span>
              <span class="text">Hide</span>
            </label>
          </div>
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
    this.shadowRoot.querySelector("#progress-value").value = value;
  }

  setAnimated(isAnimated) {
    this.toggleAnimation(isAnimated);
    this.shadowRoot.querySelector("#animate-toggle").checked = isAnimated;
  }

  setHidden(isHidden) {
    this.toggleVisibility(isHidden);
    this.shadowRoot.querySelector("#hide-toggle").checked = isHidden;
  }
}

customElements.define("progress-block", ProgressBlock);
