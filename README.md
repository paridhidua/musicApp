<div align="center">

# 🎵 My Music App

A full-stack personal music streaming application built with the **PERN Stack** (PostgreSQL, Express.js, React.js, Node.js).

Upload and organize your music library, create playlists, mark favorites, browse albums, and enjoy a modern music player with full playback controls.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)

</div>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Database](#-database)
- [Screens](#-screens)
- [Learning Outcomes](#-learning-outcomes)
- [Author](#-author)
- [License](#-license)

---

## ✨ Features

### 🎶 Music Library
- Upload MP3 songs
- Upload custom cover images
- Edit song details
- Delete songs
- Search songs by title or artist

### ▶️ Music Player
- Play / Pause songs
- Previous & Next song navigation
- Auto-play next song
- Keyboard shortcuts
  | Key | Action |
  |-----|--------|
  | `Space` | Play / Pause |
  | `←` | Previous song |
  | `→` | Next song |
- Seek bar
- Volume control
- Floating music player

### ❤️ Favorites
- Add songs to Favorites
- Remove songs from Favorites
- Dedicated Favorites page

### 📀 Albums
- Songs automatically grouped by album
- Browse album collections

### 📁 Playlists
- Create playlists
- Rename playlists
- Delete playlists
- Add songs to playlists
- Browse songs inside playlists

### 🔍 Search
- Real-time search
- Search by title
- Search by artist

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React.js, React Router DOM, Axios, CSS |
| **Backend** | Node.js, Express.js, Multer (file uploads) |
| **Database** | PostgreSQL |

---

## 📂 Project Structure

```
music-app/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── uploads/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/music-app.git
cd music-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=music_app
DB_PORT=5432
```

Run the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The app should now be running locally — backend on `http://localhost:5000` and frontend on the port shown by Vite (typically `http://localhost:5173`).

---

## 🗄 Database

The application uses **PostgreSQL** with the following main tables:

| Table | Purpose |
|-------|---------|
| `songs` | Stores song metadata, file paths, and cover art |
| `playlists` | Stores user-created playlists |
| `playlist_songs` | Junction table linking songs to playlists |
| `favorites` | Stores favorited songs |

---

## 📸 Screens

- Home Page
- Upload Song
- Albums
- Playlists
- Favorites
- Floating Music Player



## 🎯 Learning Outcomes

Buildience with:

- React Hooks
- React Context API
- React Router
- REST APIs
- Express.js
- PostgreSQL
- CRUD operations
- File uploads
- State management
- Media playback
- Full-stack development

---

## 👨‍💻 Author

- [Paridhi Dua](https://www.linkedin.com/in/paridhidua/)


---

## 📄 License

This project is developed for educational and portfolio purposes.