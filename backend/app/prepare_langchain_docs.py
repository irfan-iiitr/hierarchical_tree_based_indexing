import os
import pandas as pd

from langchain_core.documents import Document

def prepare_langchain_documents(csv_file_path):
    
    print("Reading CSV file...")
    try:
        dataframe = pd.read_csv(csv_file_path)
    except FileNotFoundError:
        print(f"File not found: {csv_file_path}")
        return None
    except pd.errors.EmptyDataError:
        print("CSV file is empty.")
        return None
    except pd.errors.ParserError:
        print("Error parsing CSV file.")
        return None
    except Exception as e:  
        print(f"An error occurred: {e}")
        return None
    
    print("CSV file read successfully!")
    
    
    print("Preparing documents for Langchain...")
    
    try:
        documents = []
        
        dataframe.fillna("", inplace=True)
        
        for index, row in dataframe.iterrows():
            
            try:
                doc = Document(
                    page_content = row["Offense"],
                    metadata = {
                        'Punishment': row["Punishment"],
                        'Section': row["Section"],
                        'Cognizable' : row["Cognizable"],
                        'Bailable' : row["Bailable"],
                        'Court' : row["Court"],
                    }
                )
            except KeyError as e:
                print(f"Wrong key present in the CSV file: {e}")
                return None
            except Exception as e:
                print(f"Error while preparing document at row {index}: {e}")
                continue
            
            documents.append(doc)
    
    except:
        print("Error while preparing documents for Langchain.")
        return None
        
    print(f"Prepared {len(documents)} documents for Langchain successfully!")
    
    return documents