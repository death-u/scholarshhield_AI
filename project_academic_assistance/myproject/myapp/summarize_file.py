from django.conf import settings
from groq import Groq

def ask_sum_file_ai(user_name: str, file_prompt: str, summary_format: str, custom_instructions: str) -> str:
    """Calls Groq API to summarize academic text for ScholarShield AI with dynamic settings."""
    
    # Initialize the Groq client with the API key from your settings
    client = Groq(
        api_key=settings.KEY_SUM2_GROQ
    )

    # 1. Map the frontend format choices to clear directives for Llama
    if summary_format == "bullets":
        format_directive = "Format the entire summary using clean, organized bullet points."
    elif summary_format == "mixed":
        format_directive = "Format the summary using a mixed structure: a brief summary paragraph followed by specific key bullet points."
    else:
        format_directive = "Format the summary as a cohesive, continuous normal paragraph."

    # 2. Build a conditional directive if the student supplied custom instructions
    custom_directive = ""
    if custom_instructions and custom_instructions.strip():
        custom_directive = f"\n- CRITICAL COMPLIANCE: The user has requested this specific custom constraint: '{custom_instructions.strip()}'"

    # Integrated System Instruction
    system_instruction = f"""
    You are ScholarShield AI, a highly intelligent and supportive academic assistant.
    You are talking to {user_name}.
    
    YOUR STRICT DIRECTIVE: Your specific and ONLY goal is to summarize the provided text.
    - Extract the core arguments, key facts, and main conclusions.
    - {format_directive}{custom_directive}
    - Do NOT include conversational filler (e.g., "Here is the summary:", "Sure, Success!").
    - Maintain an academic, objective tone.
    - Output ONLY the summary.
    """
    
    # FIX: Changed 'prompt' to 'file_prompt' to match the function argument
    messages = [
        {"role": "system", "content": system_instruction},
        {"role": "user", "content": file_prompt}
    ]
    
    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.3, 
            max_tokens=1024, 
            top_p=1,
            stream=False
        )

        return completion.choices[0].message.content

    except Exception as e:
        # Simple logging for debugging on your server terminal
        print(f"Summarizer Error: {str(e)}") 
        return "ScholarShield AI summarization is currently unavailable. Please try again later."