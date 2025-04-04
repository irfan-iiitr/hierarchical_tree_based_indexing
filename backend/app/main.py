from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.model import CaseInput, ClassificationOutput
from app.classify import classify_stage_1, classify_stage_2

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
