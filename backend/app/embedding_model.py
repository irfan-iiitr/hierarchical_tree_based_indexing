import os
import torch

from langchain_huggingface import HuggingFaceEmbeddings
from config import CONFIG


def get_embedding_model():
    
    model_name = CONFIG["embedding_model_name"]
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model_kwargs = {"device": device}
    encode_kwargs = {"normalize_embeddings": True}
    
    try:
        print(f"Loading embedding model: {model_name}")
        embedding_model = HuggingFaceEmbeddings(
            model_name=model_name,
            model_kwargs=model_kwargs,
            encode_kwargs=encode_kwargs,
        )
        
        print(f"Loaded embedding model: {model_name}")
        print(f"Model kwargs: {model_kwargs}")
        print(f"Encode kwargs: {encode_kwargs}")
        print(f"Device: {model_kwargs['device']}")
        
        return embedding_model
        
    except Exception as e:
        print(f"Error loading embedding model: {e}")
        return None
    
    
    
    