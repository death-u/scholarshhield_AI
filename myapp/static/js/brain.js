//  all my variable here
let main_area_dashboard = document.querySelector(".main_area-dashboard");
let main_area_ai_assistance = document.querySelector(".main_area-ai_assistance");
let main_area_ai_sumarizer = document.querySelector(".main_area-ai_sumarizer");
let main_area_task_planner = document.querySelector(".main_area-task_planner");
let main_area_uplaod_notes = document.querySelector(".main_area-uplaod_notes");
let panel1 = document.querySelector(".panel1");
let panel2 = document.querySelector(".panel2");
let panel3 = document.querySelector(".panel3");
let panel4 = document.querySelector(".panel4");
let panel5 = document.querySelector(".panel5");
let User_input = document.querySelector(".User_input");
let ai_user_response_area = document.querySelector(".ai_user_response_area")
let send_btn = document.querySelector(".user_input_control")
let sidebar_div = document.querySelector(".sidebar-div")
let panel_name = document.querySelectorAll(".panel-name")
let side_area  = document.querySelector(".side_area ")
let logo  = document.querySelector(".logo ")
let logo_div_content  = document.querySelector(".logo_div_content ")
let summarize_text_area_sub_functions_btn_clear  = document.querySelector(".summarize_text_area-sub_functions_btn_clear ")
let summarize_text_area_sub_functions_btn_copy  = document.querySelector(".summarize_text_area-sub_functions_btn_copy ")
let panel  = document.querySelectorAll(".panel ")
let dropZone = document.getElementById('drop_zone');
let fileInput = document.getElementById('file_input');
let summary_btn  = document.querySelector(".summary_btn")
let sub_function_copy  = document.querySelector(".sub_function-copy")
let sub_function_download  = document.querySelector(".sub_function-download")
let add_note_options  = document.querySelector(".add_note_options")
let add_note_options_upload_file  = document.querySelector(".add_note_options-upload_file")
let upload_file_overlay1  = document.querySelector(".upload_file_overlay1")
let summary_format  = document.getElementById('summary_format')
let custom_instructions  = document.getElementById('custom_instructions')
let btn_hub = document.querySelector(".add_note_options");
let btn_file = document.querySelector(".add_note_options-upload_file");
let btn_text = document.querySelector(".add_note_options-text");
let modal_file = document.getElementById("upload_file_overlay1");
let modal_text = document.getElementById("upload_text_overlay2");
let close_file = document.getElementById("close_file_modal");
let close_text = document.getElementById("close_text_modal");
let dropZoneNotes = document.getElementById('dropzone_area_notes');
let fileInputNotes = document.getElementById('file_input_notes');
let sub_functions_overlay2 = document.getElementById("sub_functions_overlay2");
const close_btn2 = document.getElementById("close-btn2")
// =====================================
// NEW: FILE STATE TRACKING VARIABLES
// =====================================
let activeFileState = null;
let originalDropZoneHTML = "";

document.addEventListener("DOMContentLoaded", (event) => {
    // Capture original dropzone HTML safely once the DOM loads
    if(dropZone) {
        originalDropZoneHTML = dropZone.innerHTML;
    }

    // panel1 click event
    panel1.addEventListener("click", ()=>{
        gsap.to(".main_area-dashboard", {
            duration: 0.5,
            display:"block",
            height:"100%",
            width:"100%",
            opacity: 1,
            onstart: function() {
                main_area_ai_assistance.style.opacity = 0;
                main_area_ai_sumarizer.style.opacity = 0;
                main_area_task_planner.style.opacity = 0;
                main_area_uplaod_notes.style.opacity = 0;

                main_area_ai_assistance.style.height = "80%";
                main_area_ai_assistance.style.width = "80%";
                main_area_ai_sumarizer.style.height = "80%";
                main_area_ai_sumarizer.style.width = "80%";
                main_area_task_planner.style.height = "80%";
                main_area_task_planner.style.width = "80%";
                main_area_uplaod_notes.style.height = "80%";
                main_area_uplaod_notes.style.width = "80%";
                
                main_area_ai_assistance.style.zIndex = 10;
                main_area_ai_sumarizer.style.zIndex = 10;
                main_area_task_planner.style.zIndex = 10;
                main_area_uplaod_notes.style.zIndex = 10;

                main_area_ai_assistance.style.display="none";
                main_area_ai_sumarizer.style.display="none";
                main_area_task_planner.style.display="none";
                main_area_uplaod_notes.style.display="none";
            }
        });
    })
    // panel2 click event
    panel2.addEventListener("click", ()=>{
        gsap.to(".main_area-ai_assistance", {
            duration: 0.5,
            height:"100%",
            width:"100%",
            display:"block",
            opacity: 1,
            onstart: function() {
                main_area_dashboard.style.opacity = 0;
                main_area_ai_sumarizer.style.opacity = 0;
                main_area_task_planner.style.opacity = 0;
                main_area_uplaod_notes.style.opacity = 0;
                
                main_area_dashboard.style.height = "80%";
                main_area_dashboard.style.width = "80%";
                main_area_ai_sumarizer.style.height = "80%";
                main_area_ai_sumarizer.style.width = "80%";
                main_area_task_planner.style.height = "80%";
                main_area_task_planner.style.width = "80%";
                main_area_uplaod_notes.style.height = "80%";
                main_area_uplaod_notes.style.width = "80%";
                
                main_area_dashboard.style.zIndex = 10;
                main_area_ai_sumarizer.style.zIndex = 10;
                main_area_task_planner.style.zIndex = 10;
                main_area_uplaod_notes.style.zIndex = 10;

                main_area_dashboard.style.display="none";
                main_area_ai_sumarizer.style.display="none";
                main_area_task_planner.style.display="none";
                main_area_uplaod_notes.style.display="none";
            }
        });
    })
    // panel3 click event
    panel3.addEventListener("click", ()=>{
        gsap.to(".main_area-ai_sumarizer", {
            duration: 0.5,
            height:"100%",
            width:"100%",
            display:"block",
            opacity: 1,
            onstart: function() {
                main_area_dashboard.style.opacity = 0;
                main_area_ai_assistance.style.opacity = 0;
                main_area_task_planner.style.opacity = 0;
                main_area_uplaod_notes.style.opacity = 0;
                
                main_area_dashboard.style.height = "80%";
                main_area_dashboard.style.width = "80%";
                main_area_ai_assistance.style.height = "80%";
                main_area_ai_assistance.style.width = "80%";
                main_area_task_planner.style.height = "80%";
                main_area_task_planner.style.width = "80%";
                main_area_uplaod_notes.style.height = "80%";
                main_area_uplaod_notes.style.width = "80%";
                
                main_area_dashboard.style.zIndex = 10;
                main_area_ai_assistance.style.zIndex = 10;
                main_area_task_planner.style.zIndex = 10;
                main_area_uplaod_notes.style.zIndex = 10;
                
                main_area_dashboard.style.display="none";
                main_area_ai_assistance.style.display="none";
                main_area_task_planner.style.display="none";
                main_area_uplaod_notes.style.display="none";
            }
        });
    })
        // panel4 click event
        panel4.addEventListener("click", ()=>{
        gsap.to(".main_area-uplaod_notes", {
            duration: 0.5,
            height:"100%",
            width:"100%",
            display:"block",
            opacity: 1,
            zIndex:50,
            onstart: function() {
                main_area_dashboard.style.opacity = 0;
                main_area_ai_assistance.style.opacity = 0;
                main_area_ai_sumarizer.style.opacity = 0;
                main_area_task_planner.style.opacity = 0;
                
                main_area_dashboard.style.height = "80%";
                main_area_dashboard.style.width = "80%";
                main_area_ai_assistance.style.height = "80%";
                main_area_ai_assistance.style.width = "80%";
                main_area_ai_sumarizer.style.height = "80%";
                main_area_ai_sumarizer.style.width = "80%";
                main_area_task_planner.style.height = "80%";
                main_area_task_planner.style.width = "80%";
                
                main_area_dashboard.style.zIndex = 10;
                main_area_ai_assistance.style.zIndex = 10;
                main_area_ai_sumarizer.style.zIndex = 10;
                main_area_task_planner.style.zIndex = 10;
                
                main_area_dashboard.style.display="none";
                main_area_ai_assistance.style.display="none";
                main_area_ai_sumarizer.style.display="none";
                main_area_task_planner.style.display="none";
            }
        });
    })
        // panel5 click event
        panel5.addEventListener("click", ()=>{
        gsap.to(".main_area-task_planner", {
            duration: 0.5,
            height:"100%",
            width:"100%",
            display:"block",
            opacity: 1,
            zIndex:50,
            onstart: function() {
                main_area_dashboard.style.opacity = 0;
                main_area_ai_assistance.style.opacity = 0;
                main_area_ai_sumarizer.style.opacity = 0;
                main_area_uplaod_notes.style.opacity = 0;
                
                main_area_dashboard.style.height = "80%";
                main_area_dashboard.style.width = "80%";
                main_area_ai_assistance.style.height = "80%";
                main_area_ai_assistance.style.width = "80%";
                main_area_ai_sumarizer.style.height = "80%";
                main_area_ai_sumarizer.style.width = "80%";
                main_area_uplaod_notes.style.height = "80%";
                main_area_uplaod_notes.style.width = "80%";
                
                main_area_dashboard.style.zIndex = 10;
                main_area_ai_assistance.style.zIndex = 10;
                main_area_ai_sumarizer.style.zIndex = 10;
                main_area_uplaod_notes.style.zIndex = 10;
                
                main_area_dashboard.style.display="none";
                main_area_ai_assistance.style.display="none";
                main_area_ai_sumarizer.style.display="none";
                main_area_uplaod_notes.style.display="none";
            }
        })
    });

    sidebar_div.addEventListener("click",()=>{
        panel_name.forEach((panel)=>{
            if(panel.classList.contains("non_active_panel_name")){
                panel.classList.remove("non_active_panel_name");
            } else{
                panel.classList.add("non_active_panel_name");
            }
        })

        if (side_area .classList.contains("non_active_side_area")){
            side_area .classList.remove("non_active_side_area");
        } else{
            side_area .classList.add("non_active_side_area");
        }

        if(logo.classList.contains("non_active_logo")){
            logo.classList.remove("non_active_logo");
        } else{
            logo.classList.add("non_active_logo");
        }
        if(logo_div_content.classList.contains("non_active_logo_div_content")){
            logo_div_content.classList.remove("non_active_logo_div_content");
        } else{
            logo_div_content.classList.add("non_active_logo_div_content");
        }
        panel.forEach((panel)=>{
            if(panel.classList.contains("non_active_panel")){
                panel.classList.remove("non_active_panel");
            } else{
                panel.classList.add("non_active_panel");
            }
        })
    })
 });

// when user press enter in input field
User_input.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send_message(User_input.value);
        }
    }
);
// when user click on send button
send_btn.addEventListener("click", function () {
        send_message(User_input.value);
    }
);

async function send_message(message) {
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
        console.log("Sending message...");
        send_btn.disabled = true;

        let user_div = document.createElement("div");
        user_div.classList.add("user_div");

        let user_content = document.createElement("div");
        user_content.classList.add("user_div_content");
        user_content.innerText = message;

        let status = document.createElement("div");
        status.classList.add("message_status2");
        status.innerText = "Sending...";

        let basic_func = document.createElement("div");
        basic_func.classList.add("basic_func");

        let copy_btn = document.createElement("button");
        copy_btn.classList.add("copy_btn");
        let copy_icon = document.createElement("img");
        copy_icon.src = window.STATIC_URL + "copy_icon.svg";
        copy_icon.alt = "Copy";
        copy_btn.appendChild(copy_icon);

        copy_btn.addEventListener("click", function () {
            navigator.clipboard.writeText(user_content.innerText).then(
                function () {
                    Swal.fire({ icon: "success", title: "Copied", text: "Message copied to clipboard" });
                },
                function (err) {
                    console.error("Could not copy text: ", err);
                    Swal.fire({ icon: "error", title: "Error", text: "Failed to copy message" });
                }
            );
        });
        basic_func.appendChild(copy_btn);
        
        let speak_btn = document.createElement("button");
        speak_btn.classList.add("speak_btn");
        let speak_icon = document.createElement("img");
        speak_icon.src = window.STATIC_URL + "mic_icon.svg";
        speak_icon.alt = "Speak";
        speak_btn.appendChild(speak_icon);

            speak_btn.addEventListener("click", function () {
                window.speechSynthesis.cancel();
                let utterance = new SpeechSynthesisUtterance(user_content.innerText);
                window.speechSynthesis.speak(utterance);
            });
        basic_func.appendChild(speak_btn);

        user_div.appendChild(user_content);
        user_div.appendChild(status);
        user_div.appendChild(basic_func);
        ai_user_response_area.appendChild(user_div);
        
        User_input.value = "";
        User_input.style.height = "auto";
        ai_user_response_area.scrollTop = ai_user_response_area.scrollHeight;

        const response = await fetch("/chat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify({ message: message })
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
        status.innerText = "Sent";

        let ai_reply = data.reply;
        let ai_div = document.createElement("div");
        ai_div.classList.add("ai_div");
        let ai_content = document.createElement("div");
        ai_content.classList.add("ai_div_content");
        ai_content.innerHTML = marked.parse(ai_reply);

        let ai_small_info = document.createElement("div");
        ai_small_info.classList.add("ai_small_info");
        let copy_ai_btn = document.createElement("button");
        copy_ai_btn.classList.add("copy_btn");
        let copy_ai_icon = document.createElement("img");
        copy_ai_icon.src = window.STATIC_URL + "copy_icon.svg";
        copy_ai_icon.alt = "Copy";
        copy_ai_btn.appendChild(copy_ai_icon);
        ai_small_info.appendChild(copy_ai_btn);

        copy_ai_btn.addEventListener("click", function () {
            navigator.clipboard.writeText(ai_content.innerText).then(
                function () {
                    Swal.fire({ icon: "success", title: "Copied", text: "Message copied to clipboard" });
                },
                function (err) {
                    console.error("Could not copy text: ", err);
                    Swal.fire({ icon: "error", title: "Error", text: "Failed to copy message" });
                });
         });
         
         speak_ai_btn = document.createElement("button");
            speak_ai_btn.classList.add("speak_btn");
            let speak_ai_icon = document.createElement("img");
            speak_ai_icon.src = window.STATIC_URL + "mic_icon.svg";
            speak_ai_icon.alt = "Speak";
            speak_ai_btn.appendChild(speak_ai_icon);
            speak_ai_btn.addEventListener("click", function () {
                console.log(window.speechSynthesis.getVoices());
                window.speechSynthesis.cancel();
                let utterance = new SpeechSynthesisUtterance(ai_content.innerText);
                let voices = window.speechSynthesis.getVoices();
                utterance.voice = voices.find(v => v.name.includes('Microsoft Zira - English (United States)') || v.name.includes('Natural'));
                window.speechSynthesis.speak(utterance);
            });
            ai_small_info.appendChild(speak_ai_btn);

        ai_div.appendChild(ai_content);
        ai_div.appendChild(ai_small_info);
        ai_user_response_area.appendChild(ai_div);
        ai_user_response_area.scrollTop = ai_user_response_area.scrollHeight;

    } catch (error) {
        console.error("Fetch error:", error);
        let statuses = document.querySelectorAll(".message_status2");
        let lastStatus = statuses[statuses.length - 1];

        if (lastStatus) {
            lastStatus.innerText = "Failed ❌";
        }

        Swal.fire({
            icon: "error",
            title: "Connection Failed",
            text: "We could not reach the server. Please check your internet connection."
        });
    } finally {
        send_btn.disabled = false;
        console.log("Request finished.");
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie) {
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

User_input.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    }
);

// ====================
//        file handler
// ====================

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault(); 
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault(); 
    dropZone.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 1) {
        Swal.fire({ icon: 'error', title: 'Too many files', text: 'Only one file at a time!' });
        return;
    }
    handleFile(files[0]);
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

// UPDATED: handleFile logic strictly updates the UI and sets the state buffer
function handleFile(file) {
    let max_size_mb = 25;
    console.log("File received:", file);
    
    const validMimeTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validExtensions = ['pdf', 'txt', 'docx'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    const isValidType = validMimeTypes.includes(file.type) || validExtensions.includes(fileExtension);

    if (!isValidType) {
        Swal.fire({ icon: 'error', title: 'Invalid file type', text: 'Please upload a PDF, TXT, or DOCX file.' });
        return;
    } else if (file.size > max_size_mb * 1024 * 1024) {
        Swal.fire({ icon: 'error', title: 'File too large', text: `Please upload a file smaller than ${max_size_mb} MB.` });
        return;
    }

    // Capture the file in our global state
    activeFileState = file;

    // Transform UI into a "file loaded" state with a remove button
    dropZone.innerHTML = `
        <img src="${window.STATIC_URL || '/static/'}file_icon.svg" alt="file icon" class="file_icon" style="filter: hue-rotate(90deg);">
        <h3 style="color: #00ffff; font-size: 16px; margin: 5px 0;">📄 ${file.name}</h3>
        <p style="color: #fff; font-size: 12px;">Ready for summarizer</p>
        <button id="remove_file_btn" style="margin-top: 10px; background: crimson; color: white; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer;">Remove</button>
    `;

    document.querySelector(".summarize_text").value = "";

    document.getElementById('remove_file_btn').addEventListener('click', (e) => {
        e.stopPropagation(); 
        resetFileState();
    });
}

// NEW UTILITY: Safely resets the dropzone state back to normal
function resetFileState() {
    activeFileState = null;
    fileInput.value = ""; 
    dropZone.innerHTML = originalDropZoneHTML;
}

// ====================
//    end file handler
// ====================

function copy(text, class_div) {
    navigator.clipboard.writeText(text).then(() => {
        let img_place = document.querySelector(`.${class_div}`);
        
        if (img_place) { 
            let originalSrc = img_place.src;
            img_place.src = window.STATIC_URL + "done_icon.svg";
            
            setTimeout(() => {
                img_place.src = originalSrc;
            }, 2000);
        }
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

summarize_text_area_sub_functions_btn_copy.addEventListener("click", function() {
    let text_to_copy = document.querySelector(".summarize_text").value;
    copy(text_to_copy, "copy_icon");
});

summarize_text_area_sub_functions_btn_clear.addEventListener("click",(()=>{
    document.querySelector(".summarize_text").value = "";
}));

// UPDATED: The unified submit router handling both plain text and binary file processing safely
summary_btn.addEventListener("click",()=>{
    let summary_format_text = summary_format.value;
    let custom_instructions_text = custom_instructions.value;
    
    if (activeFileState) {
        send_sum_file(activeFileState, summary_format_text, custom_instructions_text);
    } else {
        send_sum_mess(document.querySelector(".summarize_text").value, summary_format_text, custom_instructions_text);
    }
});

sub_function_copy.addEventListener("click",()=>{
    let text = document.querySelector(".item12-output").innerText;
    copy(text, "s_f_copy");
});
document.getElementById('downloadBtn').addEventListener('click', function() {
    // 1. Target the summary container div
    const outputDiv = document.getElementById('item12_output');
    
    if (!outputDiv) {
        alert("Summary container not found.");
        return;
    }

    // 2. Extract content and preserve basic line-break formatting
    const rawText = outputDiv.innerText || outputDiv.textContent;
    
    // FIXED: Cleaned out Python's .strip reference. Only using JavaScript's native .trim()
    if (!rawText || !rawText.trim()) {
        alert("There is no summary content to download yet!");
        return;
    }

    // Convert raw newlines to HTML paragraph blocks so Word separates them cleanly
    const formattedHtml = rawText.split('\n').map(line => `<p>${line}</p>`).join('');

    // 3. Create the MS Word XML document envelope
    const docxHeader = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>";
    const docxBody = `<head><title>ScholarShield Summary</title></head><body>${formattedHtml}</body></html>`;
    const fullContent = docxHeader + docxBody;

    // 4. Package as an application/msword binary blob stream
    const blob = new Blob([fullContent], { type: 'application/msword;charset=utf-8;' });

    // 5. Trigger the automatic download anchor
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'scholarshield_summary.docx'; // Saves cleanly as a Word file

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
});

// ==========================================
// FINAL NOTE UPLOADER & SECURITY GATEKEEPER
// ==========================================
let is_active_add = false;



// 1. GSAP Floating Button Animation
if (btn_hub && btn_file && btn_text) {

    let closeTimer = null;

    btn_hub.addEventListener("click", () => {

        if (!is_active_add) {
            is_active_add = true;

            gsap.to(btn_file, { duration: 1, x: 70, ease: "elastic.out(1,0.3)" });
            gsap.to(btn_text, { duration: 1.5, x: 120, ease: "elastic.out(1,0.3)" });

            // ✅ start auto-close timer
            closeTimer = setTimeout(() => {
                is_active_add = false;
                gsap.to(btn_file, { duration: 0.8, x: 5, ease: "power4.in" });
                gsap.to(btn_text, { duration: 1, x: 5, ease: "power4.in" });
            }, 10000);

        } else {

            is_active_add = false;

            gsap.to(btn_file, { duration: 0.8, x: 5, ease: "power4.in" });
            gsap.to(btn_text, { duration: 1, x: 5, ease: "power4.in" });

            // ✅ clear timer if manually closed
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
        }

    });
}

// 2. MODAL TOGGLE LOGIC
const setupModal = (btn, modal, close) => {
    if (btn && modal && close) {
        btn.addEventListener("click", () => modal.classList.add("active"));
        close.addEventListener("click", () => modal.classList.remove("active"));
        modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("active"); });
    }
};

setupModal(btn_file, modal_file, close_file);
setupModal(btn_text, modal_text, close_text);

// 3. DRAG & DROP + SECURITY VALIDATION
if (dropZoneNotes && fileInputNotes) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => dropZoneNotes.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); }, false));

    ['dragenter', 'dragover'].forEach(ev => dropZoneNotes.addEventListener(ev, () => {
        dropZoneNotes.style.borderColor = "#a855f7";
        dropZoneNotes.style.backgroundColor = "rgba(168, 85, 247, 0.1)";
    }, false));

    ['dragleave', 'drop'].forEach(ev => dropZoneNotes.addEventListener(ev, () => {
        dropZoneNotes.style.borderColor = "rgba(168, 85, 247, 0.5)";
        dropZoneNotes.style.backgroundColor = "rgba(168, 85, 247, 0.05)";
    }, false));

    const validateAndProcess = (file) => {
        const validExt = ['pdf', 'docx', 'txt'];
        const ext = file.name.split('.').pop().toLowerCase();
        
        if (!validExt.includes(ext)) {
            Swal.fire({ icon: 'error', title: 'Invalid Format', text: 'Please use PDF, DOCX, or TXT.' });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            Swal.fire({ icon: 'error', title: 'Too Large', text: 'Max file size is 5MB.' });
            return;
        }
        
        const dt = new DataTransfer();
        dt.items.add(file);
        fileInputNotes.files = dt.files;
        
        const content = dropZoneNotes.querySelector('.dropzone-content');
        content.innerHTML = `<h4 style="color: #a855f7;">📄 ${file.name}</h4><p>File queued for analysis.</p>`;
    };

    dropZoneNotes.addEventListener('drop', (e) => { if (e.dataTransfer.files.length) validateAndProcess(e.dataTransfer.files[0]); });
    fileInputNotes.addEventListener('change', (e) => { if (e.target.files.length) validateAndProcess(e.target.files[0]); });
}

// // ==========================================
// // DYNAMIC NOTE INJECTION
// // ==========================================
// document.addEventListener("DOMContentLoaded", () => {
//     // UPDATED: Now selecting the specific class names from your dash.html
//     const processBtn1 = document.querySelector(".process-btn1");
//     const processBtn2 = document.querySelector(".process-btn2");
//     const notesGrid = document.querySelector(".main_note");

//     // Helper to handle the note creation
//     const createNote = (fileName) => {
//         const noteHTML = `
//             <div class="note">
//                 <div class="note_header">
//                     <div class="ai_note_topic">New Analysis</div>
//                     <div class="note_hearder_basic_function1">
//                         <button class="btn_delete"><img src="${window.STATIC_URL}delete_icon.svg" alt="delete" class="img_note_h__functions"></button>
//                         <button class="three_dot"><img src="${window.STATIC_URL}dots_icon.svg" alt="3 dots" class="img_note_h__functions"></button>
//                     </div>
//                 </div>
//                 <div class="note_main"></div>
//                 <div class="note_footer">
//                     <div class="file_name">${fileName}</div>
//                     <div class="note_footer_basic_function1">
//                         <button class="btn_share"><img src="${window.STATIC_URL}share_icon.svg" alt="share" class="img_note_h__functions"></button>
//                         <button class="btn_download"><img src="${window.STATIC_URL}download_icon.svg" alt="download" class="img_note_h__functions"></button>
//                     </div>
//                 </div>
//             </div>
//         `;
//         notesGrid.insertAdjacentHTML('afterbegin', noteHTML);
//     };

//     // Logic for File Upload (Overlay 1)
//     if (processBtn1 && notesGrid) {
//         processBtn1.addEventListener("click", () => {
//             const fileDisplay = dropZoneNotes.querySelector('h4');
//             const fileName = fileDisplay ? fileDisplay.innerText.replace('📄 ', '') : "Untitled File Note";
            
//             createNote(fileName);
            
//             const modal_file = document.getElementById("upload_file_overlay1");
//             if(modal_file) modal_file.classList.remove("active");
            
//             Swal.fire({ icon: 'success', title: 'Processing...', text: 'Your file is being analyzed.', timer: 2000 });
//         });
//     }

//     // Logic for Text Upload (Overlay 2)
//     if (processBtn2 && notesGrid) {
//         processBtn2.addEventListener("click", () => {
//             createNote("Raw Text Analysis");
            
//             const modal_text = document.getElementById("upload_text_overlay2");
//             if(modal_text) modal_text.classList.remove("active");
            
//             Swal.fire({ icon: 'success', title: 'Processing...', text: 'Your text is being analyzed.', timer: 2000 });
//         });
//     }
// });


function filterNotes(query) {
  const q = (query || "").trim().toLowerCase();
  const tokens = q ? q.split(/\s+/) : [];

  document.querySelectorAll(".main_note .note").forEach(noteEl => {
    const haystack = (noteEl.dataset.search || "").toLowerCase();

    // require every token to be present (Google-like)
    const match = tokens.every(t => haystack.includes(t));

    noteEl.style.display = match ? "" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search_note");
  const btn = document.querySelector(".bas1 .search");

  if (input) {
    input.addEventListener("input", () => filterNotes(input.value));
  }

  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      filterNotes(input ? input.value : "");
    });
  }
});