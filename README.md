# scholarshhield_AI
# 🎓 ScholarShield AI

ScholarShield AI is an intelligent academic productivity platform built with Django and modern JavaScript.  
It combines AI-powered study tools, task prioritization, secure note management, and cybersecurity scanning into a unified dashboard experience.

This project was developed as a final year Computer Science project developed by success.

---

## 🚀 Features

### 🤖 AI Assistance
- Real-time conversational AI assistant
- Academic-focused responses
- Session-based chat history
- Copy & speech synthesis support

### 📝 AI Summarizer
- Summarize raw text or uploaded documents (PDF, DOCX, TXT)
- Bullet, paragraph, or mixed format output
- Custom AI instruction support
- Download summary as `.docx`

### 📚 Smart Notes System
- Upload or paste notes
- AI-generated topics and tags
- Markdown-rendered summaries
- Live search (by topic, tags, or filename)
- Share notes via email
- Download notes
- Context-based actions (Summarize / Generate Quiz)

### 🧠 AI Quiz Generator
- Automatically generate MCQs from notes
- Dynamic quiz UI
- Real-time scoring
- Immediate feedback

### 📅 AI Task Planner
- AI-prioritized academic tasks
- Focus scoring system
- Critical hotzone section
- Resolve & track completion

### 🔐 Security Scanner (Upcoming / Optional)
- URL phishing detection
- Malware file scanning (API-based)
- Scan history tracking

---

## 🏗️ Architecture Overview

ScholarShield AI follows a modular architecture:

- **Backend:** Django (Python)
- **Frontend:** Vanilla JavaScript + GSAP
- **AI Engine:** Groq API (LLaMA models)
- **Database:** SQLite (development) / Compatible with PostgreSQL
- **Email Integration:** SMTP (Gmail)
- **Markdown Rendering:** Marked.js

### Core Design Principles
- Separation of concerns
- Event delegation for dynamic UI
- Extracted-text storage model for AI processing
- Asynchronous fetch-based frontend interactions
- Overlay-based contextual UI architecture

---

## 🗂️ Project Structure
