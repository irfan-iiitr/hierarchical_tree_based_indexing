from pydantic import BaseModel

class CaseInput(BaseModel):
    case: str

class ClassificationOutput(BaseModel):
    classification: str
