import React, { useState, useEffect } from 'react';
import api from '../api'; 
import ToolForm from './ToolForm';
import './ToolList.css';

const ToolList = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const categories = [
    'Development',
    'Design',
    'Productivity',
    'Communication',
    'Database',
    'Analytics',
    'Utilities',
    'Analytics',
    'Acadamic',
    'Other'
  ];

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tools');
      setTools(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch tools');
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/login'; 
  };

  const handleAddTool = (newTool) => {
    setTools(prev => [...prev, newTool]);
    setShowForm(false);
  };

  const handleUpdateTool = (updatedTool) => {
    setTools(prev => prev.map(tool => 
      tool.id === updatedTool.id ? updatedTool : tool
    ));
    setEditingTool(null);
  };

  const handleDeleteTool = async (toolId) => {
    if (!window.confirm('Are you sure you want to delete this tool?')) {
      return;
    }

    try {
      await api.delete(`/tools/${toolId}`);
      setTools(prev => prev.filter(tool => tool.id !== toolId));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete tool');
    }
  };

  const handleEditTool = (tool) => {
    setEditingTool(tool);
    setShowForm(false);
  };

  const cancelEdit = () => {
    setEditingTool(null);
  };

  const closeModal = () => {
    setShowForm(false);
    setEditingTool(null);
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || tool.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading tools...</div>
      </div>
    );
  }

  return (
    <div className="tools-container">
         <button onClick={handleLogout} className="btn btn-logout">
            Logout
          </button>
      <div className="tools-background"></div>

      <div className="tools-wrapper">
        <div className="tools-header">
          <h1 className="tools-title">My Tools</h1>

        
          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          <div className="tools-controls">
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-primary"
            >
              {showForm ? 'Cancel' : '+ Add New Tool'}
            </button>
            
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

    
        {(showForm || editingTool) && (
          <div className="modal">
            <div className="modal-content">
              <ToolForm
                tool={editingTool}
                onSubmit={editingTool ? handleUpdateTool : handleAddTool}
                onCancel={closeModal}
                isEditing={!!editingTool}
              />
            </div>
          </div>
        )}

        {/* Tools List */}
        {filteredTools.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛠️</div>
            <p className="empty-text">
              {tools.length === 0 ? 'No tools added yet.' : 'No tools match your search criteria.'}
            </p>
            {tools.length === 0 && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary"
              >
                Add Your First Tool
              </button>
            )}
          </div>
        ) : (
          <div className="tools-grid">
            {filteredTools.map(tool => (
              <div key={tool.id} className="tool-card">
                <div className="tool-card-header">
                  <div className="tool-info">
                    <h3 className="tool-name">{tool.name}</h3>
                    <span className="tool-category">{tool.category}</span>
                  </div>
                </div>
                
                {tool.description && (
                  <p className="tool-description">{tool.description}</p>
                )}
                
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-url"
                >
                  {tool.url}
                </a>
                                
                <div className="tool-actions">
                  <button
                    onClick={() => handleEditTool(tool)}
                    className="btn btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTool(tool.id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-visit"
                  >
                    Visit
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolList;