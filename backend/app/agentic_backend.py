import os
from fastapi import HTTPException
from dotenv import load_dotenv

from app.config import CONFIG
from app.prepare_langchain_docs import prepare_langchain_documents
from app.embedding_model import get_embedding_model
from app.vector_store import get_vector_store

def search_crimes_service(query: str):
    """
    Service function to handle crime search logic
    """
    try:
        load_dotenv()
        base_dir = os.path.dirname(os.path.abspath(__file__))
        csv_file_path = os.path.join(base_dir, "final_ipc.csv")
        if not os.path.exists(csv_file_path):
            print(f"CSV file not found at {csv_file_path}.")
            raise HTTPException(status_code=404, detail="CSV file not found")
        
        documents = prepare_langchain_documents(csv_file_path)
        embedding_model = get_embedding_model()
        vector_store = get_vector_store(documents, embedding_model)
        
        results = vector_store.similarity_search(query, k=CONFIG["k"])
        
        # Extract unique results
        unique_results = []
        seen_contents = set()
        for result in results:
            if result.page_content not in seen_contents:
                unique_results.append(result)
                seen_contents.add(result.page_content)
        
        return unique_results
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))