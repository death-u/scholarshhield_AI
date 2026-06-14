import json
import re
from django.conf import settings
from groq import Groq


def generate_quiz_from_ai(text: str):
    """
    Generates 5 MCQ questions from note text.
    Returns parsed JSON list.
    """

    client = Groq(
        api_key=settings.KEY_SUM2_GROQ
    )

    prompt = f"""
You are ScholarShield AI.

Based strictly on the study notes below,
generate EXACTLY 5 multiple choice questions.

Rules:
- Each question must have 4 options labeled A, B, C, D
- Only ONE correct answer
- Return ONLY valid JSON
- No explanation
- No markdown
- No commentary

Format:

[
  {{
    "question": "Question text",
    "options": {{
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    }},
    "answer": "A"
  }}
]

Study Notes:
{text[:4000]}
"""

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=1200,
        )

        raw_output = completion.choices[0].message.content.strip()

        match = re.search(r"\[.*\]", raw_output, re.DOTALL)
        if match:
            parsed = json.loads(match.group())
            return parsed

        return []

    except Exception as e:
        print("Quiz Generation Error:", str(e))
        return []