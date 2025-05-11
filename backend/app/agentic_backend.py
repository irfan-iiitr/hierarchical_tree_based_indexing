import os
from dotenv import load_dotenv

from config import CONFIG
from prepare_langchain_docs import prepare_langchain_documents
from embedding_model import get_embedding_model
from pinecone_store import get_pinecone_store



def initialize_vector_store():
    """One-time initialization of Pinecone store with documents"""
    load_dotenv()
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_file_path = os.path.join(base_dir, "final_ipc.csv")
    
    documents = prepare_langchain_documents(csv_file_path)
    embedding_model = get_embedding_model()
    vector_store = get_pinecone_store(documents, embedding_model)
    return vector_store

def search_crimes_service(query: str):
    """Service function to handle crime search logic"""
    load_dotenv()
    embedding_model = get_embedding_model()
    vector_store = get_pinecone_store(embedding_model=embedding_model)
    
    results = vector_store.similarity_search(query, k=CONFIG["k"])
    
    # Extract unique results
    unique_results = []
    seen_contents = set()
    for result in results:
        if result.page_content not in seen_contents:
            unique_results.append(result)
            seen_contents.add(result.page_content)
    
    return unique_results
        