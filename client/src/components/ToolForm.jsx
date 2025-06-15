import React, { useState, useEffect } from 'react';
import { Save, X, Code2, Globe, Database, Terminal, Palette, Settings, Loader2, Plus } from 'lucide-react';
import api from '../api';
import './ToolsForm.css';

const ToolForm = ({ tool, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  const categories = [
    { value: 'Development', icon: Code2, label: 'Development' },
    { value: 'Design', icon: Palette, label: 'Design' },
    { value: 'Database', icon: Database, label: 'Database' },
    { value: 'Deployment', icon: Globe, label: 'Deployment' },
    { value: 'Terminal', icon: Terminal, label: 'Terminal' },
    { value: 'Utilities', icon: Settings, label: 'Utilities' },
    { value: 'Productivity', icon: Plus, label: 'Productivity' },
    { value: 'Communication', icon: Plus, label: 'Communication' },
    { value: 'Analytics', icon: Plus, label: 'Analytics' },
    { value: 'Acadamic', icon: Plus, label: 'Acadamic' },
    { value: 'Other', icon: Plus, label: 'Other' }
  ];

  useEffect(() => {
    if (isEditing && tool) {
      setFormData({
        name: tool.name || '',
        description: tool.description || '',
        url: tool.url || '',
        category: tool.category || ''
      });
    }
  }, [tool, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let response;
      if (isEditing && tool) {
        response = await api.put(`/tools/${tool.id}`, formData);
        setSuccess('Tool updated successfully!');
      } else {
        response = await api.post('/tools', formData);
        setSuccess('Tool added successfully!');
      }
      
      onSubmit(response.data);
      
      // Reset form if creating new tool
      if (!isEditing) {
        setFormData({
          name: '',
          description: '',
          url: '',
          category: ''
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while saving the tool');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (categoryValue) => {
    const category = categories.find(cat => cat.value === categoryValue);
    return category ? category.icon : Plus;
  };

  return (
    <div className="tools-form-container">
      <div className="background-pattern"></div>
      
      <div className="floating-blob floating-blob-1"></div>
      <div className="floating-blob floating-blob-2"></div>
      
      <div className="tools-form-wrapper">
        <div className="tools-form-header">
          <div className="logo-container">
            {isEditing ? <Settings size={32} /> : <Plus size={32} />}
          </div>
          <h1 className="form-title">
            {isEditing ? 'Edit Tool' : 'Add New Tool'}
          </h1>
          <p className="form-subtitle">
            {isEditing ? 'Update your development tool' : 'Add a tool to your collection'}
          </p>
        </div>

        <div className="tools-form-card">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="tools-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Tool Name *
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter tool name"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <div className="input-wrapper">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter tool description"
                  className="form-textarea"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="url" className="form-label">
                URL *
              </label>
              <div className="input-wrapper">
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category *
              </label>
              <div className="select-wrapper">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className={`submit-button ${loading ? 'loading' : ''}`}
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="spinner" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>{isEditing ? 'Update Tool' : 'Add Tool'}</span>
                  </>
                )}
              </button>
              
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="cancel-button"
                >
                  <X size={20} />
                  <span>Cancel</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ToolForm;