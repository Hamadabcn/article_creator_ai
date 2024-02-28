import openai
from dotenv import load_dotenv
import os
import requests
from langchain_community.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain_community.chat_models import ChatOpenAI

# Load environment variables from .env file
load_dotenv()

# Set OpenAI API key from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

stablediffusion_api_key = os.getenv('DREAMSTUDIO_KEY')
ENGINE_ID = 'stable-diffusion-xl-1024-v1-0'
API_HOST = 'https://api.stability.ai'

loader = TextLoader('questions.txt', encoding='utf-8')
index = VectorstoreIndexCreator().from_loaders([loader])


def modified_gpt(user_input):
    response = index.query(question=user_input, llm=ChatOpenAI())
    return response


def diffusion(prompt):
    response = requests.post(
        f"{API_HOST}/v1/generation/{ENGINE_ID}/text-to-image",
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {stablediffusion_api_key}"
        },
        json={
            "text_prompts": [
                {
                    "text": prompt
                }
            ],
            "cfg_scale": 7,
            "height": 1024,
            "width": 1024,
            "samples": 1,
            "steps": 30,
        },
    )

    data = response.json()
    return data["artifacts"][0]['base64']


def chatgpt(user_input, system_settings, chunk):
    if chunk:
        content = split_string_into_chunks(user_input, 3000)
    else:
        content = [user_input]
    for x in content:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": system_settings}, {"role": "user", "content": x}],
            stream=True
        )
        for y in response:
            if y.choices[0].finish_reason != "stop":
                yield y.choices[0].delta.content
        if len(content) != 1 and content[-1] != x:
            yield '\n'

        # Call OpenAI's API to get the response
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_settings},
                {"role": "user", "content": user_input}  # Add user input here
            ],
            stream=True
        )
        for y in response:
            if y.choices[0].finish_reason != "stop":
                yield y.choices[0].delta.content


def split_string_into_chunks(user_input, chunk_size):
    chunks = []
    string_length = len(user_input)
    for i in range(0, string_length, chunk_size):
        if i + chunk_size <= string_length:
            chunks.append(user_input[i:i+chunk_size])
        else:
            chunks.append(user_input[i:string_length])
    return chunks


def translate_keywords(user_input):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": 'You will be given a set of keywords. Translate them into English.'},
                  {"role": "user", "content": user_input}]
    )
    return response['choices'][0]['message']['content']


def transcribe_function(path):
    with open(path, "rb") as audio_file:
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
    return transcript['text']
