from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import traceback

try:
    from model import CaseInput, ClassificationOutput, CrimeResult, CaseQuery
    from classify import classify_stage_1, classify_stage_2
    from agentic_backend import search_crimes_service
except Exception as e:
    import traceback
    print("❌ An error occurred during import:")
    traceback.print_exc()
    raise e  # Let the app crash properly

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/classify", response_model=ClassificationOutput)
def classify_case(case_input: CaseInput):
    stage_1_class = classify_stage_1(case_input.case)
    stage_2_class = classify_stage_2(case_input.case, stage_1_class)
    return {
        "stage_1_class": stage_1_class,
        "stage_2_class": stage_2_class
    }


@app.post("/search_crimes", response_model=list[CrimeResult])
def search_crimes(query: CaseQuery):
    print("📥 Received search query:", query.query)

    try:
        results = search_crimes_service(query.query)
        print(f"✅ Search completed. {len(results)} results found.")

        formatted_results = [
            CrimeResult(
                crime_text=result.page_content,
                penalty=result.metadata.get('Punishment', 'N/A'),
                section=result.metadata.get('Section', 'N/A'),
                cognizable=result.metadata.get('Cognizable', 'N/A'),
                bailable=result.metadata.get('Bailable', 'N/A'),
                court=result.metadata.get('Court', 'N/A')
            )
            for result in results
        ]

        return formatted_results

    except Exception:
        print("❌ Error during /search_crimes request:")
        traceback.print_exc()
        return []
@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}
