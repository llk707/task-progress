
#  Progress Block
## Описание

Этот проект представляет собой прототип блока Progress для мобильных web-приложений. Он имеет API для управления своим состоянием и может быть легко переиспользован в других приложениях.

## Особенности

- Состояния блока:

  - Normal: Отображает прогресс с помощью дуги, где начало соответствует 12 часам. Значение Value управляет размером дуги, которая движется по часовой стрелке.
  - Animated: В этом состоянии блок или его элементы вращаются с некоторым периодом по часовой стрелке.
  - Hidden: Блок скрывается со страницы.
- Элементы управления:
  - Value: Текстовый ввод числа от 0 до 100 для управления размером дуги.
  - Animate: Логический переключатель для включения/выключения анимации.
  - Hide: Логический переключатель для включения/выключения видимости блока.
- Адаптивность: Приложение адаптируется под ориентацию экрана.
## Установка

1. Клонируйте репозиторий:

```bash
  git clone https://github.com/llk707/task-progress.git
```

2. Запустите Live Server:
   
3. Откройте ссылку в вашем браузере для просмотра приложения.

## API методы

- Устанавите значение метод `setValue(num);`.

- Включить анимацию метод `setAnimated(boolean)`.

- Скройте блок метод `setHidden(boolean)`.
## Использование компонента

Блок спроектирован так, что его можно легко переиспользовать в других приложениях.

1. **Использование веб-компонента:**
   - Для этого скачайте файл `./components/ProgressBlock.js`, и импортируйте его в свой проект.

2. **Подключение скрипта:**
   - Добавьте следующий скрипт в ваш HTML-файл для подключения JavaScript файла, содержащего код компонента `<progress-block>`:
     ```html
     <script type="module" src="./components/ProgressBlock.js"></script>
     ```
   - Использование `type="module"` позволяет использовать современные возможности JavaScript, такие как ES-модули.

3. **Пример:**
    ```html
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <!-- Здесь можно подключить стили, метаданные и другие настройки для страницы -->
      </head>
      <body>
        <!-- Использование веб-компонента -->
        <progress-block></progress-block>
    
        <!-- Подключение модуля с реализацией компонента -->
        <script type="module" src="./components/ProgressBlock.js"></script>
      </body>
    </html>
    ```
## Лицензия


Этот проект лицензируется под [MIT License](https://choosealicense.com/licenses/mit/).

