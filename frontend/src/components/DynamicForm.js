import React, { useState } from 'react';
const DynamicForm = ({ formConfig, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      {formConfig.map((field, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};
export default DynamicForm;