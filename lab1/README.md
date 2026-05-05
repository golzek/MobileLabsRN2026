# Лабораторна робота №1 — React Native + Expo

**Тема:** Використання Expo для створення найпростішого додатку React Native. Знайомство з основними компонентами.

## Опис проєкту

Навчальний мобільний застосунок **«Студентський трекер курсів»** — додаток для відстеження навчального прогресу студента.

### Функціональність

- **Головний екран** — список курсів із пошуком і статистикою прогресу
- **Деталі курсу** — розгорнута програма з відміткою виконаних тем
- **Галерея технологій** — інтерактивна сітка з фільтрацією та модальним вікном
- **Профіль** — особисті дані, досягнення, налаштування (Switch)

### Компоненти React Native

| Компонент | Де використовується |
|---|---|
| `View` | Контейнери, картки, сітки |
| `Text` | Заголовки, підписи, значення |
| `ScrollView` | Прокручувані списки |
| `TouchableOpacity` | Кнопки, картки курсів |
| `TextInput` | Поле пошуку на головному екрані |
| `Switch` | Тоглери в налаштуваннях |
| `Modal` | Модальне вікно в галереї |
| `SafeAreaView` | Безпечна зона на всіх екранах |
| `Alert` | Підтвердження дій |
| `StyleSheet` | Всі стилі у всіх компонентах |

---

## Інструкція із запуску

### Вимоги

- [Node.js](https://nodejs.org/) v18 або новіший
- npm або yarn
- [Expo Go](https://expo.dev/client) на фізичному пристрої (Android / iOS)

### Кроки

```bash
# 1. Встановити залежності
npm install

# 2. Запустити Expo Dev Server
npx expo start
```

Після запуску в терміналі з'явиться QR-код і меню вибору платформи.

---

## Способи запуску

### Expo Go (фізичний пристрій)

Призначення: швидке тестування на реальному пристрої без встановлення нативних інструментів.

1. Встановити [Expo Go](https://expo.dev/client) з App Store або Google Play
2. Запустити `npx expo start`
3. Відсканувати QR-код: на Android — через камеру Expo Go, на iOS — через стандартну камеру

Не потребує Xcode або Android Studio. Підтримує живе оновлення (Fast Refresh). Працює через локальну мережу Wi-Fi. Не підтримує власні нативні модулі без попереднього білду.

---

### Android Emulator (AVD)

Призначення: тестування на різних розмірах екранів Android без фізичного пристрою.

Вимоги: Android Studio з налаштованим AVD.

1. Встановити [Android Studio](https://developer.android.com/studio)
2. Відкрити AVD Manager, створити та запустити емулятор
3. Виконати `npx expo start`, потім натиснути `a` у терміналі, або: `npx expo start --android`

Точна симуляція Android-пристроїв. Зручна для тестування різних роздільних здатностей. Можна тестувати без Wi-Fi. Потребує встановлення Android Studio (~4–8 GB) і може споживати багато ресурсів ПК.

---

### iOS Simulator (тільки macOS)

Призначення: тестування на симульованих iPhone/iPad пристроях.

Вимоги: macOS + Xcode.

1. Встановити [Xcode](https://developer.apple.com/xcode/) з Mac App Store
2. Запустити `npx expo start`, потім натиснути `i`, або: `npx expo start --ios`

Доступно тільки на macOS. Потребує Xcode (~10 GB).

---

### Expo Snack (онлайн)

Призначення: швидке прототипування та демонстрація без локального середовища.

Посилання: [snack.expo.dev](https://snack.expo.dev)

1. Відкрити [snack.expo.dev](https://snack.expo.dev) у браузері
2. Вставити код компонентів у відповідні файли
3. Натиснути «Run» або відсканувати QR-код через Expo Go

Не потребує жодного встановлення. Зручно для демонстрації. Обмежений доступ до нативних API. Немає підтримки `@react-navigation` без додаткових налаштувань.

---

### Порівняльна таблиця

| Метод | Реальний пристрій | Нативні API | Складність | ОС |
|---|---|---|---|---|
| Expo Go | Так | Частково | Низька | Будь-яка |
| Android Emulator | Ні | Так | Середня | Windows/Mac/Linux |
| iOS Simulator | Ні | Так | Середня | тільки macOS |
| Expo Snack | Через Expo Go | Ні | Найнижча | Будь-яка |

---

## Структура проєкту

```
lab1/
├── App.js
├── app.json
├── package.json
├── babel.config.js
├── assets/
└── src/
    └── screens/
        ├── HomeScreen.js
        ├── DetailsScreen.js
        ├── GalleryScreen.js
        └── ProfileScreen.js
```

---

## Навігація

Для реалізації навігації використовується `@react-navigation`:

- **`createNativeStackNavigator`** — стековий навігатор (перехід Головна → Деталі)
- **`createBottomTabNavigator`** — нижнє меню вкладок (Головна / Галерея / Профіль)

```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
```

---

## Скріншоти екранів
![img.png](screens%2Fimg.png)
![img_1.png](screens%2Fimg_1.png)
![img_2.png](screens%2Fimg_2.png)
---

## Залежності

```json
{
   "@react-navigation/bottom-tabs": "^6.5.11",
   "@react-navigation/native": "^6.1.9",
   "@react-navigation/native-stack": "^6.9.17",
   "expo": "~50.0.0",
   "react": "18.2.0",
   "react-native": "0.73.2",
   "react-native-safe-area-context": "4.8.2",
   "react-native-screens": "~3.29.0"
}
```