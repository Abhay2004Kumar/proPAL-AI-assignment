import React, { useState, useEffect } from 'react';
import Toast from '../components/Toast';

const Agent = () => {
  const [sttConfig, setSttConfig] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [models, setModels] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  // Load saved config from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('agentConfig');
    if (savedConfig) {
      const { provider, model, language } = JSON.parse(savedConfig);
      setSelectedProvider(provider);
      setSelectedModel(model);
      setSelectedLanguage(language);
    }
  }, []);

  // Fetch STT config from API
  useEffect(() => {
    const fetchSTTConfig = async () => {
      try {
        const response = await fetch('https://propal-ai-assignment.onrender.com/api/stt');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to load config');
        }
        
        setSttConfig(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchSTTConfig();
  }, []);

  // Update models when provider changes
  useEffect(() => {
    if (selectedProvider && sttConfig) {
      const provider = sttConfig.providers.find(p => p.id === selectedProvider);
      if (provider) {
        setModels(provider.models);
        
        // Try to maintain the selected model if it exists in the new provider
        if (selectedModel && provider.models.some(m => m.id === selectedModel)) {
          return;
        }
        
        setSelectedModel('');
        setSelectedLanguage('');
      }
    }
  }, [selectedProvider, sttConfig, selectedModel]);

  // Update languages when model changes
  useEffect(() => {
    if (selectedModel && models.length > 0) {
      const model = models.find(m => m.id === selectedModel);
      if (model) {
        setLanguages(model.languages);
        
        // Try to maintain the selected language if it exists in the new model
        if (selectedLanguage && model.languages.includes(selectedLanguage)) {
          return;
        }
        
        setSelectedLanguage('');
      }
    }
  }, [selectedModel, models, selectedLanguage]);

  // Save config to localStorage when changes occur
  useEffect(() => {
    if (selectedProvider && selectedModel && selectedLanguage) {
      const config = { 
        provider: selectedProvider, 
        model: selectedModel, 
        language: selectedLanguage 
      };
      localStorage.setItem('agentConfig', JSON.stringify(config));
    }
  }, [selectedProvider, selectedModel, selectedLanguage]);

  const handleSave = () => {
    setToast({
      message: 'Configuration saved successfully!',
      type: 'success'
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {error}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transition-colors duration-300">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Agent Configuration</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="provider">
            Provider
          </label>
          <select
            id="provider"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white transition duration-200"
          >
            <option value="">Select a provider</option>
            {sttConfig?.providers.map(provider => (
              <option key={provider.id} value={provider.id}>{provider.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="model">
            Model
          </label>
          <select
            id="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={!selectedProvider}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 transition duration-200 ${
              !selectedProvider 
                ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500' 
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white'
            }`}
          >
            <option value="">Select a model</option>
            {models.map(model => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="language">
            Language
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            disabled={!selectedModel}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 transition duration-200 ${
              !selectedModel 
                ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500' 
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white'
            }`}
          >
            <option value="">Select a language</option>
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
      </div>
      
      {(selectedProvider || selectedModel || selectedLanguage) && (
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Selected Configuration</h3>
          
          {selectedProvider && (
            <div className="mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Provider: </span>
              <span className="text-gray-600 dark:text-gray-200">
                {sttConfig.providers.find(p => p.id === selectedProvider)?.name}
              </span>
            </div>
          )}
          
          {selectedModel && (
            <div className="mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Model: </span>
              <span className="text-gray-600 dark:text-gray-200">
                {models.find(m => m.id === selectedModel)?.name}
              </span>
            </div>
          )}
          
          {selectedLanguage && (
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Language: </span>
              <span className="text-gray-600 dark:text-gray-200">{selectedLanguage}</span>
            </div>
          )}
        </div>
      )}
      
      <button
        onClick={handleSave}
        disabled={!selectedProvider || !selectedModel || !selectedLanguage}
        className={`mt-6 bg-blue-600 text-white cursor-pointer font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ${
          !selectedProvider || !selectedModel || !selectedLanguage
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-blue-700'
        }`}
      >
        Save Configuration
      </button>
    </div>
  );
};

export default Agent;