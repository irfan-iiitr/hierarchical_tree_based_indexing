import os
from dotenv import load_dotenv
from groq import Groq
from llama_index.llms.groq import Groq as LlamaGroq

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = "llama3-70b-8192"

llm = LlamaGroq(model=MODEL_NAME, api_key=GROQ_API_KEY)
