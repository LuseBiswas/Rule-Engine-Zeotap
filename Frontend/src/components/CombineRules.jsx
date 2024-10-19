import React, { useState } from 'react';
import { combineRules } from '../utils/api';

const CombineRules = () => {
  const [ruleStrings, setRuleStrings] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCombineRules = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const rulesArray = ruleStrings.split('\n').filter((rule) => rule.trim() !== '');
      
      if (rulesArray.length < 2) {
        throw new Error('Please enter at least two rule strings to combine.');
      }

      const result = await combineRules(rulesArray);
      setResponse(result);
      if (result.combinedAST) {
        setRuleStrings(''); // Clear the textarea on success
      }
    } catch (error) {
      console.error('Error combining rules:', error);
      setError(error.message || 'Error combining rules. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Combine Rules</h2>
      
      <form onSubmit={handleCombineRules} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="ruleStrings" className="block text-sm font-medium text-gray-700">
            Rule Strings
          </label>
          <textarea
            id="ruleStrings"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            value={ruleStrings}
            onChange={(e) => setRuleStrings(e.target.value)}
            placeholder="Enter rule strings, one per line"
            rows="8"
            required
          />
          <p className="mt-2 text-sm text-gray-500">Enter at least two rule strings, each on a new line.</p>
        </div>

        <button
          type="submit"
          disabled={isLoading || ruleStrings.trim().split('\n').filter(Boolean).length < 2}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${isLoading || ruleStrings.trim().split('\n').filter(Boolean).length < 2
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            } transition duration-150 ease-in-out`}
        >
          {isLoading ? 'Combining...' : 'Combine Rules'}
        </button>
      </form>

      {response && (
        <div className={`mt-6 p-4 rounded-md ${response.combinedAST ? 'bg-green-100 border border-green-400' : 'bg-yellow-100 border border-yellow-400'}`}>
          <p className={`text-sm ${response.combinedAST ? 'text-green-700' : 'text-yellow-700'}`}>
            {response.combinedAST ? '✅ Rules combined successfully!' : '⚠️ Rules not combined. Please check your input and try again.'}
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

export default CombineRules;