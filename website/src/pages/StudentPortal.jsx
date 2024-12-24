import React from "react";
import "./StudentPortal.css";
import { useNavigate } from "react-router-dom";

export default function StudentPortal() {

  const navigate = useNavigate()

  return (
    <div className="studentportal">
      {/* <div className="teacher-portal-container"> */}
        <div className="portal-box">
          <h2>Student Portal</h2>
          {/* drop downs */}
          <div className="dropdown">
            {/* <button className="dropbtn">Select Class</button> */}
            {/* <div className="dropdown-content" style={{
                display: "flex",
                justifyContent: 'space-evenly',
                marginBottom: '2rem'
            }}>
                <select name="" id="">
                    <option value="">BCA</option>
                    <option value="">B Tech</option>
                    <option value="">AI/ML</option>
                </select>
                <select name="" id="">
                    <option value="">Section A</option>
                    <option value="">Section B</option>
                    <option value="">Section C</option>
                </select>
            </div> */}

            </div>
          <div className="option-box">
            <div className="option">
              <h3>Join Live Session</h3>
            </div>
            <div className="option">
              <h3>Open Pre-recorded Sessions</h3>
            </div>
            <div className="option">
              <h3>Open / Download Class Notes</h3>
            </div>
            <div className="option">
              <h3>Give Mock Test & Submit</h3>
            </div>
            <div className="option">
              <h3 onClick={() => navigate('/code_editor')}>Online Code Compiler</h3>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}
