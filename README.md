# 🌊 Southwest Flood Monitor

A comprehensive flood monitoring and reporting mobile application for Southwest Nigeria, built with **React Native** (Expo) and **FastAPI**.

![React Native](https://img.shields.io/badge/React_Native-0.81.5-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-54.0-black?logo=expo)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)
![SQLite](https://img.shields.io/badge/SQLite-Database-blue?logo=sqlite)

---

## 📱 Features

### User Authentication
- **Login** with username and password
- **Sign up** with username, email, phone number, and password
- JWT-based secure authentication

### Flood Monitoring
- **Dashboard** – Real-time overview of flood conditions
- **Flood Risk Map** – Interactive map showing risk zones (High, Medium, Low)
- **Live Flood Map** – Real-time flood incident markers
- **Flood Alerts** – Push notifications and alerts for your area

### Incident Reporting
- **Report Incidents** – Submit flood reports with location
- **Location Services** – Automatic GPS coordinates capture
- **Real-time Updates** – Incidents appear on the live map

### Safety Resources
- **Safety Tips** – Guidelines for flood preparedness and response

---

## 🏗️ Project Structure

```
flood-app/
├── app/                    # FastAPI Backend
│   ├── main.py             # Application entry point
│   ├── auth.py             # Authentication logic
│   ├── crud.py             # Database CRUD operations
│   ├── database.py         # Database configuration
│   ├── models.py           # SQLAlchemy models
│   ├── schemas.py          # Pydantic schemas
│   └── routers/            # API route handlers
│       ├── auth.py         # Auth endpoints
│       └── reports.py      # Report endpoints
├── src/                    # React Native Frontend
│   ├── screens/            # App screens
│   │   ├── DashboardScreen.tsx
│   │   ├── FloodAlertsScreen.tsx
│   │   ├── FloodRiskMapScreen.tsx
│   │   ├── LiveFloodMapScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── ReportIncidentScreen.tsx
│   │   ├── SafetyTipsScreen.tsx
│   │   └── SignupScreen.tsx
│   ├── components/         # Reusable components
│   ├── data/               # Mock data
│   ├── navigation/         # Navigation config
│   ├── services/           # API services
│   └── types/              # TypeScript types
├── assets/                 # Images and icons
├── package.json            # Frontend dependencies
└── requirements.txt        # Backend dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **Python** (3.9 or later)
- **Expo CLI** (`npm install -g expo-cli`)

---

### Frontend Setup (React Native)

1. **Navigate to the project directory:**
   ```bash
   cd flood-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Google Maps API Keys:**
   
   Edit `app.json` and replace the placeholder API keys:
   ```json
   "ios": {
     "config": {
       "googleMapsApiKey": "YOUR_IOS_API_KEY_HERE"
     }
   },
   "android": {
     "config": {
       "googleMaps": {
         "apiKey": "YOUR_ANDROID_API_KEY_HERE"
       }
     }
   }
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Run on your device:**
   - Press `a` for Android Emulator
   - Press `i` for iOS Simulator
   - Scan QR code with Expo Go app on your phone

---

### Backend Setup (FastAPI)

1. **Navigate to the app directory:**
   ```bash
   cd flood-app
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create a `.env` file with your secret key:**
   ```env
   SECRET_KEY=your-super-secret-key-here
   ```

5. **Run the backend server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Access API documentation:**
   - Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
   - ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 📡 API Endpoints

| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| POST   | `/auth/register`        | Register a new user        |
| POST   | `/auth/login`           | Login and get JWT token    |
| GET    | `/reports/`             | Get all flood reports      |
| POST   | `/reports/`             | Submit a flood report      |
| GET    | `/reports/{id}`         | Get a specific report      |

---

## 🛠️ Tech Stack

### Frontend
- **React Native** – Cross-platform mobile framework
- **Expo** – Development and build tooling
- **React Navigation** – Tab and stack navigation
- **React Native Maps** – Interactive map integration
- **Axios** – HTTP client for API calls
- **TypeScript** – Type-safe JavaScript

### Backend
- **FastAPI** – Modern Python web framework
- **SQLAlchemy** – ORM for database operations
- **SQLite** – Lightweight database
- **JWT (python-jose)** – Token-based authentication
- **Passlib** – Password hashing with bcrypt

---

## 🗺️ Map Regions

The app focuses on Southwest Nigeria flood monitoring, covering:

| City   | Coordinates              | Risk Level  |
|--------|--------------------------|-------------|
| Lagos  | 6.5244°N, 3.3792°E       | High        |
| Ibadan | 7.3775°N, 3.9470°E       | Medium      |
| Akure  | 7.2571°N, 5.2058°E       | Low         |

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Author

Built with ❤️ for Southwest Nigeria flood safety and awareness.
