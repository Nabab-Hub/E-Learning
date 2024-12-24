import React, { useState, useEffect } from 'react';
import './ViewFeedback.css';

export default function ViewFeedback() {
  const [feedbackForms, setFeedbackForms] = useState([]);

  // Simulate fetching feedback forms from an API
  useEffect(() => {
    // Sample static data simulating API response
    const fetchedFeedbackForms = [
      {
        id: 1,
        title: "Course Feedback Form",
        description: "Please provide feedback on the course content, structure, and teaching quality.",
        questions: [
          "How would you rate the overall course content?",
          "Was the pace of the course appropriate?",
          "How would you rate the instructor's teaching?",
          "Do you have any suggestions for improvement?"
        ]
      },
      {
        id: 2,
        title: "Event Feedback Form",
        description: "Help us improve future events by providing feedback on this one.",
        questions: [
          "How would you rate the event's organization?",
          "Were the event topics relevant to you?",
          "How would you rate the speakers?",
          "Would you attend future events?"
        ]
      }
    ];

    // Set the feedback forms state with fetched data
    setFeedbackForms(fetchedFeedbackForms);
  }, []);

  return (
    <div className="feedback-container">
      <h1 className="feedback-heading">Feedback Forms</h1>

      {/* Displaying the list of feedback forms */}
      <div className="feedback-list">
        {feedbackForms.map((form) => (
          <div key={form.id} className="feedback-card">
            <h2 className="feedback-title">{form.title}</h2>
            <p className="feedback-description">{form.description}</p>

            {/* Listing the questions */}
            <ul className="feedback-questions">
              {form.questions.map((question, index) => (
                <li key={index} className="feedback-question">
                  {index + 1}. {question}
                </li>
              ))}
            </ul>

            {/* Button to view or submit feedback */}
            <button className="feedback-btn">View Feedbacks</button>
          </div>
        ))}
      </div>
    </div>
  );
}
