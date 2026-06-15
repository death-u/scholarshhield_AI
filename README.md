# 🎓 ScholarShield AI

ScholarShield AI is a full‑stack intelligent academic productivity platform built with Django and modern JavaScript.  

It integrates AI-powered study tools, dynamic note management, task prioritization, quiz generation, and cybersecurity scanning into a unified interactive dashboard.

This system was developed as a Final Year Computer Science Project by **Success**.

---

## 🌍 Project Vision

ScholarShield AI was designed to solve three core academic challenges:

1. 📚 Information Overload  
2. 🗂️ Disorganized Study Materials  
3. ⏳ Poor Task Prioritization  

By integrating Large Language Models (LLMs) with a modular Django backend and a dynamic frontend, ScholarShield AI transforms raw academic content into structured, actionable knowledge.

---

# 🚀 Core Features

## 🤖 1. AI Academic Assistant

- Real-time conversational AI
- Context-aware academic responses
- Session-based chat history
- Copy-to-clipboard support
- Speech synthesis (Text-to-Speech)
- Error-safe asynchronous API handling

---

## 📝 2. AI Smart Summarizer

Supports both text and document inputs:

- PDF (via PyMuPDF)
- DOCX (via python-docx)
- TXT files

Capabilities:
- Bullet point summaries
- Paragraph summaries
- Mixed structure output
- Custom AI instructions
- Automatic Word (.docx) export
- Dynamic markdown rendering

---

## 📚 3. Intelligent Notes System

- Upload or paste notes
- AI-generated topics
- AI-generated tags (stored as JSON)
- Markdown-rendered summaries
- Live search (topic, tags, filename)
- Dynamic note injection (no reload)
- Email sharing
- Secure deletion
- Download support
- Contextual action overlay

### Context Actions
- Summarize Note
- Generate Quiz

---

## 🧠 4. AI Quiz Generator

- Automatically generates MCQs from notes
- Strict JSON-based AI response enforcement
- Dynamic quiz rendering
- Real-time scoring
- Immediate answer validation
- Structured result display
- Overlay-based quiz interface

---

## 📅 5. AI Task Planner

- AI-prioritized academic tasks
- Intelligent focus scoring
- Critical hotzone detection
- Deadline-aware ranking
- Completion tracking
- Dynamic UI updates

---

## 🔐 6. Security Scanner (Expansion Module)

- URL phishing detection (API-based)
- Malware scanning (external security APIs)
- Risk scoring architecture
- Scan history model
- Modular panel integration

---

# 🏗️ Technical Architecture

ScholarShield AI follows a modular, scalable architecture.

---

## 🖥️ Backend Stack

- Django (Python)
- Modular AI pipeline architecture
- Groq API (LLaMA models)
- PyMuPDF (PDF parsing)
- python-docx (DOCX parsing)
- SQLite (Development)
- PostgreSQL-ready
- SMTP Email Integration

---

## 🎨 Frontend Stack

- Vanilla JavaScript
- GSAP animations
- SweetAlert2 UI interactions
- Markdown rendering via Marked.js
- Dynamic event delegation architecture
- Overlay-driven contextual UI

---

# 🧠 AI System Design

AI modules are separated into distinct files:

- `ask_ai.py`
- `summarize_text_ai.py`
- `summarize_file.py`
- `quiz_generator.py`
- `task_planner.py`
- `note_processor.py`

Each module:
- Initializes Groq client securely
- Uses environment-based API keys
- Implements structured prompting
- Enforces JSON parsing safety
- Handles API failure gracefully

---

# 🔒 Security & Environment Management

Sensitive credentials are NOT stored in version control.

Secrets are handled using environment variables via `.env`:
GROQ_API_KEY=your_key
KEY_SUM2_GROQ=your_key
EMAIL_HOST_USER=your_email
EMAIL_HOST_PASSWORD=your_password

`.env` is excluded using `.gitignore`.

This ensures:
- Secure deployment
- Clean repository
- Industry-standard configuration

---

# 📂 Project Structure
scholarshield_AI/
│
├── manage.py
├── .env
├── .gitignore
├── README.md
│
├── myproject/
│ ├── settings.py
│ ├── urls.py
│ └── wsgi.py
│
└── myapp/
├── models.py
├── views.py
├── ask_ai.py
├── summarize_file.py
├── summarize_text_ai.py
├── quiz_generator.py
├── task_planner.py
├── note_processor.py
├── static/
└── templates/

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/death-u/scholarshield_AI.git
cd scholarshield_AI
2️⃣ Create Virtual Environment
python -m venv venv
venv\Scripts\activate   # Windows
3️⃣ Install Dependencies
pip install -r requirements.txt
4️⃣ Configure Environment Variables
Create .env file in project root:
GROQ_API_KEY=your_api_key
EMAIL_HOST_USER=your_email
EMAIL_HOST_PASSWORD=your_password
5️⃣ Run Migrations
python manage.py migrate
6️⃣ Run Server
python manage.py runserver
🧩 Design Principles
Separation of concerns
Modular AI pipelines
Event delegation for scalability
Extracted-text storage model
API failure resilience
Secure credential management
Overlay-based interaction system
🔮 Future Improvements
- Progressive Web App (PWA)
- Offline support
- Service worker caching
- Quiz attempt tracking
- Security scan persistence
- postgreSQL production deployment
- Role-based user system
- Cloud deployment (Render / Railway / VPS)
🎓 Academic Relevance
This project demonstrates:

Full-stack development
API integration
AI prompt engineering
File parsing systems
Dynamic frontend architecture
Database modeling
Security-aware development
Environment configuration management
Version control best practices
**👨‍💻 Author**
- Success
- Final Year Computer Science Student
- Nigeria 🇳🇬

📜 License
This project is developed for academic and educational purposes.
