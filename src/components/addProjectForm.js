import React, { useState } from 'react';

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
        setProjectImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: projectName,
      link: projectLink,
      description: projectDescription,
      image: projectImage,
    });
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
