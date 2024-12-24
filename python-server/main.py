from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from code_execution_helper import execute_code_helper
from generate_questions_helper import get_questions

app = FastAPI(title="E-Learning")

# Add CORS middleware to allow only requests from localhost:3000
origins = [
    "http://localhost:5173",  # Allow only this origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Restrict to specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Input model for the request body
class CodeExecutionRequest(BaseModel):
    language: str
    code: str

# Request model to validate the incoming data
class QuestionRequest(BaseModel):
    subject: str
    no_of_mcq: Optional[int] = 5
    no_of_saq: Optional[int] = 5
    no_of_laq: Optional[int] = 5


@app.post("/execute-code")
async def execute_code(request: CodeExecutionRequest):
    try:
        # Call the execute_code_helper function
        result = await execute_code_helper(request.language, request.code)

        # Return the output or error based on the result
        return result
    
    except ValueError as ve:
        # Handle specific ValueError exceptions (e.g., invalid parameters)
        raise HTTPException(status_code=400, detail=f"ValueError: {str(ve)}")
    
    except Exception as e:
        # Catch other general exceptions and log them
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


# Endpoint to generate questions
@app.post("/get_questions")
async def generate_questions(request: QuestionRequest):
    try:
        # Call the get_questions function
        questions = get_questions(
            sub=request.subject,
            no_of_mcq=request.no_of_mcq,
            no_of_saq=request.no_of_saq,
            no_of_laq=request.no_of_laq
        )
        
        # Check if the result is empty or contains an error message
        if 'message' in questions:
            raise HTTPException(status_code=400, detail=questions['message'])

        return questions
    
    except ValueError as ve:
        # Handle specific ValueError exceptions (e.g., invalid parameters)
        raise HTTPException(status_code=400, detail=f"ValueError: {str(ve)}")
    
    except Exception as e:
        # Catch other general exceptions and log them
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")
