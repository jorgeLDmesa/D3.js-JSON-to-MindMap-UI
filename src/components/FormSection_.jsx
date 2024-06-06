import React, { useState } from 'react';
import './FormSection_.css';

const FormSection_ = ({ onGenerate }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsTyping(event.target.value !== '');
  };

  const handleGenerateClick = () => {
    try {
      const data = JSON.parse(inputValue);
      if (data.name && data.children) {
        onGenerate(data);
        setError('');
      } else {
        throw new Error('Invalid JSON structure');
      }
    } catch (e) {
      setError('Invalid JSON. Please check the format and try again.');
    }
  };

  return (
    <div className="form-section">
      <div className="example-text" style={{ display: isTyping ? 'none' : 'block' }}>
        <p>Ingrese un JSON válido para generar el mapa mental.</p>
        <pre>
          {`{
  "name": "Root",
  "children": [
    {
      "name": "Child 1",
      "children": [
        { "name": "Grandchild 1" },
        { "name": "Grandchild 2" }
      ]
    },
    {
      "name": "Child 2",
      "children": [
        { "name": "Grandchild 3" },
        { "name": "Grandchild 4" }
      ]
    }
  ]
}`}
        </pre>
      </div>
      <textarea
        className="overlay-textarea"
        placeholder="Escribe aquí..."
        value={inputValue}
        onChange={handleInputChange}
      ></textarea>
      <div className="button-container">
        <button type="button" onClick={handleGenerateClick}>Generar</button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FormSection_;
