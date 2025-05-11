import os
from dotenv import load_dotenv
from agentic_backend import initialize_vector_store

if __name__ == "__main__":
    # Initialize the vector store
    print("Starting vector store initialization...")
    vector_store = initialize_vector_store()
    
    if vector_store:
        print("✅ Vector store initialized successfully!")
    else:
        print("❌ Failed to initialize vector store!")