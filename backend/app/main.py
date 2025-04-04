from fastapi import FastAPI
from app.model import CaseInput, ClassificationOutput
from app.classify import classify_stage_1, classify_stage_2

app = FastAPI()

@app.post("/classify", response_model=ClassificationOutput)
def classify_case(case_input: CaseInput):
    stage_1_class = classify_stage_1(case_input.case)
    stage_2_class = classify_stage_2(case_input.case, stage_1_class)
    return {
        "stage_1_class": stage_1_class,
        "stage_2_class": stage_2_class
    }
