import React, { useState, useEffect } from 'react';
import { evaluateRule } from '../utils/api';
import { CheckCircle, XCircle, AlertCircle, User, Briefcase, DollarSign, Clock } from 'lucide-react';

const EvaluateRule = () => {
  const [formData, setFormData] = useState({
    rule: '',
    age: '',
    salary: '',
    department: '',
    experience: '',
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [ruleIds, setRuleIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRuleIds = async () => {
      try {
        const response = await fetch('http://localhost:3020/api/rules/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setRuleIds(result);
      } catch (error) {
        console.error('Error fetching rule IDs:', error);
        setError('Error fetching rule IDs');
      }
    };

    getRuleIds();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEvaluateRule = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const data = {
        age: parseInt(formData.age, 10),
        salary: parseInt(formData.salary, 10),
        department: formData.department,
        experience: parseInt(formData.experience, 10),
      };
      const result = await evaluateRule(formData.rule, data);
      setResponse(result);
    } catch (error) {
      console.error('Error evaluating rule:', error);
      setError('Error evaluating rule. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Evaluate Rule</h2>

      <form onSubmit={handleEvaluateRule} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="rule" className="block text-sm font-medium text-gray-700">Rule</label>
          <select
            id="rule"
            name="rule"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.rule}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select a Rule</option>
            {ruleIds.map((item) => (
              <option key={item._id} value={item._id}>{item.ruleString}</option>
            ))}
          </select>
        </div>

        {[
          { name: 'age', label: 'Age', icon: User, type: 'number' },
          { name: 'department', label: 'Department', icon: Briefcase, type: 'text' },
          { name: 'salary', label: 'Salary', icon: DollarSign, type: 'number' },
          { name: 'experience', label: 'Experience', icon: Clock, type: 'number' },
        ].map((field) => (
          <div key={field.name} className="space-y-2">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <field.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Enter ${field.label.toLowerCase()}`}
                value={formData[field.name]}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${isLoading
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            } transition duration-150 ease-in-out`}
        >
          {isLoading ? 'Evaluating...' : 'Evaluate Rule'}
        </button>
      </form>

      {response && (
        <div className={`mt-6 p-4 rounded-md ${response.result ? 'bg-green-100 border border-green-400' : 'bg-yellow-100 border border-yellow-400'}`}>
          <div className="flex items-center">
            {response.result ? (
              <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            ) : (
              <XCircle className="h-6 w-6 text-yellow-500 mr-2" />
            )}
            <p className={`text-sm ${response.result ? 'text-green-700' : 'text-yellow-700'}`}>
              {response.result ? 'You are eligible' : 'You are not eligible'}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 rounded-md">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluateRule;