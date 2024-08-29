
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

Клонируйте репозиторий:

```bash
  git clone https://github.com/llk707/task-progress.git
```

Запустите Live Server.

Откройте ссылку в вашем браузере для просмотра приложения.
## Пример использования API

Откройте консоль в браузере

- Устанавите значение прогресса на 42%: 

`document.querySelector('progress-block').setValue(42);`

- Включите анимацию: 

`document.querySelector('progress-block').setAnimated(true);`

- Скройте блок:

`document.querySelector('progress-block').setHidden(true);`
## Лицензия


Этот проект лицензируется под [MIT License](https://choosealicense.com/licenses/mit/).

