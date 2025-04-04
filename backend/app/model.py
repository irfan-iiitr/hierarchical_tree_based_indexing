from pydantic import BaseModel

class CaseInput(BaseModel):
    case: str

class ClassificationOutput(BaseModel):
    stage_1_class: str
    stage_2_class: str
