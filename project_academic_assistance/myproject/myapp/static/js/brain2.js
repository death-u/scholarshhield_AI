// document.querySelectorAll(".note_main[data-md]").forEach(renderMarkdownInElement);

// ORIGINAL TEXT PIPELINE 
async function send_sum_mess(message, summary_format, custom_instructions) {
    message = message.trim();

    if (!message) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Chat field can't be empty"
        });
        return;
    }

    try {
        console.log("sending message");
        summary_btn.disabled = true;

        let item12_output = document.querySelector(".item12-output");

        const response = await fetch("/upload_text/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify({
                message: message,
                summary_format: summary_format,
                custom_instructions: custom_instructions 
            })
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server did not return JSON");
        }

        const data = await response.json();
        console.log("Success:", data);

        if (item12_output) {
            item12_output.innerHTML = marked.parse(data.reply || data.summary || "No response received.");
        }

    } catch (error) {
        console.error("Fetch error:", error);
        Swal.fire({
            icon: "error",
            title: "Processing Failed",
            text: "Could not generate summary. Check server logs."
        });
    } finally {
        console.log("request process finished");
        summary_btn.disabled = false;
    }
}

// NEW: FILE FETCH PIPELINE
async function send_sum_file(file, summary_format, custom_instructions) {
    try {
        console.log("sending file");
        summary_btn.disabled = true;
        let item12_output = document.querySelector(".item12-output");
        item12_output.innerHTML = "";

        const formData = new FormData();
        formData.append("file", file);
        formData.append("summary_format", summary_format);
        formData.append("custom_instructions", custom_instructions);

        const response = await fetch("/upload_file/", {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: formData

        });

        if (!response.ok) throw new Error(`Server returned ${response.status}`);
        
        const data = await response.json();
        console.log("File Success:", data);
        
        if (item12_output) {
            item12_output.innerHTML = marked.parse(data.reply || data.summary || "No response received.");
        }

        if (typeof resetFileState === "function") {
            resetFileState();
        }

    } catch (error) {
        console.error("File processing error:", error);
        Swal.fire({ 
            icon: "error", 
            title: "Processing Failed", 
            text: "Could not parse document. Check server logs." 
        });
    } finally {
        console.log("file request process finished");
        summary_btn.disabled = false;
    }
}

// ==========================================
// DYNAMIC BACKEND NOTE INJECTION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const processBtn1 = document.querySelector(".process-btn1");
    const processBtn2 = document.querySelector(".process-btn2");
    const notesGrid = document.querySelector(".main_note");
    // document.querySelectorAll(".note_main[data-md]").forEach(renderMarkdownInElement);

    // const getCookie = (name) => {
    //     let cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         const cookies = document.cookie.split(';');
    //         for (let i = 0; i < cookies.length; i++) {
    //             const cookie = cookies[i].trim();
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // };

    // 1. Render card following structural rules (No Tags & Infinite Title Protection)
    // 1. Render the fully processed card
    const createNoteCard = (note) => {
        // Safe summary parsing
        const safeSummary = note.ai_summary || note.summary || "No summary generated.";
        let formattedSummary = safeSummary;
        if (typeof marked !== 'undefined') {
            try { formattedSummary = marked.parse(normalizeBullets(safeSummary)); } 
            catch (e) { console.error("Marked parsing failed:", e); }
        }
        
        // --- THE FIX FOR THE PYTHON STRING ARRAY ---
        // Your Django backend is sending a string like "['Tag1', 'Tag2']"
        // This converts that string into a proper JavaScript array.
        let tagsArray = [];
        if (Array.isArray(note.tags)) {
            tagsArray = note.tags;
        } else if (typeof note.tags === 'string') {
            try {
                // Replace single quotes with double quotes for valid JSON parsing
                let jsonFormattedString = note.tags.replace(/'/g, '"');
                tagsArray = JSON.parse(jsonFormattedString);
            } catch (e) {
                tagsArray = [note.tags]; // Fallback if parsing fails
            }
        }

        // Generate the tag pills (Styling adjusted for Dark Mode)
        const tagHTML = tagsArray.map(tag => 
            `<span class="note-tag" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 4px 10px; font-size: 0.75rem; display: inline-block;">${tag}</span>`
        ).join('');

        // --- THE FIX FOR BROKEN IMAGES ---
        // Ensure the path always ends with a slash, fallback to absolute path
        const baseUrl = window.STATIC_URL ? window.STATIC_URL.replace(/\/?$/, '/') : '/static/images/assets/';

        // --- THE FIX FOR THE UI CLASH ---
        // Removed hardcoded light-mode colors. Only structural flexbox layout remains.
        const searchBlob = `${note.topic || ""} ${note.file_name || ""} ${tagsArray.join(" ")}`;
        const noteHTML = `
            <div class="note" id="note-card-${note.id}" data-search="${searchBlob.replace(/"/g, "&quot;")}" style="display: flex; flex-direction: column;">
                
                <div class="note_header" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 8px;">
                    
                    <div class="ai_note_topic" style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 15px;" title="${note.topic || 'Untitled'}">
                        ${note.topic || "Untitled"}
                    </div>
                    
                    <div class="note_hearder_basic_function1" style="display: flex; gap: 8px; flex-shrink: 0;">
                        <button class="btn_delete" data-id="${note.id}" style="background: none; border: none; cursor: pointer; padding: 0;">
                            <img src="${baseUrl}delete_icon.svg" alt="delete" class="img_note_h__functions" style="width: 18px;">
                        </button>
                        <button class="three_dot" data-id="${note.id}" style="background: none; border: none; cursor: pointer; padding: 0;">
                            <img src="${baseUrl}dots_icon.svg" alt="3 dots" class="img_note_h__functions" style="width: 18px;">
                        </button>
                    </div>
                </div>

                <div class="note_tags" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
                    ${tagHTML}
                </div>

                <div class="note_main" style="flex: 1; overflow-y: auto;">
                    ${formattedSummary}
                </div>

                <div class="note_footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 10px;">
                    <div class="file_name" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60%; opacity: 0.7;" title="${note.file_name || 'Note'}">
                        ${note.file_name || "Note"}
                    </div>
                    <div class="note_footer_basic_function1" style="display: flex; gap: 10px; flex-shrink: 0;">
                        <button class="btn_share"data-id="${note.id}" style="background: none; border: none; cursor: pointer; padding: 0;">
                            <img src="${baseUrl}share_icon.svg" alt="share" class="img_note_h__functions" style="width: 18px;">
                        </button>
                        <button class="btn_download" data-id="${note.id}" style="background: none; border: none; cursor: pointer; padding: 0;">
                            <img src="${baseUrl}download_icon.svg" alt="download" class="img_note_h__functions" style="width: 18px;">
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        notesGrid.insertAdjacentHTML('afterbegin', noteHTML);

    };

   

    // 2. File Upload Handler Pipeline
    if (processBtn1) {
        processBtn1.addEventListener("click", async () => {
            const fileInput = document.getElementById('file_input_notes');
            if (!fileInput.files.length) return Swal.fire('Oops', 'Select a file!', 'warning');

            processBtn1.disabled = true;
            processBtn1.innerText = "Analyzing...";

            const formData = new FormData();
            formData.append("file", fileInput.files[0]);

            try {
                const response = await fetch("/notes/upload-file/", {
                    method: "POST",
                    headers: { "X-CSRFToken": getCookie("csrftoken") },
                    body: formData 
                });

                const data = await response.json();
                if (response.ok) {
                    createNoteCard({ id: data.id, ...data.note });
                    document.getElementById("upload_file_overlay1").classList.remove("active");
                } else throw new Error(data.error);
            } catch (err) { Swal.fire('Error', err.message, 'error'); }
            finally { 
                // colorfirst()
                processBtn1.disabled = false; 
                processBtn1.innerText = "⚡ Analyze File"; 
                if (typeof resetFileState === "function") resetFileState();
            }
        });
    }

    // 3. Text Upload Handler Pipeline
    if (processBtn2) {
        processBtn2.addEventListener("click", async () => {
            const textInput = document.getElementById("pasted_notes_input");
            if (!textInput.value.trim()) return Swal.fire('Oops', 'Paste text first!', 'warning');

            processBtn2.disabled = true;
            processBtn2.innerText = "Analyzing...";

            try {
                const response = await fetch("/notes/upload-text/", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCookie("csrftoken") 
                    },
                    body: JSON.stringify({ message: textInput.value })
                });

                const data = await response.json();
                if (response.ok) {
                    createNoteCard({ id: data.id, ...data.note });
                    document.getElementById("upload_text_overlay2").classList.remove("active");
                    textInput.value = "";
                } else throw new Error(data.error);
            } catch (err) { Swal.fire('Error', err.message, 'error'); }
            finally {
                // colorfirst()
                 processBtn2.disabled = false; 
                processBtn2.innerText = "⚡ Analyze Text";
             }
        });
    }
});

// document.addEventListener("DOMContentLoaded", () => {
//     // Look for delete elements rendered by Django on startup
//     const bindExistingDeleteButtons = () => {
//         const existingDeleteBtns = document.querySelectorAll(".btn_existing_delete");
        
//         existingDeleteBtns.forEach(btn => {
//             btn.addEventListener("click", function() {
//                 const noteId = this.getAttribute("data-id");
//                 // Call your deleteNoteFromBackend function safely
//                 deleteNoteFromBackend(noteId); 
//             });
//         });
//     };

//     // Initialize listener mapping
//     bindExistingDeleteButtons();
// });

// Works for ALL delete buttons: old, new, existing, future
document.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".btn_delete, .btn_existing_delete");
  if (deleteBtn) deleteNoteFromBackend(deleteBtn.dataset.id);
});




async function deleteNoteFromBackend(noteId) {
  const result = await Swal.fire({
    title: "Delete this note?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#555",
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  try {
    const response = await fetch(`/notes/delete/${noteId}/`, {
      method: "POST",
      headers: { "X-CSRFToken": getCookie("csrftoken") }
    });

    if (response.ok) {
      document.getElementById(`note-card-${noteId}`)?.remove();

      await Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Your note has been removed.",
        timer: 1400,
        showConfirmButton: false,
      });
    } else {
      const errText = await response.text(); // optional debug
      await Swal.fire({
        icon: "error",
        title: "Delete failed",
        text: `Server refused delete (${response.status}).`,
      });
      console.error(errText);
    }
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Network error",
      text: "Could not reach the server.",
    });
  }
}

// bullect fix
function normalizeBullets(md) {
    if (!md) return "";

    let t = md.trim();

    // If it looks like "- a - b - c" on ONE line, convert to real markdown list
    // Only do this when there are no linebreak bullets already.
    if (t.startsWith("-") && !t.includes("\n-")) {
        // remove the first "- " then split remaining " - "
        const items = t.replace(/^\-\s*/, "").split(/\s-\s+/);
        return items.map(x => `- ${x.trim()}`).join("\n");
    }

    return t;
}

function renderMarkdownInElement(el) {
    const raw = el.textContent || "";
    const normalized = normalizeBullets(raw);

    if (typeof marked !== "undefined") {
        el.innerHTML = marked.parse(normalized);
    } else {
        el.textContent = normalized;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".note_main[data-md]").forEach(renderMarkdownInElement);
});
// download note coode
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn_download");
  if (!btn) return;

  const noteId = btn.dataset.id;
  window.location.href = `/notes/download/${noteId}/`;
});

// function colorfirst(){
//     const notes = document.querySelectorAll(".note");
// if (notes[0]) {
//   notes[0].style.setProperty(
//     "--note-glow",
//     "radial-gradient(800px 240px at 20% 0%, rgba(85, 209, 247, 0.25), transparent 60%)"
//   );
// }else if(notes[1]){
//     notes[1].style.setProperty(
//     "--note-glow",
//     "radial-gradient(800px 240px at 20% 0%, rgba(168 ,85, 247,0.25), transparent 60%)"
//   );
// }
// }

// colorfirst()

function filterNotes(query) {
    const notes = document.querySelectorAll(".main_note .note");
    const cleanQuery = (query || "").trim().toLowerCase();

    notes.forEach(note => {
        const searchableText = (note.dataset.search || "").toLowerCase();

        if (!cleanQuery) {
            note.style.display = "";
            return;
        }

        const words = cleanQuery.split(/\s+/);
        const matched = words.every(word => searchableText.includes(word));

        note.style.display = matched ? "" : "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search_note");
    const searchBtn = document.querySelector(".search");

    if (searchInput) {
        // live search while typing
        searchInput.addEventListener("input", () => {
            filterNotes(searchInput.value);
        });

        // search on Enter
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                filterNotes(searchInput.value);
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", (e) => {
            e.preventDefault();
            filterNotes(searchInput.value);
        });
    }
});


let note_id = ""

document.addEventListener("click",(e)=>{
     const three_dot_btn = e.target.closest(".three_dot");
     if(!three_dot_btn) return;

     note_id = three_dot_btn.dataset.id;
     if (!sub_functions_overlay2) return

     sub_functions_overlay2.classList.add("active");
})
sub_functions_overlay2.addEventListener("click",(e)=>{
    if(!e.target.closest(".SB_content") || e.target.closest(".SB_close")){
        sub_functions_overlay2.classList.remove("active")
    }
})
// main summarize function
document.addEventListener("click", async (e) => {

    const summarizeBtn = e.target.closest(".summarize_note_overlay");
    if (!summarizeBtn) return;
    if (!note_id) return;

    try {
        const response = await fetch(`/notes/get/${note_id}/`);
        const data = await response.json();

        if (!response.ok) throw new Error("Failed to load note");

        panel3.click();

        
        const textarea = document.querySelector(".summarize_text");
        textarea.value = data.raw_text || "";

        
        activeFileState = null;
        resetFileState();   

        sub_functions_overlay2.classList.remove("active");

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Could not load note for summarization."
        });
    }

});
// ======================
// quiz logic
// ===============
document.addEventListener("click", async (e) => {
    const quizBtn = e.target.closest(".Quiz_overlay");
    if (!quizBtn) return;
    if (!note_id) return;

    // Show loading
    Swal.fire({
        title: "Generating Quiz...",
        text: "AI is creating your questions",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        const response = await fetch(
            `/notes/quiz/${note_id}/`,
            {
                method: "POST",
                headers: { 
                    "X-CSRFToken": getCookie("csrftoken") 
                }
            }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        Swal.close();
        sub_functions_overlay2.classList.remove("active");

        // Render quiz
        renderQuiz(data.quiz);

    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Quiz Failed",
            text: err.message
        });
    }
});
function renderQuiz(questions) {
    let currentQ = 0;
    let score = 0;
    let userAnswers = {};

    const overlay = document.getElementById("quiz_overlay");
    const container = document.getElementById("quiz_container");

    function renderQuestion() {
        const q = questions[currentQ];
        container.innerHTML = `
            <div class="quiz-progress">
                Question ${currentQ + 1} of ${questions.length}
            </div>

            <div class="quiz-progress-bar">
                <div class="quiz-progress-fill" 
                     style="width: ${((currentQ) / questions.length) * 100}%">
                </div>
            </div>

            <div class="quiz-question">
                ${q.question}
            </div>

            <div class="quiz-options">
                ${Object.entries(q.options).map(([key, val]) => `
                    <button class="quiz-option" data-key="${key}">
                        <span class="option-key">${key}</span>
                        <span class="option-text">${val}</span>
                    </button>
                `).join("")}
            </div>
        `;

        // Option click handler
        container.querySelectorAll(".quiz-option").forEach(btn => {
            btn.addEventListener("click", () => {
                const selected = btn.dataset.key;
                const correct = q.answer;

                userAnswers[currentQ] = selected;

                // Visual feedback
                container.querySelectorAll(".quiz-option").forEach(b => {
                    b.disabled = true;
                    if (b.dataset.key === correct) {
                        b.classList.add("correct");
                    } else if (b.dataset.key === selected) {
                        b.classList.add("wrong");
                    }
                });

                if (selected === correct) score++;

                // Next question after delay
                setTimeout(() => {
                    currentQ++;
                    if (currentQ < questions.length) {
                        renderQuestion();
                    } else {
                        showResult();
                    }
                }, 1200);
            });
        });

        
    }

    function showResult() {
        const percent = Math.round((score / questions.length) * 100);
        const emoji = percent >= 80 ? "🏆" 
                    : percent >= 60 ? "😊" 
                    : percent >= 40 ? "😐" 
                    : "😢";

        container.innerHTML = `
            <div class="quiz-result">
                <div class="result-emoji">${emoji}</div>
                <h2>Quiz Complete!</h2>
                <div class="result-score">${score} / ${questions.length}</div>
                <div class="result-percent">${percent}%</div>
                <p class="result-msg">
                    ${percent >= 80 ? "Excellent! You mastered this topic." 
                    : percent >= 60 ? "Good job! Keep studying." 
                    : "Keep going. Revision helps."}
                </p>
                <button class="quiz-restart-btn">Try Again</button>
                <button class="quiz-close-btn">Close</button>
            </div>
        `;

        container.querySelector(".quiz-restart-btn")
            .addEventListener("click", () => {
                currentQ = 0;
                score = 0;
                userAnswers = {};
                renderQuestion();
            });
        container.querySelector(".quiz-close-btn")
            .addEventListener("click", () => {
                overlay.classList.remove("active");
            });
    }

    overlay.classList.add("active");
    renderQuestion();
}
close_btn2.addEventListener("click",()=>{
    const overlay = document.getElementById("quiz_overlay");
    overlay.classList.remove("active");
})