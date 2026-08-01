# Flood Report API - Southwest Flood Monitor

A flood monitoring and reporting platform for Southwest Nigeria. It combines a **FastAPI backend** with AI-powered media verification, real-time flood incident reporting, live mapping, and push notifications, plus a **React Native (Expo)** mobile app.

This repository contains the backend (this directory) and the mobile app frontend (`src/`).

---

## Features

- **Secure authentication** - JWT-based login/registration (username, email, phone number).
- **AI-verified reporting** - Upload photos/videos of flood incidents; Google Gemini AI verifies the media actually depicts real flooding before the report is accepted (70% confidence hard gate).
- **Live flood map** - Interactive map (Google Maps on Android, Apple Maps on iOS) with severity-colored incident markers.
- **Flood risk zones** - Visual high/medium/low risk areas for the region.
- **Real-time alerts** - Flood alert notifications broadcast to all registered devices via Firebase Cloud Messaging.
- **REST API** - Clean, documented endpoints served with Swagger UI at `/docs`.

---

## Tech Stack

| Layer      | Technology |
| ---------- | ---------- |
| Backend    | Python, FastAPI, SQLAlchemy, PostgreSQL (Neon), psycopg2 |
| AI         | Google Gemini (`gemini-3-flash-preview` multimodal) |
| Notifications | Firebase Admin SDK / FCM |
| Frontend   | React Native, Expo 54, React Navigation, `react-native-maps` |
| Deployment | Render (API), EAS (mobile build) |

---

## Repository Layout

```
Flood-Report-App/
├── app/                       # FastAPI backend package
│   ├── main.py                # App entry point, routes, CORS
│   ├── database.py            # SQLAlchemy engine / session
│   ├── models.py              # SQLAlchemy models (User, FloodReport, DeviceToken)
│   ├── schemas.py             # Pydantic schemas
│   ├── crud.py                # Database operations
│   ├── auth.py                # Password hashing + JWT
│   ├── dependencies.py        # Auth dependency (get_current_user)
│   ├── verification.py        # Gemini AI media verification
│   ├── firebase.py            # Firebase Admin initialization
│   ├── routers/
│   │   ├── auth.py            # /auth/register, /auth/login
│   │   ├── reports.py         # /reports/ (list, create)
│   │   └── notifications.py   # /notifications/register-token
│   ├── services/
│   │   └── notification.py    # FCM broadcast helper
│   └── wsgi.py                # Uvicorn entry point
├── src/                       # React Native mobile app (Expo)
│   ├── screens/               # Login, Dashboard, Map, Report, Alerts, Safety Tips
│   ├── navigation/            # Bottom tabs + stack navigator
│   ├── services/api.ts        # Axios API client
│   └── data/                  # Mock data
├── requirements.txt           # Python dependencies
├── setup.py
└── Procfile                   # Render start command
```

---

## Backend Setup (Local Development)

### 1. Requirements

- Python 3.10+
- A PostgreSQL database (e.g., Neon) - or run the app with `DATABASE_URL` pointing at any Postgres instance.

### 2. Install

```bash
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate    # macOS / Linux

pip install -r requirements.txt
```

### 3. Configure environment

Copy the sample env file and fill in real values:

```bash
cp .env.example .env
```

Required variables:

| Variable                  | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| `DATABASE_URL`            | PostgreSQL connection string (e.g. `postgresql://user:pass@host/db?sslmode=require`) |
| `GEMINI_API_KEY`          | Google AI Studio / Vertex API key used for media verification |

Optional:

| Variable                          | Description                                              |
| --------------------------------- | -------------------------------------------------------- |
| `FIREBASE_SERVICE_ACCOUNT`        | Firebase service account JSON (single-line). The app also reads `app/firebase_service.json` if present. |

### 4. Run the server

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

- Interactive API docs: <http://localhost:8000/docs>
- Health check: <http://localhost:8000/health>

> The `.env` file is intentionally gitignored. Never commit secrets.

---

## API Endpoints

| Method | Path                          | Auth   | Description                                   |
| ------ | ----------------------------- | ------ | --------------------------------------------- |
| GET    | `/`                           | -      | Service status                                |
| GET    | `/health`                     | -      | Health check                                  |
| POST   | `/auth/register`              | -      | Register a user (JSON)                        |
| POST   | `/auth/login`                 | -      | Login, returns JWT (form: `username`, `password`) |
| GET    | `/reports/`                   | -      | List flood reports (used by the map)          |
| POST   | `/reports/`                   | Bearer | Create a report (multipart + image/video)     |
| POST   | `/notifications/register-token` | -    | Register an FCM device token                  |

### Creating a report

`POST /reports/` accepts `multipart/form-data` with:

- `location` (string), `latitude` (float), `longitude` (float)
- `severity` (`low` / `moderate` / `severe` / `critical`)
- `water_level` (string)
- `description` (optional string)
- `image` (optional file: `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/heic`, ...)

A valid `Authorization: Bearer <token>` header is required. The image is sent to Gemini AI for verification; if it does not pass (real flood, confidence >= 70), the request is rejected with `400`.

---

## AI Media Verification

When a report includes an image/video, `app/verification.py` sends it to the Gemini API with the model `gemini-3-flash-preview` and asks:

1. Does the media depict real flooding?
2. Is the flooding caused by natural/environmental factors?
3. Is the media staged, reused, edited, or AI-generated?
4. What is the confidence score (0-100)?

A report is accepted only when `is_flood == true`, `is_real == true`, and `confidence >= 70`. Otherwise the user receives the AI's reason.

---

## Frontend Setup (Mobile App)

The React Native app lives in `src/`. Prerequisites: Node 18+, Expo CLI.

```bash
npm install
npx expo run:android   # or: npx expo start
```

The app reads the backend base URL from `src/services/api.ts` (defaults to `https://flood-report-app.onrender.com`).

### Google Maps

The Android map requires a Google Maps API key:

1. Enable **Maps SDK for Android** and **Billing** in Google Cloud Console.
2. Create an API key and set it in `.env`:

```
GOOGLE_MAPS_API_KEY=your-key-here
```

3. Rebuild: `npx expo run:android`

The key is injected into the native Android manifest via `app.config.js` during prebuild. iOS uses Apple Maps by default (no key required); set `GOOGLE_MAPS_IOS_API_KEY` to use Google Maps on iOS.

---

## Deployment (Render)

The API is designed to run on Render (free tier compatible). A `Procfile` and `runtime.txt` are included.

1. Connect the GitHub repository to a Render **Web Service**.
2. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT` (from the `Procfile`).
3. Set environment variables in the Render dashboard: `DATABASE_URL`, `GEMINI_API_KEY`.
4. Deploy. The tables are created automatically on startup.

> After rotating your database password, update `DATABASE_URL` in the Render dashboard (and in `.env` locally) and redeploy.

---

## Notes

- Passwords are hashed with bcrypt; sessions use JWT (HS256).
- Static uploads (report images) are stored under `app/static/uploads`.
- Firebase push notifications are enabled only when a valid service account is configured.
