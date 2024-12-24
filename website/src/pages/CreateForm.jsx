import React, { useState } from 'react';
import "./CreateForm.css"

export default function CreateForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  // Generate a shareable URL (query parameters for sharing the form data)
  const generateShareLink = () => {
    const encodedData = encodeURIComponent(JSON.stringify(formData));
    const shareableLink = `${window.location.origin}/share?data=${encodedData}`;
    console.log('Generated Shareable Link:', shareableLink);
    return shareableLink;
  };

  // Copy the shareable link to the clipboard
  const handleCopyLink = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link)
      .then(() => alert('Shareable link copied to clipboard!'))
      .catch((error) => console.error('Error copying link:', error));
  };

  return (
    <div className="form-container">
      <h1>Form with Sharing Option</h1>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>
        
        <button type="submit">Submit</button>
      </form>
      
      {/* Sharing Option */}
      <div className="share-option">
        <button onClick={handleCopyLink}>Generate Shareable Link</button>
      </div>
    </div>
  );
}
