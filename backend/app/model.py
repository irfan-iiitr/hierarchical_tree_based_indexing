from pydantic import BaseModel

class CaseInput(BaseModel):
    case: str

class ClassificationOutput(BaseModel):
    stage_1_class: str
    stage_2_class: str

class CrimeResult(BaseModel):
    crime_text: str
    penalty: str
    section: str
    cognizable: str
    bailable: str
    court: str

class CaseQuery(BaseModel):
    query: str
