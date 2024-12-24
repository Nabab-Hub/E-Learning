import subprocess
import os
from typing import Dict

# Function to handle code execution for different languages
async def execute_code_helper(language: str, code: str) -> Dict[str, str]:
    language = language.lower()

    # Supported languages and their file extensions
    extensions = {
        "python": "py",
        "java": "java",
        "c": "c",
    }

    if language not in extensions:
        raise ValueError("Unsupported language!")

    # Temporary file to save the code
    file_extension = extensions[language]
    file_name = f"temp_code.{file_extension}"

    with open(file_name, "w") as code_file:
        code_file.write(code)

    # Commands to compile/execute the code
    commands = {
        "python": ["python", file_name],
        "java": ["javac", file_name, "&&", "java", file_name.split(".")[0]],
        "c": ["gcc", file_name, "-o", "temp_code.out", "&&", "temp_code.out"],
    }

    try:
        # Execute the code
        result = subprocess.run(
            commands[language],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=True,
            text=True,
        )
    except:
        pass

    try:
        # Delete temporary files after execution
        os.remove(file_name)
        if language == "c":
            os.remove("temp_code.out")
        elif language == "java":
            os.remove(file_name.replace(".java", ".class"))

        # Return the output or error
        if result.returncode == 0:
            return {"output": result.stdout.strip()}
        else:
            return {"error": result.stderr.strip()}

    except Exception as e:
        raise ValueError(f"An error occurred during code execution: {str(e)}")
