from fastapi import FastAPI
from app.model import CaseInput, ClassificationOutput
from app.classify import classify_case

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Criminal Case Classification API"}

@app.post("/classify", response_model=ClassificationOutput)
def classify(case_input: CaseInput):
    result = classify_case(case_input.case)
    return {"classification": result}
