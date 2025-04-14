from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import CaseInput, ClassificationOutput,CrimeResult,CaseQuery
from classify import classify_stage_1, classify_stage_2
from agentic_backend import search_crimes_service


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with the actual origin(s) you want to allow
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
    
    # Format results
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
def health_check():
    return {"status": "healthy"}
