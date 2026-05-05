# Лабораторна робота №6 — Firebase Authentication & Firestore у React Native

**Тема:** Побудова авторизації та збереження персональних даних у React Native з використанням Firebase Authentication та Firestore.

---

## Інструкція запуску

### Вимоги

- Node.js v18+
- Обліковий запис [Firebase](https://console.firebase.google.com/)
- Expo Go на телефоні

### Встановлення

```bash
git clone
cd lab6
npm install
```

### Налаштування Firebase

1. Створіть проєкт на [Firebase Console](https://console.firebase.google.com/)
2. У розділі **Authentication** увімкніть провайдер Email/Password
3. У розділі **Firestore Database** створіть базу даних (Production mode, регіон `europe-west`)
4. У **Project Settings → General → Your apps** зареєструйте Web-додаток та скопіюйте `firebaseConfig`
5. Вставте конфіг у `config/firebase.js`:

```js
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123",
};
```

6. Застосуйте Firestore Security Rules через Firebase Console (Firestore → Rules) або CLI:

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

### Запуск

```bash
npx expo start
```

---

## Реалізований функціонал

### Авторизація

| Функція | Реалізація |
|---|---|
| Реєстрація | `createUserWithEmailAndPassword` |
| Вхід | `signInWithEmailAndPassword` |
| Вихід | `signOut` з підтвердженням у Alert |
| Відновлення паролю | `sendPasswordResetEmail` |

### Профіль користувача

Дані (ім'я, вік, місто) зберігаються у Firestore у колекції `users`, документ з ID = `uid`:

```
users/
└── {uid}/
    ├── name: "Іван Іванов"
    ├── age: "22"
    ├── city: "Київ"
    ├── createdAt: Timestamp
    └── updatedAt: Timestamp
```

### Видалення акаунту

1. Користувач натискає «Видалити акаунт»
2. Відкривається модальне вікно з попередженням
3. Вводиться пароль для повторної автентифікації (`reauthenticateWithCredential`)
4. Видаляється документ з Firestore та обліковий запис Firebase Auth

### Захист маршрутів

Захист реалізований на двох рівнях. На клієнті всі операції прив'язані до `auth.currentUser.uid`, а `_layout.jsx` кожної групи виконує `<Redirect>` залежно від стану авторизації. На сервері Firestore Rules перевіряють `request.auth.uid == userId` для кожного запиту.

### AuthContext

| Метод | Опис |
|---|---|
| `register(email, password)` | Реєстрація + створення Firestore документа |
| `login(email, password)` | Вхід |
| `logout()` | Вихід |
| `resetPassword(email)` | Відновлення паролю |
| `getUserProfile()` | Читання профілю з Firestore |
| `saveUserProfile(data)` | Запис/оновлення профілю |
| `deleteAccount(password)` | Reauthenticate + Delete user + Delete doc |

`onAuthStateChanged` автоматично відстежує зміни стану. Сесія зберігається між перезапусками через `AsyncStorage`.

---

## Структура проєкту

```
lab6/
├── app/
│   ├── _layout.jsx
│   ├── index.jsx
│   ├── (auth)/
│   │   ├── _layout.jsx
│   │   ├── login.jsx
│   │   ├── register.jsx
│   │   └── forgot-password.jsx
│   └── (app)/
│       ├── _layout.jsx
│       └── profile.jsx
├── config/
│   └── firebase.js
├── context/
│   └── AuthContext.jsx
├── firestore.rules
├── firebase.json
├── app.json
├── babel.config.js
└── package.json
```

---

## Firestore Security Rules

```js
rules_version = '2';
service cloud.firestore {
    match /databases/{database}/documents {
    match /users/{userId} {
        allow read: if request.auth != null && request.auth.uid == userId;

        allow create, update: if request.auth != null
            && request.auth.uid == userId
            && request.resource.data.keys().hasOnly(['name', 'age', 'city', 'email', 'createdAt', 'updatedAt'])
            && (request.resource.data.name is string)
    && (request.resource.data.city is string);

        allow delete: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} {
        allow read, write: if false;
    }
}
}
```

---

## Скріншоти
![img.png](screens%2Fimg.png)
![img_1.png](screens%2Fimg_1.png)
![img_2.png](screens%2Fimg_2.png)
---

## Висновки

У ході виконання роботи реалізовано повний цикл автентифікації через Firebase Authentication та збереження персональних даних у Cloud Firestore. Налаштовано серверні Firestore Security Rules, що гарантують ізоляцію даних між користувачами. Реалізовано захист маршрутів через групи `(auth)` та `(app)` з Expo Router, централізоване керування станом через AuthContext та обробку помилок з локалізованими повідомленнями.