import React, { useState } from 'react';
import "./QuestionForm.css"
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

export default function QuestionForm() {
  const [subject, setSubject] = useState('');
  const [mcq, setMcq] = useState(''); // To store the number of MCQs
  const [saq, setSaq] = useState(''); // To store the number of SAQs
  const [laq, setLaq] = useState(''); // To store the number of LAQs

  const {PYTHON_BACKEND_HOSTING_URL} = useAuth(); // Importing the backend hosting URL from the auth store
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the API
    const data = {
      subject,
      mcq: parseInt(mcq, 10), // Convert mcq to a number
      saq: parseInt(saq, 10), // Convert saq to a number
      laq: parseInt(laq, 10), // Convert laq to a number
    };

    // Call the API
    try {
      const response = await fetch(`${PYTHON_BACKEND_HOSTING_URL}/get_questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if(response.ok){
        console.log(responseData);
        
        navigate('/generate_question', {state: {responseData}})
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <div className="question-form-container">
      <h1>Generate Questions Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>No of Multiple Choice Questions (MCQ):</label>
          <input
            type="number"
            value={mcq}
            onChange={(e) => setMcq(e.target.value)}
            required
            min="0" // Optional: ensure the number is non-negative
          />
        </div>
        <div>
          <label>No of Short Answer Questions (SAQ):</label>
          <input
            type="number"
            value={saq}
            onChange={(e) => setSaq(e.target.value)}
            required
            min="0" // Optional: ensure the number is non-negative
          />
        </div>
        <div>
          <label>No of Long Answer Questions (LAQ):</label>
          <input
            type="number"
            value={laq}
            onChange={(e) => setLaq(e.target.value)}
            required
            min="0" // Optional: ensure the number is non-negative
          />
        </div>
        <button type="submit">Generate Questions</button>
      </form>
    </div>
  );
}
