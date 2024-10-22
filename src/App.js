import React, { useState } from 'react';
import './App.css';
import AddProjectForm from './components/addProjectForm';

function App() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
    setShowForm(false);
  };

  return (
    <div className="App">
      <h1>Project Showcase</h1>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-thumbnail">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <img src={project.image} alt={project.name} className="project-img" />
            </a>
          </div>
        ))}
        {!showForm && (
          <button className="add-button" onClick={() => setShowForm(true)}>
            +
          </button>
        )}
      </div>
      {showForm && <AddProjectForm onSubmit={handleAddProject} />}
    </div>
  );
}

export default App;
