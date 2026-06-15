/**
 * ========================================================
 * SCHOLARSHIELD AI - TASK PLANNER INTERACTIVE ENGINE
 * ========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    initPlannerEventListeners();
    initFormIntakeHandler();
    updateRadarMetric(); // Calibrate visual index values on page init load
});

/**
 * 1. ACTION MANAGER: Event delegation handler matching your UI paths
 */
function initPlannerEventListeners() {
    const workspace = document.querySelector('.planner-workspace');
    if (!workspace) return;

    workspace.addEventListener('click', (event) => {
        const resolveBtn = event.target.closest('.resolve-btn');
        if (resolveBtn) {
            const taskCard = resolveBtn.closest('.task-card');
            if (taskCard) {
                const taskId = taskCard.getAttribute('data-id');
                resolveTaskOnBackend(taskId, taskCard);
            }
        }
    });
}

/**
 * Sends execution token request straight to the Django processing view endpoint
 */
function resolveTaskOnBackend(taskId, cardElement) {
    if (!taskId) {
        // Fallback for static elements without backend persistence IDs
        animateTaskTeardown(cardElement);
        return;
    }

    const csrftoken = getCookie('csrftoken');

    fetch(`/resolve_task_endpoint/${taskId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'resolved') {
            animateTaskTeardown(cardElement);
        } else {
            alert("Error resolving task: " + (data.error || "Unknown error"));
        }
    })
    .catch(error => console.error("❌ Network Endpoint Communication Failure:", error));
}

/**
 * Performs fluid WAAPI card clearance animations
 */
function animateTaskTeardown(card) {
    const button = card.querySelector('.resolve-btn');
    if (button) button.disabled = true;

    const fadeOutAnimation = card.animate([
        { opacity: 1, transform: 'scale(1) translateY(0)' },
        { opacity: 0, transform: 'scale(0.95) translateY(8px)' }
    ], {
        duration: 250,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
    });

    fadeOutAnimation.onfinish = () => {
        const collapseAnimation = card.animate([
            { height: `${card.offsetHeight}px`, marginBottom: '12px', padding: '16px', opacity: 0 },
            { height: '0px', marginBottom: '0px', padding: '0px', opacity: 0 }
        ], {
            duration: 200,
            easing: 'ease-out',
            fill: 'forwards'
        });

        collapseAnimation.onfinish = () => {
            card.remove();
            updateRadarMetric();
        };
    };
}

/**
 * Captures form payload data arrays and issues async post tasks via Fetch
 */
function initFormIntakeHandler() {
    const plannerForm = document.getElementById('task-planner-form');
    if (!plannerForm) return;

    plannerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const titleText = document.getElementById('task-input-title').value;
        const excerptText = document.getElementById('task-input-excerpt').value;
        const tagText = document.getElementById('task-input-tag').value;
        
        // Target an optional input element or pass empty string for fallback delta dates
        const deadlineInput = document.getElementById('task-input-deadline');
        const deadlineText = deadlineInput ? deadlineInput.value : "";

        const csrftoken = getCookie('csrftoken');

        fetch('/task_planner/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                title: titleText,
                excerpt: excerptText,
                tag: tagText,
                deadline: deadlineText
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Spawn element utilizing the database structural weights directly
                createAiTask(
                    data.id,
                    data.title,
                    data.excerpt,
                    data.tag,
                    data.ai_score,
                    data.deadline
                );
                plannerForm.reset();
            } else {
                alert("Error generating task: " + data.error);
            }
        })
        .catch(error => console.error("❌ Submission Engine Pipeline Crash:", error));
    });
}

/**
 * 2. LAYOUT ROUTING ENGINE: Compiles components using the verified database fields
 */
function createAiTask(id, title, excerpt, tag, aiScore, timeLeft) {
    let priorityClass = 'priority-low';
    let pulseClass = '';
    let targetContainer = document.querySelector('.feed-scroll-container');

    if (aiScore >= 8.5) {
        priorityClass = 'priority-critical';
        pulseClass = 'pulsing-glow';
        targetContainer = document.querySelector('.hotzone-container');
    } else if (aiScore >= 5.5) {
        priorityClass = 'priority-medium';
    }

    if (!targetContainer) return;

    const cardElement = document.createElement('div');
    cardElement.className = `task-card ${priorityClass} ${pulseClass}`;
    cardElement.setAttribute('data-id', id);
    
    cardElement.innerHTML = `
        <div class="task-card-header">
            <span class="heat-rating">${aiScore.toFixed(1)} RATING</span>
            <span class="time-countdown">${timeLeft}</span>
        </div>
        <h3 class="task-title">${title}</h3>
        <p class="task-excerpt">${excerpt}</p>
        <div class="task-card-footer">
            <span class="task-tag">${tag}</span>
            <button class="resolve-btn">
                <span class="check-icon">✓</span> ${aiScore >= 8.5 ? 'Mark Resolved' : 'Resolve'}
            </button>
        </div>
    `;

    cardElement.style.opacity = '0';
    
    if (aiScore >= 8.5) {
        targetContainer.appendChild(cardElement);
    } else {
        targetContainer.insertBefore(cardElement, targetContainer.firstChild);
    }

    cardElement.animate([
        { opacity: 0, transform: 'translateY(-10px) scale(0.98)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
    ], {
        duration: 350,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.1)'
    }).onfinish = () => {
        cardElement.style.opacity = '1';
        updateRadarMetric();
    };
}

/**
 * Monitors DOM instances count to calibrate global heat configurations
 */
function updateRadarMetric() {
    const metricSpan = document.querySelector('.metric-value');
    const dot = document.querySelector('.radar-status-dot');
    if (!metricSpan) return;
    
    const criticalCards = document.querySelectorAll('.hotzone-container .task-card').length;
    const generalCards = document.querySelectorAll('.feed-scroll-container .task-card').length;
    
    let currentStress = (criticalCards * 4.2) + (generalCards * 0.7);
    if (currentStress > 10.0) currentStress = 10.0;
    
    metricSpan.textContent = currentStress === 0 ? "0.0" : currentStress.toFixed(1);
    
    if (dot) {
        if (currentStress >= 7.5) {
            dot.style.backgroundColor = '#ff1744';
            dot.style.boxShadow = '0 0 8px #ff1744';
        } else if (currentStress >= 4.0) {
            dot.style.backgroundColor = '#ffb74d';
            dot.style.boxShadow = '0 0 8px #ffb74d';
        } else {
            dot.style.backgroundColor = '#00b0ff';
            dot.style.boxShadow = '0 0 8px #00b0ff';
        }
    }
}

/**
 * Standard Django helper function used to read CSRF tokens safely from cookies
 */
function getCookie(name) {
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
}