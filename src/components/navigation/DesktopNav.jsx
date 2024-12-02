import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  { path: '/', text: 'Home' },
  { path: '/services', text: 'Services' },
  { path: '/about', text: 'About' },
];

const DesktopNav = () => {
  return (
    <ul className=" md:flex ml-96 p-1 w-full gap-6">
      {
        links.map((link) => (
          <li key={link.text} className="text-lg">
            <Link
              to={link.path}
              className="slide-in hover:text-blue-500 transition-all"
            >
              {link.text}
            </Link>
          </li>
        ))
      }
    </ul>
  );
};

export default DesktopNav;
