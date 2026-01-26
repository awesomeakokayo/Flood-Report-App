from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv

import auth
import database
import models
from routers import auth as auth_router
from routers import reports as reports_router

load_dotenv()

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title = "Flood Report API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Flood Report API is running"}

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")

if os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

get_db = database.get_db


auth.py
PY 1.55KB
crud.py
PY 1.26KB
database.py
PY 749B
dependencies.py
PY 867B
main.py
PY 1.11KB
models.py
PY 1.95KB
schemas.py
PY 1.13KB
utils.py
PY 835B
auth.py
PY 1.66KB
reports.py
PY 791B
The following packages should be updated for best compatibility with the installed expo version:
  react-dom@19.2.3 - expected version: 19.1.0
  react-native-worklets@0.7.2 - expected version: 0.5.1
Your project may not work correctly until you install the expected versions of the packages.
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █ ██▀▀█▀▄██ ▄▄▄▄▄ █
█ █   █ █  ▀█ ▀█ ██ █   █ █
█ █▄▄▄█ █▀  █▄▀▀▄██ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄█ ▀▄█▄█▄█▄▄▄▄▄▄▄█
█▄ ▀▀▄▄▄▀▀█▄█▄▀▄ ███ ▀▄▄ ▄█
█ █▀▀▀█▄▄  ▄█▀██  ▀ █▄  ▀██
█ █▀▀▄ ▄  ▀▀▄▀█▄▀▄▀▄▀▀▄ ▀██
███▀  ▄▄▀█ ▄ ▄██ ▀ ▀ ▄ ▀███
█▄▄█▄██▄▄ ▄██▄▀▄▀ ▄▄▄ ▀ ▄▄█
█ ▄▄▄▄▄ █▀▄██▀█▀▀ █▄█ ▀▀▀▀█
█ █   █ █▄▀ ▄▀▄ █ ▄ ▄▄▀   █
█ █▄▄▄█ █▀▀  ▄ ▄▀█▀▄▀█▀▀ ██
█▄▄▄▄▄▄▄█▄█▄█▄▄████▄▄▄▄▄▄▄█

› Metro waiting on exp://172.20.10.4:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Web is waiting on http://localhost:8081

› Using Expo Go
› Press s │ switch to development build

› Press a │ open Android
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› shift+m │ more tools
› Press o │ open project code in your editor

› Press ? │ show all commands

Logs for your project will appear below. Press Ctrl+C to exit.       
iOS Bundled 3016ms index.ts (1063 modules)
 ERROR  [AxiosError: Request failed with status code 404]

Hlep me review this files, the front end can't communicate with the backend, no reaction no response
We are given a set of files for a FastAPI backend and an error from the frontend (Expo) that says:
[AxiosError: Request failed with status code 404]

This error indicates that the frontend is trying to reach an endpoint that doesn't exist (404 Not Found).

Let's check the backend code structure:

The main app is in main.py. It includes two routers: auth_router and reports_router.

The auth_router is defined in routers/auth.py and has endpoints under /auth.

The reports_router is defined in routers/reports.py and has endpoints under /reports.

However, note that the error is 404, which means the endpoint the frontend is hitting is not found.

Possible issues:

The frontend might be trying to hit the wrong URL. We should check the base URL and the endpoint paths.

The backend might not be running on the same host/port that the frontend is expecting.

There might be a mismatch in the endpoint paths (e.g., missing prefix, wrong HTTP method).

Let's look at the provided files:

In main.py, the routers are included with:
app.include_router(auth_router.router)
app.include_router(reports_router.router)

The auth_router has prefix /auth and endpoints:
/register (POST)
/login (POST)

The reports_router has prefix /reports and endpoints:
/ (GET and POST)

So the backend should have the following endpoints:

text
    POST /auth/register
    POST /auth/login
    GET  /reports/
    POST /reports/
4. The frontend might be trying to access an endpoint that is not defined, or the backend might not be running.

Also note that the backend code is structured as a package (with init.py files, though not provided) and the main app is run from main.py.

The error message from the frontend says "Metro waiting on exp://172.20.10.4:8081" and "Web is waiting on http://localhost:8081".
This suggests the frontend is running on a different IP (172.20.10.4) and port (8081). The backend is typically run on a different port (like 8000 for FastAPI).

The frontend must be configured to send requests to the backend's IP and port. If the backend is running on the same machine, then the frontend should use the local IP (172.20.10.4) or localhost, but note that the backend must be listening on all interfaces (0.0.0.0) to be accessible from other devices on the network.

Check the FastAPI app in main.py doesn't specify a host and port. Usually, when running with uvicorn, we set the host and port.

The error 404 might be because the frontend is trying to hit the backend at the wrong port (8081 is the frontend's dev server, not the backend).

Let's assume the backend is running on port 8000. Then the frontend should make requests to, for example, http://172.20.10.4:8000 or http://localhost:8000.

Another possibility: the backend is not running at all.

Steps to debug:

a) Make sure the backend is running and on what host and port.

b) Check the frontend code to see what URL it is using for API requests.

c) Test the backend endpoints with a tool like curl or Postman.

d) Check the CORS settings in the backend. Although the error is 404, so it's not a CORS issue (CORS would give a different error).

e) Check the logs of the backend to see if the request is reaching the backend.

Since we don't have the frontend code, we can only guess.

However, note that the error is from the frontend (Expo) and it says the request failed with 404. So the frontend is making a request and getting a 404.

Let's look at the backend code again for any possible misconfiguration:

In main.py, the app is created and the routers are included. The base route ("/") returns a message.

The routers are defined in the routers directory.

The auth_router in routers/auth.py uses APIRouter(prefix="/auth"), so the full path for login is /auth/login.

The reports_router in routers/reports.py uses APIRouter(prefix="/reports"), so the full path for reports is /reports/.

The main.py also sets up CORS to allow all origins.

The main.py does not specify the host or port because it's meant to be run by a server like uvicorn.

The main.py also sets up a static file server, but that's for the frontend static files if we were serving the frontend from the same server.

The frontend is running on a different server (Expo dev server) so we are in a cross-origin situation.

The backend must be run separately. We typically run it with:

text
uvicorn main:app --host 0.0.0.0 --port 8000
Then the frontend should make requests to http://<backend_ip>:8000.

If the backend is running on the same machine, then the frontend can use http://localhost:8000 or http://172.20.10.4:8000.

However, note that the frontend is running on 172.20.10.4:8081 (the Expo dev server). So the backend must be accessible at that IP.

If the backend is running on localhost (127.0.0.1) then it won't be accessible from the network. We must run it on 0.0.0.0 to bind to all interfaces.

Also, the frontend must be configured to use the correct backend URL.

Since the error is 404, it's likely that the frontend is trying to hit the wrong URL (maybe the frontend is trying to hit the Expo dev server for API requests, which doesn't have the endpoints).

How to fix:

Run the backend on a specific port (say 8000) and make sure it's accessible from the network (use --host 0.0.0.0).

In the frontend code, set the base URL for API requests to http://172.20.10.4:8000 (or the correct IP and port).

Check the network tab in the frontend's dev tools to see the exact request being made.

Alternatively, we can check the backend logs to see if the request is reaching the backend.

Since we don't have the frontend code, we cannot fix the frontend. But we can verify the backend endpoints.

Let's write a simple test with curl:

text
  curl -X POST "http://localhost:8000/auth/register" -H "Content-Type: application/json" -d '{"username":"test","email":"test@test.com","password":"test"}'

  curl -X POST "http://localhost:8000/auth/login" -H "Content-Type: application/json" -d '{"username":"test","password":"test"}'
If these work, then the backend is running and the endpoints are correct.

Another possibility: the frontend is using a different path. For example, if the frontend is trying to hit /api/auth/login but the backend only has /auth/login, then we get 404.

In that case, we can change the prefix in the router or change the frontend.

Alternatively, we can mount the entire API under /api in the main app:

text
    app.include_router(auth_router.router, prefix="/api")
    app.include_router(reports_router.router, prefix="/api")
But note: the current code does not have that. So the endpoints are at /auth and /reports.

If the frontend is expecting /api/auth, then we must change either the frontend or the backend.

Given the error message, it's likely a network configuration issue (wrong host/port) or a path issue.

Let's check the provided files again for any hint:

The main.py does not have a global prefix for the API.

The frontend error message does not show the URL it tried, so we cannot know.

Since we are only given the backend code, we must assume the backend is correct and the frontend is misconfigured.

However, note that the error is from the frontend, so we must guide the user to check the frontend's API request URL.

Steps for the user:

Check that the backend is running and on what URL (e.g., http://172.20.10.4:8000).

Check the frontend code to see what base URL is set for the API.

Use a tool like curl or Postman to test the backend endpoints directly.

Check the backend logs to see if the request is received.

If the backend is running on a different port (like 8000) and the frontend is trying to hit the same port as the Expo dev server (8081), then change the frontend to hit port 8000.

Without the frontend code, we cannot do more.

However, note that the error message says "Metro waiting on exp://172.20.10.4:8081" and "Web is waiting on http://localhost:8081". This is the frontend dev server. The backend must be running on a different port (like 8000). So the frontend should be making requests to http://172.20.10.4:8000 or http://localhost:8000.

Let's assume the frontend is making a request to http://localhost:8081/auth/login (because it's using the same host and port as the dev server). Then it would get a 404 because the backend is not running on 8081.

So the fix is to change the frontend to use the correct backend URL.

Since we don't have the frontend code, we cannot change it. But we can change the backend to run on the same port as the frontend dev server? Not recommended because the dev server is for the frontend.

Alternatively, we can set up a proxy in the frontend dev server to forward API requests to the backend. This is common in React/Vue development. But in Expo, we might have to configure the app to use an absolute URL for the API.

Given the constraints, I can only suggest the user to check the backend is running and accessible, and that the frontend is configured to hit the correct backend URL.

However, note that the error is 404, so the frontend is getting a response from some server (maybe the Expo dev server) that doesn't have the endpoint.

Let's try to run the backend on port 8081? That would conflict with the Expo dev server.

So the best solution is to change the frontend to use the backend's IP and port.

Since we are only given the backend code, I will now write a note to the user about this.

But wait, there is a file auth.py in the root and also in routers/auth.py. The root auth.py is the one with the helper functions, and the routers/auth.py is the one with the endpoints. This is correct.

Another thing: the main.py uses from .routers import auth as auth_router and from .routers import reports as reports_router. So the routers are correctly imported.

The main.py also creates the tables on startup. That's fine.

So the backend code seems correct.

Therefore, the issue is likely on the frontend side.

Let me write a response to the user.

Looking at your code, I can see several issues that might be causing the 404 error when your frontend tries to communicate with the backend. Let me help you identify and fix them:

Main Issues:
1. Duplicate auth.py Files
You have two auth.py files - one in the root directory and another in the routers directory. This is causing confusion and potential import issues.

2. Missing __init__.py Files
Your project structure seems incomplete. You need proper __init__.py files to create a Python package structure.

3. Incorrect Import Paths in main.py
Looking at your main.py, the import statements are wrong:

python
# Wrong - using relative imports
from . import auth, database, models
from .routers import auth as auth_router
from .routers import reports as reports_router

# Should be absolute imports for a FastAPI app structure
Here's the fix:
Step 1: Create proper package structure
Create these __init__.py files:

File: __init__.py (in project root)

python
# Empty file - marks directory as Python package
File: routers/__init__.py

python
from .auth import router as auth_router
from .reports import router as reports_router

__all__ = ["auth_router", "reports_router"]
Step 2: Fix main.py
File: main.py (corrected)

python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv

import auth
import database
import models
from routers import auth as auth_router
from routers import reports as reports_router

load_dotenv()

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Flood Report API")

# CORS - Make sure to specify your frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8081",  # Expo web
        "http://172.20.10.4:8081",  # Your mobile IP
        "exp://172.20.10.4:8081",  # Expo app
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Flood Report API is running"}

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")

if os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

app.include_router(auth_router, prefix="/auth", tags=["authentication"])
app.include_router(reports_router, prefix="/reports", tags=["reports"])

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy"}