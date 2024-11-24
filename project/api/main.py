import json
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services import pdf_service, analysis_service

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JobDescription(BaseModel):
    text: str

@app.post("/api/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    service = analysis_service.CVAnalysisService()
    try:
        # Extract text from PDF
        resume_text = await pdf_service.extract_text(resume)
        print("Resume text:", resume_text)

        # Parse job description JSON
        job_description_data = json.loads(job_description)
        job_description_text = job_description_data['text']
        
        # Generate recommendations
        recommendations = service.get_recommendations(
            resume_text,
            job_description_text
        )
        
        return {
            "recommendations": recommendations
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)