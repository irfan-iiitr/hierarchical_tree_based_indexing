import os

from langchain_community.vectorstores import Chroma

from app.config import CONFIG


def get_vector_store(documents, embedding_model):
    
    persist_directory = CONFIG["chroma_persist_directory"]
    
    print(f"Persist directory: {persist_directory}")
    
    print(f"Loading vector store ...")
    try:
        vector_store = Chroma.from_documents(
            persist_directory=persist_directory,
            embedding=embedding_model,
            documents=documents,
        )
        
        print(f"Vector Store created with {vector_store._collection.count()} documents.")
        print(f"Vector Store loaded successfully.")
        
        return vector_store
    
    except Exception as e:
        print(f"Error loading vector store: {e}")
        return None
    
    