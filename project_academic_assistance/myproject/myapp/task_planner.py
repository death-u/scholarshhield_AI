# task_planner.py
import re
import json
from datetime import date, datetime
from django.conf import settings
from groq import Groq

def calculate_ai_priority(title: str, excerpt: str, deadline_date: str, user_name: str, department: str, level: int) -> float:
    """
    Calls Groq API to calculate structural academic priority constraints 
    for ScholarShield AI with strict JSON structural enforcement.
    """
    
    # Initialize client matching your established credentials configuration
    client = Groq(
        api_key=settings.KEY_SUM2_GROQ
    )

    # 1. Compute timeline matrix context parameters to inject into the system prompt
    days_context = "No structural deadline constraint chosen."
    if deadline_date and deadline_date.strip():
        try:
            parsed_date = datetime.strptime(deadline_date.strip(), "%Y-%m-%d").date()
            days_remaining = (parsed_date - date.today()).days
            
            if days_remaining < 0:
                days_context = f"OVERDUE BY {abs(days_remaining)} DAYS (Elevate baseline threat/priority instantly)."
            elif days_remaining == 0:
                days_context = "DUE TODAY (Maximum critical deadline emergency)."
            else:
                days_context = f"Due in exactly {days_remaining} days."
        except ValueError:
            pass

    # 2. Setup the strict JSON-only directives for the scoring brain
    system_instruction = f"""
    You are ScholarShield AI, the advanced autonomous task prioritization module.
    You are processing data parameters for {user_name}, a {level}-Level student in the department of {department}.
    
    YOUR STRICT DIRECTIVE: Read the student's task details and output an absolute priority/urgency rating score between 1.0 and 10.0.
    
    GRADING SCHEMATIC MATRIX:
    - CRITICAL ZONE (8.5 - 10.0): Core structural bottlenecks (e.g., seminar preparation, presentation slides, report drafts, defense readiness, writing backend code, managing servers/VMs, handling databases/encryption) or tasks with immediate timeline constraints (0-2 days remaining).
    - MEDIUM ZONE (5.5 - 8.4): Frontend setups, layout drafting, UI adjustments, routine cleanups, standard assignments.
    - LOW ZONE (1.0 - 5.4): Passive reading assignments, general study sessions, tasks with long timeline padding.

    OUTPUT COMPLIANCE:
    You must output ONLY a valid JSON object. Do NOT include markdown styling, backticks, or dialogue filler.
    Your response payload layout must match this structure precisely:
    {{
        "score": 8.7
    }}
    """
    
    user_payload = f"""
    Evaluate Task Input Metrics:
    - Title: {title}
    - Specifications/Excerpt: {excerpt}
    - Target Timeline: {days_context}
    """
    
    messages = [
        {"role": "system", "content": system_instruction},
        {"role": "user", "content": user_payload}
    ]
    
    try:
        # Run Groq Llama completion sequence with strict JSON mapping constraints
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.2, # Kept low to ensure consistent and logical mathematical sorting
            max_completion_tokens=60, # Tiny token blueprint since we only want a short JSON response
            response_format={"type": "json_object"}, # Tells Groq to strictly enforce a JSON object output
            top_p=1,
            stream=False
        )

        response_content = completion.choices[0].message.content.strip()
        parsed_data = json.loads(response_content)
        
        computed_score = float(parsed_data.get("score", 5.0))

    except Exception as e:
        print(f" Task Planner Groq API Exception: {str(e)}")
        # Dynamic fallback baseline if network drops out or breaks
        payload_comb = f"{title.lower()} {excerpt.lower()}"
        computed_score = 5.0
        if any(token in payload_comb for token in ["defense", "seminar", "critical", "bug", "error"]):
            computed_score = 9.2
        elif "today" in days_context or "OVERDUE" in days_context:
            computed_score = 9.7

    # Ensure boundaries strictly adhere to frontend specifications (1.0 to 10.0)
    if computed_score > 10.0: computed_score = 10.0
    if computed_score < 1.0: computed_score = 1.0
        
    return round(computed_score, 1)