import os

CONFIG = {
    "embedding_model_name": "sentence-transformers/all-MiniLM-L6-v2",
    "k": 5,
    "USE_GPU": True,
    "pinecone": {
        "environment": "us-east-1",  # e.g., "gcp-starter"
        "index_name": "crimes-index"
    }
}