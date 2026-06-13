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
            }
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

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    // 1. Render card following structural rules (No Tags & Infinite Title Protection)
    // 1. Render the fully processed card
    const createNoteCard = (note) => {
        // Safe summary parsing
        const safeSummary = note.ai_summary || note.summary || "No summary generated.";
        let formattedSummary = safeSummary;
        if (typeof marked !== 'undefined') {
            try { formattedSummary = marked.parse(safeSummary); } 
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
        const noteHTML = `
            <div class="note" id="note-card-${note.id}" style="display: flex; flex-direction: column;">
                
                <div class="note_header" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 8px;">
                    
                    <div class="ai_note_topic" style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 15px;" title="${note.topic || 'Untitled'}">
                        ${note.topic || "Untitled"}
                    </div>
                    
                    <div class="note_hearder_basic_function1" style="display: flex; gap: 8px; flex-shrink: 0;">
                        <button class="btn_delete" data-id="${note.id}" style="background: none; border: none; cursor: pointer; padding: 0;">
                            <img src="${baseUrl}delete_icon.svg" alt="delete" class="img_note_h__functions" style="width: 18px;">
                        </button>
                        <button class="three_dot" style="background: none; border: none; cursor: pointer; padding: 0;">
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
                        <button class="btn_share" style="background: none; border: none; cursor: pointer; padding: 0;">
                            <img src="${baseUrl}share_icon.svg" alt="share" class="img_note_h__functions" style="width: 18px;">
                        </button>
                        <button class="btn_download" style="background: none; border: none; cursor: pointer; padding: 0;">
                            <img src="${baseUrl}download_icon.svg" alt="download" class="img_note_h__functions" style="width: 18px;">
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        notesGrid.insertAdjacentHTML('afterbegin', noteHTML);

        // Attach listener for deletion
        const deleteBtn = document.querySelector(`#note-card-${note.id} .btn_delete`);
        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => deleteNoteFromBackend(note.id));
        }
    };

    const deleteNoteFromBackend = async (noteId) => {
        if (!confirm("Delete this analysis?")) return;
        
        try {
            const response = await fetch(`/notes/delete/${noteId}/`, {
                method: "POST", 
                headers: { "X-CSRFToken": getCookie("csrftoken") }
            });
            if (response.ok) {
                document.getElementById(`note-card-${noteId}`).remove();
                Swal.fire({ icon: 'success', title: 'Deleted', timer: 1500, showConfirmButton: false });
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Delete failed.' });
        }
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
            finally { processBtn2.disabled = false; processBtn2.innerText = "⚡ Analyze Text"; }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Look for delete elements rendered by Django on startup
    const bindExistingDeleteButtons = () => {
        const existingDeleteBtns = document.querySelectorAll(".btn_existing_delete");
        
        existingDeleteBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                const noteId = this.getAttribute("data-id");
                // Call your deleteNoteFromBackend function safely
                deleteNoteFromBackend(noteId); 
            });
        });
    };

    // Initialize listener mapping
    bindExistingDeleteButtons();
});