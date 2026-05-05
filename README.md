# MobileLabsRN2026 — Лабораторні роботи з React Native

Репозиторій містить лабораторні роботи з дисципліни **«Мобільна розробка»** з використанням React Native та Expo.

**Автор:** Євген Головня  
**Рік:** 2026  
**Технології:** React Native · Expo · JavaScript · Firebase

---

## Лабораторні роботи

| № | Тема | Стек |
|---|------|------|
| [Lab 1](./lab1) | Використання Expo для створення найпростішого додатку React Native. Знайомство з основними компонентами | Expo, React Navigation, FlatList |
| [Lab 2](./lab2) | Побудова вкладеної навігації та оптимізація відображення великих списків | FlatList, SectionList, Drawer Navigator |
| [Lab 3](./lab3) | Використання кастомних жестів та стилізація інтерфейсу | Gesture Handler, Reanimated, Styled Components |
| [Lab 4](./lab4) | Робота з файловою системою | expo-file-system |
| [Lab 5](./lab5) | Навігація з Expo Router та авторизація | Expo Router, React Context |
| [Lab 6](./lab6) | Firebase Authentication та Firestore | Firebase Auth, Cloud Firestore |

---

## Швидкий старт

Кожна лабораторна є окремим Expo-проєктом. Для запуску будь-якої:

```bash
cd labN        # наприклад, cd lab1
npm install
npx expo start
```

Потім відскануйте QR-код через **Expo Go** (Android / iOS) або запустіть на емуляторі:
- `a` — Android емулятор
- `i` — iOS симулятор (лише macOS)

### Вимоги

- [Node.js](https://nodejs.org/) v18+
- [Expo Go](https://expo.dev/client) на мобільному пристрої
- npm або yarn

> **Lab 6** додатково потребує налаштування Firebase — деталі у [lab6/README.md](./lab6/README.md).

---

## Структура репозиторію

```
MobileLabsRN2026/
├── lab1/   — Базові компоненти React Native
├── lab2/   — Навігація та списки
├── lab3/   — Жести та стилізація
├── lab4/   — Файловий менеджер
├── lab5/   — Expo Router
└── lab6/   — Firebase Auth + Firestore
```