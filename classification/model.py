import os
from config import config
from typing import Any
from groq import Groq
from llama_index.llms.groq import Groq

def get_llm(model_name) -> Any:
    
    llm = Groq(
        model = model_name,
        api_key = config["GROQ_API_KEY"]
    )
    
    return llm

def llm_inference(llm: Any, prompt: str) -> str:
    
    response = llm.complete(prompt)
    return response