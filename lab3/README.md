# Лабораторна робота №3 — Жести та стилізація

**Тема:** Використання кастомних жестів у React Native та стилізація інтерфейсу мобільного застосунку.

---

## Інструкція запуску

### Вимоги

- Node.js v18+
- [Expo Go](https://expo.dev/client) на пристрої

```bash
npm install
npx expo start
```

**Важливо:** `import 'react-native-gesture-handler'` — обов'язково перший рядок в `App.js`. У `babel.config.js` потрібен плагін `react-native-reanimated/plugin`.

---

## Реалізований функціонал

### Екран гри (HomeScreen)

Клікер з об'єктом, що реагує на 6 типів жестів через `react-native-gesture-handler` (Gesture API v2):

| Жест | Handler | Дія | Очки |
|---|---|---|---|
| Одиночний дотик | `Gesture.Tap().numberOfTaps(1)` | Анімація збільшення | +1 |
| Подвійний клік | `Gesture.Tap().numberOfTaps(2)` | Анімація + тремтіння | +2 |
| Утримання (800 мс) | `Gesture.LongPress()` | Затемнення + вібрація | +5 |
| Перетягування | `Gesture.Pan()` | Переміщення + повернення | квест |
| Свайп вправо/вліво | `Gesture.Fling()` | Зміщення + нове emoji | +3–10 |
| Пінч | `Gesture.Pinch()` | Масштабування | +3 |

Жести скомпоновані через `Gesture.Simultaneous()` та `Gesture.Exclusive()`.

### Екран завдань (QuestsScreen)

9 завдань із відстеженням прогресу в реальному часі:

- Прогрес-бар для кожного завдання
- Відображення поточного значення лічильника
- Зелене підсвічування виконаних завдань
- Загальний прогрес-бар на початку списку

### Екран налаштувань (SettingsScreen)

- Перемикач темної/світлої теми
- Режим «авто» (слідує за системою)
- Статистика гри (рахунок, виконані завдання)
- Скидання прогресу з підтвердженням (Alert)

### Стилізація — Styled Components

Весь UI побудований на `styled-components/native`:

- Теми (`lightTheme` / `darkTheme`) передаються через `ThemeProvider`
- Спільна бібліотека компонентів у `src/components/styled.js`
- Підтримка темної та світлої теми з миттєвим перемиканням

---

## Структура проєкту

```
lab3/
├── App.js
├── package.json
├── babel.config.js
├── app.json
└── src/
    ├── theme/
    │   └── themes.js
    ├── context/
    │   ├── GameContext.js
    │   └── ThemeContext.js
    ├── components/
    │   ├── styled.js
    │   └── ClickerObject.js
    ├── navigation/
    │   └── AppNavigator.js
    └── screens/
        ├── HomeScreen.js
        ├── QuestsScreen.js
        └── SettingsScreen.js
```

---

## Залежності

```json
{
  "react-native-gesture-handler": "~2.14.0",
  "react-native-reanimated": "~3.6.2",
  "styled-components": "^6.1.8",
  "@react-navigation/bottom-tabs": "^6.5.11"
}
```

---

## Скріншоти
![img.png](screens%2Fimg.png)
![img_1.png](screens%2Fimg_1.png)
![img_2.png](screens%2Fimg_2.png)
---

## Висновки

Жести в React Native реалізуються через бібліотеку `react-native-gesture-handler`, яка забезпечує нативну обробку на рівні потоку UI без блокування JS-потоку.

Gesture API v2 дозволяє декларативно описувати жести та їх композицію: `Gesture.Tap()` — для одинарних та подвійних натискань з `numberOfTaps`, `Gesture.LongPress()` — утримання з `minDuration` у мілісекундах, `Gesture.Pan()` — перетягування з відстеженням translationX/Y, `Gesture.Fling()` — швидкі свайпи з вказанням `direction`, `Gesture.Pinch()` — масштабування двома пальцями.

`Gesture.Simultaneous()` дозволяє паралельне розпізнавання декількох жестів, `Gesture.Exclusive()` — пріоритетне (перший, що спрацював, блокує інші).

`react-native-reanimated` забезпечує плавні анімації, що виконуються на UI-потоці, використовуючи `useSharedValue` та `useAnimatedStyle`.

Styled Components дають змогу писати CSS-подібні стилі безпосередньо в компонентах, передавати тему через контекст і підтримувати кілька тем без умовної логіки у кожному компоненті.
