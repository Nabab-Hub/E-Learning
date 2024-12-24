import React from "react";
import "./TeacherPortal.css";
import { useNavigate } from "react-router-dom";

export default function TeacherPortal() {
  const navigate = useNavigate();
  return (
    <div className="teacherportal">
      {/* <div className="teacher-portal-container"> */}
        <div className="portal-box">
          <h2>Teacher Portal</h2>
          <div className="option-box">
          <div className="option">
              <h3>Attendence Sheet</h3>
            </div>
            <div className="option">
              <h3>Start Live Session</h3>
            </div>
            <div className="option">
              <h3>Upload class notes</h3>
            </div>
            <div className="option">
              <h3 onClick={() => navigate('/question_form')}>Auto Question Generator</h3>
            </div>
            {/* <div className="option">
              <h3>Upload Mock Test</h3>
            </div> */}
            <div className="option">
              <h3>Check Answer Sheets</h3>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}
