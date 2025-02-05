# 🦉 Owly

## 🌟 Project Overview

**Owly** is an interactive web-based learning platform that offers a seamless user experience with real-time features and a modern UI. Built with **React, Firebase, and TailwindCSS**, Owly enables users to engage in a dynamic learning environment.

🔗 **Live Project:** [Owly](https://owly-5ea53.web.app/)

### 🚀 Technologies Used

- **Frontend:** React, React Router, Vite
- **State Management & API Handling:** Axios
- **UI & Styling:** TailwindCSS, Radix UI, Lucide React
- **Animations & UX Enhancements:** Framer Motion, Lottie React
- **Authentication & Database:** Firebase
- **Notifications & Tooltips:** Radix UI (Toast & Tooltip)

### ✨ Core Features

✅ **User Authentication** - Secure login with Firebase  
✅ **Interactive Animations** - Smooth UX with Framer Motion & Lottie React  
✅ **Modern & Responsive UI** - Styled with TailwindCSS & Radix UI  
✅ **Real-time Data Management** - Firebase Firestore for instant updates  
✅ **Efficient API Handling** - Axios for fast API requests  
✅ **Tooltips & Notifications** - Enhanced user experience with Radix UI

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add the following:

```sh
# Firebase Configuration
VITE_apiKey=your_firebase_api_key_here
VITE_authDomain=your_firebase_project_authDomain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
```

> ⚠️ **Important:** Never commit `.env.local` to version control. Add it to `.gitignore`.

### 📦 Dependencies

### **Main Dependencies**

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router": "^7.1.1",
  "firebase": "^11.1.0",
  "axios": "^1.7.9",
  "framer-motion": "^11.15.0",
  "lottie-react": "^2.4.0",
  "lucide-react": "^0.469.0",
  "tailwindcss": "^3.4.17",
  "vite": "^6.0.5"
}
```

### **Development Dependencies**

```json
{
  "@eslint/js": "^9.17.0",
  "@vitejs/plugin-react": "^4.3.4",
  "eslint": "^9.17.0",
  "eslint-plugin-react": "^7.37.2",
  "postcss": "^8.4.49"
}
```

### 🛠️ Installation & Setup

Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/parthosarothi46/Owly-Client.git
cd Owly-Client
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Create an `.env.local` File

```sh
touch .env.local
```

Copy the environment variables from the **🔑 Environment Variables** section above into this file.

### 4️⃣ Start the Development Server

```sh
npm run dev
```

By default, the project runs on `http://localhost:5173/`.

### 5️⃣ Build for Production

```sh
npm run build
```

### 6️⃣ Lint the Code

```sh
npm run lint
```

### 🤝 Contribution Guidelines

Contributions are welcome! Follow these steps to contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature-branch`)
3. **Commit changes** (`git commit -m "Added new feature"`)
4. **Push to your fork** (`git push origin feature-branch`)
5. **Open a Pull Request**

---
