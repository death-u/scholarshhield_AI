import json
from django.conf import settings
from groq import Groq

def process_note_with_ai(extracted_text: str) -> dict:
    """
    Analyzes academic text and returns a structured JSON object 
    for ScholarShield Note cards.
    """
    client = Groq(api_key=settings.KEY_SUM2_GROQ)

    # The Prompt: Instruct the AI to act as a data formatter
    system_instruction = """
    You are an expert Academic Note Assistant. 
    Analyze the provided text and output ONLY a valid JSON object. 
    Do not include any conversational text or markdown code blocks outside the JSON.

    Required JSON Structure:
    {
        "topic": "A professional, academic title for this note",
        "tags": ["Tag1", "Tag2", "Tag3"],
        "summary": "A 3-bullet point markdown summary (e.g., '- Point 1\n- Point 2\n- Point 3')"
    }
    """

    messages = [
        {"role": "system", "content": system_instruction},
        {"role": "user", "content": f"Analyze this text: {extracted_text}"}
    ]

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.2, # Lower temperature for better JSON accuracy
            response_format={"type": "json_object"} # Force JSON mode
        )

        # Parse the response
        content = completion.choices[0].message.content
        return json.loads(content)

    except Exception as e:
        print(f"Note Processor Error: {str(e)}")
        # Fallback dictionary if the AI fails
        return {
            "topic": "Untitled Note",
            "tags": ["General"],
            "summary": "- Error processing note content."
        }