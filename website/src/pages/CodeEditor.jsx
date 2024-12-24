import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import { useAuth } from "../store/auth";

const CodeEditor = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const { PYTHON_BACKEND_HOSTING_URL } = useAuth();

  const runCode = async () => {
    try {
      const response = await fetch(
        `${PYTHON_BACKEND_HOSTING_URL}/execute-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ language, code }),
        }
      );

      const data = await response.json();
      if (data.output) {
        setOutput(data.output);
      } else if (data.error) {
        setOutput(`Error: ${data.error}`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="code_editor_page">
      <div className="editor-container">
        {/* Language Selector */}
        <div className="language-selector">
          <label htmlFor="language">Select Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
          </select>
        </div>

        {/* Split view */}
        <div className="split-view">
          {/* Monaco Editor (Left Side) */}
          <div className="editor-wrapper">
            <Editor
              height="100%"
              width="100%"
              theme="vs-dark"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
            />
          </div>

          {/* Terminal/Output Section (Right Side) */}
          <div className="output-box" style={{textAlign: 'left'}}>
            <h3>Output:</h3>
            <pre>{output}</pre>
          </div>
        </div>

        {/* Run Button */}
        <button className="run-button" onClick={runCode}>
          Run Code
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
