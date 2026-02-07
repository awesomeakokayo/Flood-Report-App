# 🌊 Southwest Flood Monitor

A state-of-the-art flood monitoring and reporting platform designed for Southwest Nigeria. This project leverages **AI-powered verification** to ensure reporting accuracy and provides real-time situational awareness through an interactive mobile and web ecosystem.

![React Native](https://img.shields.io/badge/React_Native-0.81.5-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-54.0-black?logo=expo)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-Verification-orange?logo=google-gemini)
![Render](https://img.shields.io/badge/Deployed-Render-46E3B7?logo=render)

---

## 🚀 Official Access

The application is deployed and accessible via the following channels:

- **Official API & Backend**: [https://flood-report-app.onrender.com](https://flood-report-app.onrender.com)
- **API Documentation**: [https://flood-report-app.onrender.com/docs](https://flood-report-app.onrender.com/docs) (Swagger UI)
- **Mobile App**: Accessible via Expo Go or local build.

---

## ✨ Features & UI Interactions

### 🔐 Secure User Authentication
- **Multi-channel Sign-up**: Register using username, email, and phone number.
- **JWT Protection**: Secure, token-based sessions for all reporting features.
- **Role-based Experience**: Tailored dashboard views based on user status.

### 📊 Intelligent Dashboard
The dashboard provides a high-level summary of regional safety:
- **Status Cards**: Visual tiles for "Active Alerts", "Flood Risk", and "Weather".
- **Interaction (Hover/Touch)**:
  - **Hover Detail**: On web/desktop views, orbiting any status card reveals specific regional metadata (e.g., specific town names or risk percentages).
  - **Dynamic Scaling**: Cards gently transition and scale up on hover to highlight the current area of focus.
  - **Visual Feedback**: Icons pulse or change color based on severity levels (Safe → Moderate → Critical).

### 🗺️ Visualization & Tracking
- **Interactive Risk Map**: Multi-layered maps showing high-risk zones in Southwest Nigeria (Lagos, Ibadan, Akure).
- **Live Incident Markers**: Real-time markers appear as soon as a report is verified. Tapping/hovering on a marker reveals incident details and severity.
- **Heatmaps**: Visual representation of flood density across the region.

### 📝 Smart Incident Reporting
- **Media-First Workflow**: Capture or upload images/videos of flood incidents.
- **Auto-Location**: Precise GPS coordinates are automatically attached to every report.
- **Real-time Broadcast**: Once submitted, notifications are pushed to all users in the vicinity.

---

## 🤖 AI Verification System (Gemini AI)

To maintain the integrity of our data, every media submission undergoes automated analysis by **Google Gemini AI**.

### How it works:
1. **Media Analysis**: The system uses `gemini-3-flash-preview` to inspect uploaded images and videos.
2. **Strict Validation Criteria**:
   - **Flood Detection**: Is there actual overflowing water, submerged streets, or properties?
   - **Authenticity Check**: Is the media real, or does it show signs of being AI-generated, staged, or reused from older events?
   - **Natural Cause**: Verifies that the flooding is environmental and not a localized leak or non-emergency event.
3. **Hard Gate (70% Confidence)**:
   - A report is only accepted if the AI returns a **confidence score of 70% or higher**.
   - If verification fails, the user is immediately notified of the reason (e.g., "Media does not depict a flood incident").

---

## 🏗️ Project Architecture

```
flood-app/
├── app/                    # FastAPI Backend
│   ├── verification.py     # Gemini AI Logic
│   ├── services/           # Notification & Firebase services
│   ├── routers/            # API Endpoints (reports, auth, users)
│   └── main.py             # Server entry point
├── src/                    # React Native Mobile (Expo)
│   ├── screens/            # UI Screens (Dashboard, Map, Report)
│   ├── services/           # API hooks (axios)
│   └── components/         # Premium UI Components
└── web_backup/             # Vite-powered Web Version
    └── src/                # Shared UI logic for web accessibility
```

---

## 🛠️ Tech Stack

- **Frontend**: React Native, Expo, React Navigation, Maps.
- **Backend**: FastAPI (Python), SQLAlchemy, SQLite.
- **AI/ML**: Google Gemini AI (Multimodal analysis).
- **Deployment**: Render (Cloud Platform).

---

## 👨‍💻 Author

Built with a commitment to public safety and regional resilience in Southwest Nigeria.
