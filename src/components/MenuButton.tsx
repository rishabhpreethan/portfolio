import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Overlay from './Overlay';

const menuButtonStyle: React.CSSProperties = {
  position: 'fixed',
  top: '-1px',
  left: '-5px',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  padding: 0,
  outline: 'none',
  width: '35px',
  height: '35px',
  zIndex: 1200, // Ensure button stays above the sidebar
};

const lineStyle: React.CSSProperties = {
  fill: 'none',
  stroke: 'white',
  strokeWidth: 6,
  transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
};

const line1OpenStyle: React.CSSProperties = {
  strokeDasharray: '90 207',
  strokeDashoffset: -134,
};

const line2OpenStyle: React.CSSProperties = {
  strokeDasharray: '1 60',
  strokeDashoffset: -30,
};

const line3OpenStyle: React.CSSProperties = {
  strokeDasharray: '90 207',
  strokeDashoffset: -134,
};

const line1Style: React.CSSProperties = {
  strokeDasharray: '60 207',
};

const line2Style: React.CSSProperties = {
  strokeDasharray: '60 60',
};

const line3Style: React.CSSProperties = {
  strokeDasharray: '60 207',
};

const MenuButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(prevState => !prevState);
    };

  return (
    <>
      <button
        style={menuButtonStyle}
        onClick={toggleMenu}
        aria-label="Main Menu"
        aria-expanded={isOpen}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <path
            className="line line1"
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            style={isOpen ? { ...lineStyle, ...line1OpenStyle } : { ...lineStyle, ...line1Style }}
          />
          <path
            className="line line2"
            d="M 20,50 H 80"
            style={isOpen ? { ...lineStyle, ...line2OpenStyle } : { ...lineStyle, ...line2Style }}
          />
          <path
            className="line line3"
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            style={isOpen ? { ...lineStyle, ...line3OpenStyle } : { ...lineStyle, ...line3Style }}
          />
        </svg>
      </button>
      <Sidebar isOpen={isOpen} />
      <Overlay isOpen={isOpen} />
    </>
  );
};

export default MenuButton;