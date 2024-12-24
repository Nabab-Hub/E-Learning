import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import './GenerateQuestion.css';
import { useLocation } from 'react-router-dom';


export default function GenerateQuestion() {
  const [questions, setQuestions] = useState({"subject": "",
    "mcq": [],
    "saq": [],
    "laq": []
  });
  const location = useLocation()
  const {responseData} = location.state || {}

//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Sample Content", 10, 10);
//     doc.save("questions.pdf");

//   };

// const getQuestions => ()

useEffect(() => {
  // console.log(responseData);
  setQuestions(responseData)
}, [])

const downloadPDF = () => {
    const doc = new jsPDF();
    const content = document.querySelector('.inner-container');
  
    // Temporarily remove the download button from the DOM to avoid including it in the PDF
    const downloadButton = document.querySelector('.download-button');
    downloadButton.style.display = 'none';
  
    // Define margins and starting position for content rendering
    const margin = 10;
    let currentY = margin;
  
    // Render Subject Heading
    doc.setFontSize(16);
    doc.text("Subject: " + questions.subject, margin, currentY);
    currentY += 10;
  
    // Render MCQ Section
    doc.setFontSize(12);
    doc.text("Multiple Choice Questions (MCQs)", margin, currentY);
    currentY += 10;
  
    questions.mcq.forEach((q, index) => {
      doc.text(`${index + 1}. ${q.question}`, margin, currentY);
      currentY += 10;
  
      q.options.forEach((option, i) => {
        doc.text(`${String.fromCharCode(65 + i)}. ${option}`, margin + 10, currentY);
        currentY += 6;
      });
  
      // Check if content exceeds the page, then add a new page
      if (currentY > doc.internal.pageSize.height - margin) {
        doc.addPage();
        currentY = margin;
      }
    });
  
    // Render SAQ Section
    doc.setFontSize(12);
    doc.text("Short Answer Questions (SAQs)", margin, currentY);
    currentY += 10;
  
    questions.saq.forEach((q, index) => {
      doc.text(`${index + 1}. ${q}`, margin, currentY);
      currentY += 10;
  
      // Check if content exceeds the page, then add a new page
      if (currentY > doc.internal.pageSize.height - margin) {
        doc.addPage();
        currentY = margin;
      }
    });
  
    // Render LAQ Section
    doc.setFontSize(10); // Reduce font size for LAQs to fit the content
    doc.text("Long Answer Questions (LAQs)", margin, currentY);
    currentY += 10;
  
    questions.laq.forEach((q, index) => {
      const splitText = doc.splitTextToSize(`${index + 1}. ${q}`, doc.internal.pageSize.width - 2 * margin);
      splitText.forEach((line, i) => {
        doc.text(line, margin, currentY);
        currentY += 6;
  
        // Check if content exceeds the page, then add a new page
        if (currentY > doc.internal.pageSize.height - margin) {
          doc.addPage();
          currentY = margin;
        }
      });
  
      // Check if content exceeds the page, then add a new page after the last question
      if (currentY > doc.internal.pageSize.height - margin) {
        doc.addPage();
        currentY = margin;
      }
    });
  
    // After rendering, restore the download button
    downloadButton.style.display = 'block';
  
    // Save the PDF
    doc.save('questions.pdf');
  };
  
  return (
    <div className="outer-container-generate-ques">
      <div className="inner-container">
        <h1 className="form-heading">Generate Questions Form</h1>
        <h2 className="subject-heading">{questions.subject}</h2>

        {/* MCQs Section */}
        <div>
          <h2>Multiple Choice Questions (MCQs)</h2>
          <ul>
            {questions.mcq.map((q, index) => (
              <li key={index}>
                {`${index+1}. ${q.question}`}
                <div className="options" style={{textAlign: 'left'}}>
                  {q.options.map((option, i) => (
                    <div key={i}>
                      {String.fromCharCode(65 + i)}. {option}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* SAQs Section */}
        <div>
          <h2>Short Answer Questions (SAQs)</h2>
          <ul style={{textAlign: 'left'}}>
            {questions.saq.map((q, index) => (
              <li key={index}>{`${index+1}. ${q}`}</li>
            ))}
          </ul>
        </div>

        {/* LAQs Section */}
        <div>
          <h2>Long Answer Questions (LAQs)</h2>
          <ul style={{textAlign: 'left'}}>
            {questions.laq.map((q, index) => (
              <li key={index}>{`${index+1}. ${q}`}</li>
            ))}
          </ul>
        </div>

        {/* Download Button */}
        <button className="download-button" onClick={downloadPDF}>
          Download as PDF
        </button>
      </div>
    </div>
  );
}
