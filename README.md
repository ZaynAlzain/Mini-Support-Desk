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

---

## Design Notes

### Backend Architecture
The backend is built with Flask and follows a RESTful API that matches the provided API contract. Tickets and comments are exposed through clear, resource-based routes, while filtering, sorting, and pagination are handled on the server to keep the frontend simple.

SQLAlchemy is used for database access, and Flask-Migrate makes it easy to update the database schema without losing data. Search and filter options like q, status, priority, and overdue are processed on the backend so all business logic stays centralized and easy to scale.

### Frontend Architecture
The frontend is implemented using React and emphasizes separation of concerns and code reusability. The core logic of data fetching and stateful operations, such as tickets, sorting mode, debouncing, click outside, and auto focus, is encapsulated in custom React hooks. This maintains clean, easy-to-maintain, and highly reusable code.

For the ticket list, a table layout is used to nicely separate title, status, priority, creation date, and actions. UI-related states, such as filters, sorting, pagination, and modal, are persisted during user interaction to prevent unnecessary resets.

### State Management and UX Decisions
Filtering, sorting, pagination, and overdue tickets are handled by passing query parameters between the frontend and backend. When a ticket is deleted, the list updates instantly without refreshing the page, while keeping the current filters and page. A custom confirmation modal is used instead of the browser’s default alert to provide a more consistent user interface.

Search input is delayed slightly to reduce unnecessary API requests. Input focus is preserved during loading to avoid interrupting typing. Filters and controls are kept simple to make the interface easy to use and understand.

### Trade-offs and Future Improvements
No external state management libraries were used to keep the project simple and appropriate for its size. Testing was kept minimal due to time constraints, but the backend structure allows tests to be added easily later.

Possible future improvements include user authentication, better comment features, bulk actions on tickets, and expanded test coverage.


