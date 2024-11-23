from pydantic import BaseModel
from typing import List
from datetime import datetime

class AnalysisBase(BaseModel):
    resume_text: str
    job_description: str
    match_score: float
    recommendations: List[str]

class AnalysisCreate(AnalysisBase):
    pass

class Analysis(AnalysisBase):
    id: int
    created_at: datetime
    updated_at: datetime | None

    class Config:
        from_attributes = True