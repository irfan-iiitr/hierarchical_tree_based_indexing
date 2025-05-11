from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
async def search_crimes(query: CaseQuery):
    results = search_crimes_service(query.query)

    formatted_results = [
        CrimeResult(
            crime_text=result.page_content,
            penalty=result.metadata['Punishment'],
            section=result.metadata['Section'],
            cognizable=result.metadata['Cognizable'],
            bailable=result.metadata['Bailable'],
            court=result.metadata['Court']
        )
        for result in results
    ]

    return formatted_results

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}
