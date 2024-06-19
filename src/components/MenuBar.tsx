import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MenuBar: React.FC = () => {
  const menuBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menuBar = menuBarRef.current;

    if (menuBar) {
      gsap.to(menuBar, { opacity: 1, duration: 3 });
    }
  }, []);

  return (
    <div ref={menuBarRef} style={{ ...menuBarStyle, opacity: 0 }}>
      <button style={menuButtonStyle}>Home</button>
      <button style={menuButtonStyle}>Education</button>
      <button style={menuButtonStyle}>Experience</button>
      <button style={menuButtonStyle}>Projects</button>
      <button style={menuButtonStyle}>About Me</button>
    </div>
  );
};

const menuBarStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'black', // Black background
  padding: '12px 30px', // Original padding for bar
  borderRadius: '50px', // Fully rounded edges
  display: 'flex',
  justifyContent: 'space-around',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.2)', // Light border for glass effect
  fontFamily: "'DM Mono', monospace", // DM Mono font style
};

const menuButtonStyle: React.CSSProperties = {
  backgroundColor: 'black', // Black background for buttons
  borderColor: 'rgba(128, 128, 128, 0.5)', // Grey border
  color: 'white',
  border: '1px solid rgba(128, 128, 128, 0.5)', // Grey border for buttons
  padding: '8px 16px', // Original padding
  fontSize: '14px', // Original font size
  borderRadius: '20px', // Rounded edges for buttons
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  margin: '0 10px', // Original space between buttons
  fontFamily: "'DM Mono', monospace", // DM Mono font style
};

export default MenuBar;
