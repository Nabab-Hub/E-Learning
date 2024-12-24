import google.generativeai as genai
from PIL import Image
import os
import json
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# Initialize the model
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

def generate_prompt(sub, mcq=5, saq=5, laq=5):
    prompt = f'''
You are an expert question set generator with a deep understanding of various subjects. Your task is to generate a set of high-quality questions for the user’s specified topic.

- The subject you will generate questions for is: {sub}
- You need to generate {mcq} multiple-choice questions (MCQs) that challenge the user's understanding and test key concepts of the subject.
- You need to generate {saq} short answer questions (SAQs) that focus on critical facts and concepts.
- You need to generate {laq} long answer questions (LAQs) that encourage detailed explanations and comprehensive understanding of the subject.

Your output should be in the following JSON format:

```json
{{
    "subject": "{sub}",
    "mcq": [
        {{"question": "question", "options": ["option1", "option2", ...]}},
        {{"question": "question", "options": ["option1", "option2", ...]}},
        ...
    ],
    "saq": [
        "Question 1",
        "Question 2",
        ...
    ],
    "laq": [
        "Question 1",
        "Question 2",
        ...
    ]
}}
```

Ensure that each question type (MCQ, SAQ, LAQ) is clear, relevant to the topic, and well-formulated. Make sure to avoid any ambiguity or confusing wording in your questions.
'''

    return prompt
def generate_question(prompt):
    try:
        # Attempt to generate content based on the provided prompt
        response = model.generate_content(prompt)
        
        # Check if the response is valid and contains the expected 'text' field
        if response and hasattr(response, 'text'):
            return response.text
        else:
            raise ValueError("The response is missing the expected 'text' field.")
    
    except AttributeError as e:
        # Handle cases where 'model' or 'generate_content' is not properly defined
        return f"Error: There was an issue accessing the model's generate_content method. {e}"
    
    except ValueError as e:
        # Handle issues related to missing or invalid response attributes
        return f"Error: {e}"
    
    except Exception as e:
        # Catch any other unexpected errors
        return f"An unexpected error occurred: {e}"


def preprocess_data(questions):
    string_to_dict = {}
    try:
        # Ensure that the '```' markers are present and properly split the string
        if '```' not in questions:
            raise ValueError("The input string is missing '```' markers for JSON data.")
        
        # Attempt to split and clean the string for JSON processing
        json_str = questions.split('```')[1].replace('json', '').strip()
        
        # Try parsing the cleaned string as JSON
        string_to_dict = json.loads(json_str)
        
    except ValueError as ve:
        # Handle the case where the input string doesn't have the correct format or is missing '```'
        string_to_dict = {'message': f"ValueError: {ve}"}
        print(f"ValueError: {ve}")
    
    except json.JSONDecodeError as e:
        # Handle cases where JSON parsing fails
        string_to_dict = {'message': f"JSONDecodeError: Failed to parse JSON. {e}"}
        print(f"JSONDecodeError: {e}")
    
    except Exception as e:
        # Catch all other exceptions and log them
        string_to_dict = {'message': f"An unexpected error occurred: {e}"}
        print(f"Unexpected error: {e}")
    
    return string_to_dict

def get_questions(sub, no_of_mcq=5, no_of_saq=5, no_of_laq=5):
    try:
        # Step 1: Generate the prompt for the specified subject
        prompt = generate_prompt(sub, no_of_mcq, no_of_saq, no_of_laq)
        
        if not prompt:
            raise ValueError("The generated prompt is empty or invalid.")

        # Step 2: Generate questions based on the prompt
        raw_question = generate_question(prompt)
        
        if not raw_question:
            raise ValueError("The response from generate_question is empty or invalid.")
        
        # Step 3: Preprocess the raw question data
        questions = preprocess_data(raw_question)
        
        if not questions:
            raise ValueError("The processed questions are empty or invalid.")
        
        return questions
    
    except ValueError as ve:
        # Catching value errors raised for invalid prompt or question data
        print(f"ValueError: {ve}")
        return {'message': f"ValueError: {ve}"}
    
    except Exception as e:
        # Catching any other unexpected errors
        print(f"Unexpected error: {e}")
        return {'message': f"An unexpected error occurred: {e}"}


def generate_question(prompt):
    try:
        # Attempt to generate content based on the provided prompt
        response = model.generate_content(prompt)
        
        # Check if the response is valid and contains the expected 'text' field
        if response and hasattr(response, 'text'):
            return response.text
        else:
            raise ValueError("The response is missing the expected 'text' field.")
    
    except AttributeError as e:
        # Handle cases where 'model' or 'generate_content' is not properly defined
        return f"Error: There was an issue accessing the model's generate_content method. {e}"
    
    except ValueError as e:
        # Handle issues related to missing or invalid response attributes
        return f"Error: {e}"
    
    except Exception as e:
        # Catch any other unexpected errors
        return f"An unexpected error occurred: {e}"


def preprocess_data(questions):
    string_to_dict = {}
    try:
        # Ensure that the '```' markers are present and properly split the string
        if '```' not in questions:
            raise ValueError("The input string is missing '```' markers for JSON data.")
        
        # Attempt to split and clean the string for JSON processing
        json_str = questions.split('```')[1].replace('json', '').strip()
        
        # Try parsing the cleaned string as JSON
        string_to_dict = json.loads(json_str)
        
    except ValueError as ve:
        # Handle the case where the input string doesn't have the correct format or is missing '```'
        string_to_dict = {'message': f"ValueError: {ve}"}
        print(f"ValueError: {ve}")
    
    except json.JSONDecodeError as e:
        # Handle cases where JSON parsing fails
        string_to_dict = {'message': f"JSONDecodeError: Failed to parse JSON. {e}"}
        print(f"JSONDecodeError: {e}")
    
    except Exception as e:
        # Catch all other exceptions and log them
        string_to_dict = {'message': f"An unexpected error occurred: {e}"}
        print(f"Unexpected error: {e}")
    
    return string_to_dict

def get_questions(sub, no_of_mcq=5, no_of_saq=5, no_of_laq=5):
    try:
        # Step 1: Generate the prompt for the specified subject
        prompt = generate_prompt(sub, no_of_mcq, no_of_saq, no_of_laq)
        
        if not prompt:
            raise ValueError("The generated prompt is empty or invalid.")

        # Step 2: Generate questions based on the prompt
        raw_question = generate_question(prompt)
        
        if not raw_question:
            raise ValueError("The response from generate_question is empty or invalid.")
        
        # Step 3: Preprocess the raw question data
        questions = preprocess_data(raw_question)
        
        if not questions:
            raise ValueError("The processed questions are empty or invalid.")
        
        return questions
    
    except ValueError as ve:
        # Catching value errors raised for invalid prompt or question data
        print(f"ValueError: {ve}")
        return {'message': f"ValueError: {ve}"}
    
    except Exception as e:
        # Catching any other unexpected errors
        print(f"Unexpected error: {e}")
        return {'message': f"An unexpected error occurred: {e}"}
