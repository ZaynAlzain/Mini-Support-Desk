# Mini Support Desk

A full-stack support ticketing system built with Flask and React.

---

## Features
- Create, edit, and delete tickets
- Search, filter, and sort tickets
- Add comments to tickets
- Overdue ticket detection 
- Server-side pagination

---

## Tech Stack

### Frontend
- React
- React Router
- Custom hooks

### Backend
- Flask
- SQLAlchemy
- Flask-Migrate
- SQLite

---

## Prerequisites

Make sure you have the following installed:

### Required
- **Python** 3.10+
- **Node.js** 18+
- **npm**
- **Git**

### Optional
- Python virtual environment (`venv`)
- SQLite browser (for database inspection)

Check versions:
```bash
python --version
node --version
npm --version
```

## Installation & Setup

Follow these steps to run the project locally.

---

### Step 1: Clone the repository

```bash
git clone https://github.com/ZaynAlzain/Mini-Support-Desk.git
cd Mini-Support-Desk
```
---

### Step 2: Create and activate a virtual environment

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

Windows:
```bash
venv\Scripts\activate
```
macOS / Linux:
```basا
source venv/bin/activate
```

---

### Step 3: Install backend dependencies

```bash
pip install -r requirements.txt
```

---

### Step 4: Initialize the database

```bash
flask db upgrade
```

---

### Step 5: Seed the database

```bash
python seed.py
```

---

### Step 6: Run the backend server
```bash
python app.py
```

Backend will run at:
http://127.0.0.1:5000

---

### Step 7: Install frontend dependencies

Open a new terminal:
```bash
cd frontend
npm install
```

---

### Step 8: Run the frontend server

```bash
npm start
```

Frontend will run at:
http://localhost:3000

