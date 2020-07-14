import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    }); 
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo Repository ${Date.now()}`,
      url: "http://localhost:3333",
      techs: "React"
    });

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    let findRepositories = [];
    
    if(response.status === 204) {
      findRepositories = repositories.filter(repository => repository.id !== id);
    }

    setRepository(findRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (<li key={repository.id}>{repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
          ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
