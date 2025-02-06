import React, { useState } from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { ChevronDown } from 'lucide-react'

// TeamDropdown Component
const TeamDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const teamMembers = [
    { name: 'Shardendu Mishra', url: 'https://www.linkedin.com/in/shardendumishra22/' },
    { name: 'Anas Khan', url: 'https://www.linkedin.com/in/anas-khan83/' },
    { name: 'Mayank', url: 'https://www.linkedin.com/in/mayank8127/' },
    { name: 'Saurav Karki', url: 'https://www.linkedin.com/in/saurav-karki-909687306/' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        Team Members
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {teamMembers.map((member) => (
              <a
                key={member.name}
                href={member.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {member.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Configuration
const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img
        src="http://sanity-admin.rudraksha-ratna.com/static/images/blogs/lord-parashuram(1).jpg"
        alt="Team Parshu"
        style={{ height: '30px', width: '30px', borderRadius: '50%' }}
      />
      <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f56565' }}>BloodSphere</span>
    </div>
  ),
  project: {
    link: 'https://github.com/MishraShardendu22',
  },
  chat: {
    link: '#',
    icon: <TeamDropdown />
  },
  footer: {
    text: 'IIIT Dharwad - Team ParshuVelocity',
  },
  feedback: {
    content: null,
  },
  editLink: {
    text: null,
  },
  gitTimestamp: <span>{new Date().toLocaleString()}</span>,
}

export default config
