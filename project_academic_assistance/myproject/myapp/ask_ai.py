# from myproject import settings
# import requests

# def ask_ai(prompt, user_name="Student", history=None):
#     if history is None:
#         history = []
        
#     API_URL = "https://router.huggingface.co/v1/chat/completions"
#     headers = {"Authorization": f"Bearer {settings.my_hugging_key1}"}

#     system_instruction = f"""
#     You are ScholarShield AI, a highly intelligent and supportive academic assistant. 
#     You are talking to {user_name}. 
#     Your goal is to help them with academic tasks, explain complex concepts simply, 
#     and provide encouraging, professional, and accurate guidance. 
#     Always address the user by their name: {user_name}.
#     """

#     # Start with the system instruction
#     messages = [{"role": "system", "content": system_instruction}]
    
#     # Append the chat history array if it exists
#     for turn in history:
#         messages.append(turn)
        
#     # Append the current prompt
#     messages.append({"role": "user", "content": prompt})

#     payload = {
#         "messages": messages,
#         "model": "meta-llama/Llama-3.3-70B-Instruct:groq"
#     }

#     response = requests.post(API_URL, headers=headers, json=payload)
    
#     if response.status_code == 200:
#         data = response.json()
#         return data['choices'][0]['message']['content']
#     else:
#         return f"ScholarShield AI is currently undergoing maintenance. Error code: {response.status_code}"

from myproject import settings
from groq import Groq


def ask_ai(prompt, user_name="Student", history=None, department="", level=""):

    if history is None:
        history = []

    client = Groq(
        api_key=settings.GROQ_API_KEY
    )

    system_instruction = f"""
    You are ScholarShield AI, a highly intelligent and supportive academic assistant.

    You are talking to {user_name}.

    Your goal is to help them with academic tasks,
    explain complex concepts simply,
    and provide encouraging, professional,
    and accurate guidance.

    Always address the user by their name: {user_name}.
    also note that the user department is: {department} ans the user level is:{level}.
    and note that the producer of this platform and everything is "Ngadi success" mention him only when necessary, so if you need to refer to the producer of this platform, refer to him as "Ngadi success" and always be respectful when referring to him thanks.
    """

    messages = [
        {
            "role": "system",
            "content": system_instruction
        }
    ]

    # Add previous chat history
    messages.extend(history)

    # Add current user prompt
    messages.append(
        {
            "role": "user",
            "content": prompt
        }
    )

    try:

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.7,
            max_completion_tokens=1024,
            top_p=1,
            stream=False
        )

        return completion.choices[0].message.content

    except Exception as e:
        return f"ScholarShield AI is currently unavailable. Error: {str(e)}"