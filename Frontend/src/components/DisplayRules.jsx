import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book, AlertCircle, Loader, Info } from 'lucide-react';

const DisplayRules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('https://rule-engine-zeotap.onrender.com/api/rules/all');
        setRules(response.data);
      } catch (error) {
        console.error('Error fetching rules:', error.response ? error.response.data : error.message);
        setError('Failed to fetch rules. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchRules();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-8 w-8 text-blue-500 animate-spin" />
        <p className="ml-2 text-lg text-gray-600">Loading rules...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center">
          <AlertCircle className="h-6 w-6 mr-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 flex justify-center items-center">
        <Book className="h-8 w-8 mr-3 text-blue-500" />
        Display Rules
      </h2>
      
      {rules.length > 0 ? (
        <ul className="space-y-4">
          {rules.map((rule) => (
            <li key={rule._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-blue-500 text-white px-4 py-2 font-semibold flex items-center">
                <Info className="h-5 w-5 mr-2" />
                Rule ID: {rule._id}
              </div>
              <div className="p-4">
                <pre className="bg-gray-100 text-gray-800 p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
                  {rule.ruleString}
                </pre>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 bg-gray-100 p-8 rounded-lg">
          <Info className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <p className="text-xl">No rules available</p>
          <p className="mt-2">Create some rules to see them displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default DisplayRules;
