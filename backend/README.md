# Expense Tracker Backend - Deployment Guide

This backend is designed to be deployed on **Render.com**.

## Deployment Steps

1. **Connect to Render**:
   - Go to [render.com](https://render.com) and create a **New Web Service**.
   - Link your GitHub repository.

2. **Configure Settings**:
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`

3. **Set Environment Variables**:
   Under the **Environment** tab on Render, add these:
   - `FIREBASE_SERVICE_ACCOUNT`: (Paste the entire content of your `serviceAccountKey.json` here)
   - `PYTHON_VERSION`: `3.10`

## Local Development

1. Create a virtual environment: `python -m venv venv`
2. Activate it: `.\venv\Scripts\activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Run the app: `python app.py`

*Note: Ensure `serviceAccountKey.json` is present in the `backend/` directory for local development.*
