import React from "react";
import "./AdminPortal.css";

export default function AdminPortal() {
  return (
    <div className="adminportal">
      {/* <div className="teacher-portal-container"> */}
        <div className="portal-box">
          <h2>Admin Portal</h2>
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
              <h3>Check Feedback Forms</h3>
            </div>
            <div className="option">
              <h3>Teacher Acc. Creation</h3>
            </div>
            <div className="option">
              <h3>Host Meetings</h3>
            </div>
            {/* <div className="option">
              <h3>Release Examination Form</h3>
            </div> */}
            <div className="option">
              <h3>Manage Teacher Accounts</h3>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}
