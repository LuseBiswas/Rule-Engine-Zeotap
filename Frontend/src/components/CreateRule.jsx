import React, { useState } from 'react';
import { createRule } from '../utils/api';

const CreateRule = () => {
  const [ruleString, setRuleString] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateRule = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await createRule(ruleString);
      setResponse(result);
      setError(null);
      if (result.ruleString) {
        setRuleString(''); // Clear the textarea on success
      }
    } catch (error) {
      setError('Error creating rule. Please try again.');
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Rule</h2>

      <form onSubmit={handleCreateRule} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="ruleString" className="block text-sm font-medium text-gray-700">
            Rule String
          </label>
          <textarea
            id="ruleString"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            placeholder="Enter your rule string here..."
            rows="5"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !ruleString.trim()}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${isLoading || !ruleString.trim() 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            } transition duration-150 ease-in-out`}
        >
          {isLoading ? 'Creating...' : 'Create Rule'}
        </button>
      </form>

      {response && (
        <div className={`mt-6 p-4 rounded-md ${response.ruleString ? 'bg-green-100 border border-green-400' : 'bg-yellow-100 border border-yellow-400'}`}>
          <p className={`text-sm ${response.ruleString ? 'text-green-700' : 'text-yellow-700'}`}>
            {response.ruleString ? '✅ Rule created successfully!' : '⚠️ Rule not created. Please check your input and try again.'}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 rounded-md">
          <p className="text-sm text-red-700">❌ {error}</p>
        </div>
      )}
    </div>
  );
};

export default CreateRule;