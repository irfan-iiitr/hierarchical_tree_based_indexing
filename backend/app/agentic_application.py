import os
from dotenv import load_dotenv

from config import CONFIG
from prepare_langchain_docs import prepare_langchain_documents
from embedding_model import get_embedding_model
from vector_store import get_vector_store


def main(user_query):
    """
    Main function to implement the agentic application.
    """
    
    load_dotenv()
    
    ## CSV file path
    csv_file_path = "data/final_ipc.csv"
    if not os.path.exists(csv_file_path):
        print(f"CSV file not found: {csv_file_path}")
        return
    
    ## Prepare documents for Langchain
    documents = prepare_langchain_documents(csv_file_path)
    
    ## Getting the embedding model
    embedding_model = get_embedding_model()
    
    ## Getting the vector store
    vector_store = get_vector_store(documents, embedding_model)
    
    ## Query the vector store
    results = vector_store.similarity_search(user_query, k=CONFIG["k"])
    
    # Extract unique results based on page_content
    unique_results = []
    seen_contents = set()
    for result in results:
        if result.page_content not in seen_contents:
            unique_results.append(result)
            seen_contents.add(result.page_content)
    
    results = unique_results
    
    print(f"Top {CONFIG['k']} results for query '{user_query}':")
    for i, result in enumerate(results):
        print(f"Result {i+1}:")
        print(f"Crime Text: {result.page_content}")
        print(f"Penalty: {result.metadata['Punishment']}")
        print(f"Section: {result.metadata['Section']}")
        print(f"Cognizable: {result.metadata['Cognizable']}")
        print(f"Bailable: {result.metadata['Bailable']}")
        print(f"Court: {result.metadata['Court']}")
        print()
        
    return results
        
if __name__ == "__main__":
    user_query = input("Enter your crime: ")
    main(user_query)
    