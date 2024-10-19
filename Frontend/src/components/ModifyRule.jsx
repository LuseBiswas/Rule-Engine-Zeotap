import React, { useState } from 'react';
import { modifyRule } from '../utils/api';
import { Menu, X, Home, Book, Settings, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl">RuleModifier</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem icon={<Home size={18} />} text="Home" />
              <NavItem icon={<Book size={18} />} text="Rules" />
              <NavItem icon={<Settings size={18} />} text="Settings" />
              <NavItem icon={<User size={18} />} text="Profile" />
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem icon={<Home size={18} />} text="Home" mobile />
            <NavItem icon={<Book size={18} />} text="Rules" mobile />
            <NavItem icon={<Settings size={18} />} text="Settings" mobile />
            <NavItem icon={<User size={18} />} text="Profile" mobile />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ icon, text, mobile = false }) => {
  const baseClasses = "flex items-center px-3 py-2 rounded-md text-sm font-medium";
  const mobileClasses = mobile ? "block text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white";
  
  return (
    <a href="#" className={`${baseClasses} ${mobileClasses}`}>
      {icon}
      <span className={mobile ? "ml-3" : "ml-2"}>{text}</span>
    </a>
  );
};

const ModifyRule = () => {
  const [ruleId, setRuleId] = useState('');
  const [newRuleString, setNewRuleString] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleModifyRule = async () => {
    try {
      const result = await modifyRule(ruleId, newRuleString);
      console.log(result);
      setResponse(result);
      setError(null);
    } catch (error) {
      setError('Error modifying rule');
      setResponse(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Modify Rule</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="ruleId" className="block text-sm font-medium text-gray-700">Rule ID</label>
                  <input
                    type="text"
                    id="ruleId"
                    value={ruleId}
                    onChange={(e) => setRuleId(e.target.value)}
                    placeholder="Enter rule ID"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="newRuleString" className="block text-sm font-medium text-gray-700">New Rule String</label>
                  <textarea
                    id="newRuleString"
                    value={newRuleString}
                    onChange={(e) => setNewRuleString(e.target.value)}
                    placeholder="Enter new rule string"
                    rows="4"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <button
                  onClick={handleModifyRule}
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Modify Rule
                </button>
              </div>
              {response && (
                <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        {response.ruleString ? "Rule modified successfully!" : "Rule not modified"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        <strong>Error:</strong> {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyRule;