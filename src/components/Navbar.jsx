import React from 'react';
import kpmgLogo from '../assets/kpmg-logo.svg';

const Navbar = ({ onMenuToggle, isScrolled = false }) => {
  // KPMG Corporate Blue: #00338D
  // When scrolled: White icons on Blue background
  // When at top: Blue icons on Transparent background (assuming Hero is white)
  const iconColor = '#00338D';

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-[100] transition-all duration-300 pointer-events-none bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="container mx-auto py-5 flex justify-between items-center pointer-events-auto px-6 lg:px-12">
        
        {/* KPMG SVG Logo */}
        <div className="h-10 w-auto flex items-center">
          <img
            src={kpmgLogo}
            alt="KPMG"
            className="h-full w-auto transition-all duration-300"
            style={{ 
              filter: 'brightness(0) saturate(100%) invert(14%) sepia(86%) saturate(1583%) hue-rotate(208deg) brightness(91%) contrast(101%)' /* Blue #00338D */
            }}
          />
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={onMenuToggle}
          aria-label="Open Menu"
          className="flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer group"
        >
          <div 
            className="w-7 h-[3px] transition-all duration-300" 
            style={{ backgroundColor: iconColor }} 
          />
          <div 
            className="w-5 h-[3px] self-end transition-all duration-300" 
            style={{ backgroundColor: iconColor }} 
          />
          <div 
            className="w-7 h-[3px] transition-all duration-300" 
            style={{ backgroundColor: iconColor }} 
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
