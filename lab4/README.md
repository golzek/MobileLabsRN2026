# Лабораторна робота №4 — Файловий менеджер

**Тема:** Робота з файловою системою в React Native з використанням бібліотеки `expo-file-system`.

---

## Інструкція запуску

```bash
git clone https://github.com/YOUR_USERNAME/MobileLabsRN2026.git
cd MobileLabsRN2026/lab4
npm install
npx expo start
```

Відскануйте QR-код через Expo Go на телефоні.

---

## Реалізований функціонал

| # | Функція | Опис |
|---|---|---|
| 1 | Навігація | Breadcrumb, перехід у папки, кнопка «Вгору» |
| 2 | Створення папки | Модальне вікно з введенням назви |
| 3 | Створення файлу | Модальне вікно з назвою та початковим вмістом |
| 4 | Перегляд файлу | Режим читання з нумерацією рядків |
| 5 | Редагування | Редактор з підсвіткою незбережених змін |
| 6 | Видалення | Підтвердження перед видаленням |
| 7 | Властивості | Назва, тип, розмір, дата змін |
| 8 | Статистика пам'яті | Загальний / вільний / зайнятий простір |

---

## Структура проєкту

```
lab4/
├── App.js
├── package.json
├── babel.config.js
├── app.json
└── src/
    ├── navigation/AppNavigator.js
    ├── utils/filesystem.js
    ├── components/
    │   ├── ui.js
    │   ├── FileItem.js
    │   ├── Breadcrumb.js
    │   └── ContextMenu.js
    └── screens/
        ├── HomeScreen.js
        ├── ExplorerScreen.js
        ├── ViewerScreen.js
        ├── EditorScreen.js
        └── FileInfoScreen.js
```

---

## Залежності

```json
{
  "expo-file-system": "~16.0.9",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/native-stack": "^6.9.17"
}
```
## Скріншоти
![img.png](screens%2Fimg.png)
![img_1.png](screens%2Fimg_1.png)