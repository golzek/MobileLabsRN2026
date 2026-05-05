# Лабораторна робота №2 — Навігація та списки

**Тема:** Побудова вкладеної навігації та оптимізація відображення великих списків у React Native із використанням компонентів `FlatList` та `SectionList`.

---

## Інструкція запуску

### Вимоги

- Node.js v18+
- npm або yarn
- [Expo Go](https://expo.dev/client) на пристрої або Android Emulator

```bash
# 1. Встановити залежності
npm install

# 2. Запустити
npx expo start
```

**Важливо:** `react-native-gesture-handler` вимагає, щоб імпорт `'react-native-gesture-handler'` був першим рядком у `App.js`. Також у `babel.config.js` необхідний плагін `react-native-reanimated/plugin`.

---

## Реалізований функціонал

### Навігація

| Компонент | Призначення |
|---|---|
| `DrawerNavigator` | Бокове меню застосунку |
| `NativeStackNavigator` | Стекова навігація (Новини → Деталі) |
| Вкладена навігація | `Drawer` → `Stack` → `MainScreen` / `DetailsScreen` |
| Передача параметрів | `navigation.navigate('Details', { newsItem })` → `route.params.newsItem` |
| Динамічний заголовок | Встановлюється з `route.params.newsItem.title` |
| Усунення подвійного header | `headerShown: false` на рівні Stack та Drawer |

### FlatList (MainScreen)

| Функція | Реалізація |
|---|---|
| Pull-to-Refresh | `refreshing` + `onRefresh` + `setTimeout` для імітації запиту |
| Infinite Scroll | `onEndReached` + `onEndReachedThreshold={0.4}` |
| `ListHeaderComponent` | Заголовок із кнопкою меню та назвою розділу |
| `ListFooterComponent` | Індикатор завантаження або повідомлення «Всі новини завантажені» |
| `ItemSeparatorComponent` | Відступ між картками |
| `initialNumToRender` | `4` — перший рендер |
| `maxToRenderPerBatch` | `4` — батч при прокрутці |
| `windowSize` | `7` — вікно рендерингу |
| `removeClippedSubviews` | `true` — видалення невидимих елементів з дерева |

### SectionList (ContactsScreen)

| Параметр | Призначення |
|---|---|
| `sections` | Масив секцій: Викладачі / Одногрупники / Адміністрація |
| `renderItem` | Картка контакту з кнопками дзвінка та пошти |
| `renderSectionHeader` | Заголовок секції з іконкою та лічильником |
| `keyExtractor` | Унікальний `item.id` |
| `ItemSeparatorComponent` | Відступ між контактами |
| `stickySectionHeadersEnabled` | Заголовки прилипають при прокрутці |

### Custom Drawer Menu

- Аватар з emoji
- ПІБ та група студента
- Пункти меню: Новини / Контакти
- Підсвічування активного пункту
- Темна кольорова схема (`#0F172A`)

---

## Структура проєкту

```
lab2/
├── App.js
├── app.json
├── babel.config.js
├── package.json
└── src/
    ├── data/
    │   └── mockData.js
    ├── components/
    │   ├── CustomDrawerContent.js
    │   └── NewsCard.js
    ├── navigation/
    │   └── AppNavigator.js
    └── screens/
        ├── MainScreen.js
        ├── DetailsScreen.js
        └── ContactsScreen.js
```

---

## Залежності

```json
{
  "@react-navigation/drawer": "^6.6.15",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/native-stack": "^6.9.17",
  "react-native-gesture-handler": "~2.14.0",
  "react-native-reanimated": "~3.6.2",
  "react-native-safe-area-context": "4.8.2",
  "react-native-screens": "~3.29.0"
}
```

---

## Скріншоти
![img.png](screens%2Fimg.png)
![img_1.png](screens%2Fimg_1.png)
![img_2.png](screens%2Fimg_2.png)
![img_3.png](screens%2Fimg_3.png)
---

## Висновки (контрольні запитання)

### 1. Чим відрізняється FlatList від ScrollView?

`ScrollView` рендерить всі дочірні елементи одразу при монтуванні, що при великих списках призводить до значного споживання пам'яті та уповільнення. `FlatList` використовує віртуалізацію: рендерить лише елементи, видимі у поточному вікні перегляду, і перевикористовує їх при прокрутці. Для списків із 50+ елементами `FlatList` є обов'язковим.

### 2. Що таке віртуалізація списків?

Віртуалізація — це техніка оптимізації, за якої в дереві React Native підтримуються лише ті компоненти, що наразі видимі користувачу (плюс невеликий буфер). Елементи поза видимою зоною видаляються з пам'яті та відтворюються при поверненні у вікно прокрутки. Параметри `windowSize`, `initialNumToRender` та `maxToRenderPerBatch` дозволяють тонко налаштовувати цю поведінку.

### 3. Як здійснюється передача параметрів між екранами?

Параметри передаються другим аргументом методу `navigation.navigate()`:

```js
navigation.navigate('Details', { newsItem: item });
```

На екрані-отримувачі вони доступні через об'єкт `route.params`:

```js
const { newsItem } = route.params;
```

Для динамічного заголовка можна використати `options` у `Stack.Screen`:

```js
options={({ route }) => ({ title: route.params?.newsItem?.title })}
```

### 4. Що таке вкладена навігація?

Вкладена навігація — це ситуація, коли один навігатор є дочірнім відносно іншого. У цій роботі реалізовано:

```
DrawerNavigator
  └── NativeStackNavigator
        ├── MainScreen
        └── DetailsScreen
```

Це дозволяє поєднувати переваги різних типів навігації: бокове меню (Drawer) для глобальної навігації та стековий перехід (Stack) для деталей всередині розділу.

### 5. У яких випадках застосовується SectionList?

`SectionList` застосовується, коли дані мають природне групування: списки контактів за алфавітом, транзакції за датами, товари за категоріями. Він автоматично рендерить заголовок кожної секції (`renderSectionHeader`) і підтримує `stickySectionHeadersEnabled` — прилипання заголовків при прокрутці, що значно покращує навігацію у великих списках.