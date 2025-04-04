import os
from dotenv import load_dotenv
from groq import Groq
from llama_index.llms.groq import Groq as LlamaGroq

load_dotenv()

GROQ_API_KEY = "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"
MODEL_NAME = "llama3-70b-8192"

llm = LlamaGroq(model=MODEL_NAME, api_key=GROQ_API_KEY)
