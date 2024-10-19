import React, { useEffect, useState } from 'react';
import { getAllRules } from '../utils/api';
import { Book, Search, ChevronDown, ChevronUp } from 'lucide-react';



const GetAllRules = () => {
  const [rules, setRules] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchRules = async () => {
      try {
        setLoading(true);
        const result = await getAllRules();
        setRules(result);
        setError(null);
      } catch (error) {
        setError('Error fetching rules');
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedRules = React.useMemo(() => {
    let sortableRules = [...rules];
    if (sortConfig.key !== null) {
      sortableRules.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableRules;
  }, [rules, sortConfig]);

  const filteredRules = sortedRules.filter(rule =>
    rule._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.ruleString.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
     
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
                <Book className="mr-2" /> All Rules
              </h2>
              
              <div className="mb-4">
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search rules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner"></div>
                  <p className="mt-2 text-sm text-gray-500">Loading rules...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">Error: {error}</p>
                    </div>
                  </div>
                </div>
              ) : filteredRules.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No rules found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('_id')}
                        >
                          Rule ID
                          {sortConfig.key === '_id' && (
                            sortConfig.direction === 'ascending' ? <ChevronUp className="inline ml-1" size={14} /> : <ChevronDown className="inline ml-1" size={14} />
                          )}
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('ruleString')}
                        >
                          Rule String
                          {sortConfig.key === 'ruleString' && (
                            sortConfig.direction === 'ascending' ? <ChevronUp className="inline ml-1" size={14} /> : <ChevronDown className="inline ml-1" size={14} />
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRules.map((rule) => (
                        <tr key={rule._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule._id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.ruleString}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAllRules;