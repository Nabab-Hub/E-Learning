import React, { useState } from 'react';
import './ExamScheduler.css';

export default function ExamScheduler() {
  const [examDetails, setExamDetails] = useState({
    examName: '',
    examDate: '',
    examTime: ''
  });

  const handleChange = (e) => {
    setExamDetails({
      ...examDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Exam Scheduled:', examDetails);
  };

  return (
    <div className="exam-scheduler-container">
      <div className="exam-scheduler-inner-container">
        <h1 className="exam-scheduler-heading">Schedule an Exam</h1>
        <form className="exam-scheduler-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="examName">Exam Name</label>
            <input
              type="text"
              id="examName"
              name="examName"
              value={examDetails.examName}
              onChange={handleChange}
              placeholder="Enter exam name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="examDate">Exam Date</label>
            <input
              type="date"
              id="examDate"
              name="examDate"
              value={examDetails.examDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="examTime">Exam Time</label>
            <input
              type="time"
              id="examTime"
              name="examTime"
              value={examDetails.examTime}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="exam-scheduler-btn">Schedule Exam</button>
        </form>
      </div>
    </div>
  );
}
