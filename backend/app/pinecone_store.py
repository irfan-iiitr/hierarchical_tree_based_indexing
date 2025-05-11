import os
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from config import CONFIG
from dotenv import load_dotenv
load_dotenv()

# Verify API key is available
api_key = os.getenv("PINECONE_API_KEY")
if not api_key:
    raise ValueError("PINECONE_API_KEY not found in environment variables")

# Create Pinecone client instance
pc = Pinecone(api_key=api_key)


def get_pinecone_store(documents=None, embedding_model=None):
    """Get or create Pinecone vector store"""
    try:
        index_name = CONFIG["pinecone"]["index_name"]
        region = CONFIG["pinecone"]["environment"]
        print("ndex name here", index_name)
        dimension = 384  # Adjust based on your embedding model

        print(pc.list_indexes().names())

        # Check if index exists; if not, create it
        if index_name not in pc.list_indexes().names():
            pc.create_index(
                name=index_name,
                dimension=dimension,
                metric="cosine",
                spec=ServerlessSpec(
                    cloud="aws",
                    region=region
                )
            )

        # Connect to the existing index
        index = pc.Index(index_name)

        # If documents and embedding_model are provided, add documents to the index
        if documents and embedding_model:
                vector_store = PineconeVectorStore.from_documents(
                    documents=documents,
                    embedding=embedding_model,
                    index_name=index_name
                )

        else:
            vector_store = PineconeVectorStore(
                embedding=embedding_model,
                index_name=index_name
            )


        print(f"✅ Successfully connected to Pinecone index: {index_name}")
        return vector_store

    except Exception as e:
        print(f"❌ Error with Pinecone store: {e}")
        return None
