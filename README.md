# 📝 Basic Note App

A minimalist, glass-themed note-taking application built with Node.js, Express, and React. It supports both command-line and web interfaces for managing notes with features like tagging, pinning, editing, and date formatting.

---

## 🚀 Features

- ✅ Add, delete, list, and search notes via CLI
- ✅ Modern React frontend with glassmorphism design
- ✅ Express.js backend API
- ✅ Tagging and pinning support
- ✅ ISO date formatting to `DD-MM-YYYY`
- ✅ Modular and extensible architecture

---

## 📦 Installation

bash
git clone https://github.com/viranora/basic-note-app.git

cd basic-note-app

npm install

## React frontend setup:

cd frontend
npm install
npm start

## Express backend setup:

cd ..
node server.js

## CLI Usage

node app.js ekle "Title" "Content" [Tag]
node app.js listele [Tag]
node app.js sil <id>
node app.js sabitle <id>
node app.js ara <keyword>

## Web Interface
Add and view notes
Edit and delete notes
Tag and display creation date
Responsive, glass-themed UI

## Project Structure

basic-note-app/
├── app.js           # CLI command handler
├── notes.js         # Note operations module
├── notes.json       # Data store
├── server.js        # Express API
└── frontend/        # React interface

by nora...
