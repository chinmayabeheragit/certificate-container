import React, { useState } from 'react';
import axios from 'axios';

const AddProjectForm = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectImage, setProjectImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImage(reader.result); // This is the data URL of the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      name: projectName,
      link: projectLink,
      description: projectDescription,
      image: projectImage, // This now holds the uploaded image data
    };

    try {
      // Send data to backend
      const response = await axios.post('http://localhost:5000/api/projects', projectData);
      onSubmit(response.data); // Add the newly created project to the projects array
    } catch (error) {
      console.error('Error adding project:', error);
    }

    // Clear form fields
    setProjectName('');
    setProjectLink('');
    setProjectDescription('');
    setProjectImage(null);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Project Link"
        value={projectLink}
        onChange={(e) => setProjectLink(e.target.value)}
        required
      />
      <textarea
        placeholder="Project Description"
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProjectForm;
