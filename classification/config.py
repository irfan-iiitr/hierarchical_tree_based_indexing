import os
import dotenv

config = {
    "GROQ_API_KEY": os.getenv("GROQ_API_KEY"),
    "model_name": "llama3-70b-8192"
}