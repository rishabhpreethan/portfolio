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

  const menuButtonStyle: React.CSSProperties = {
    backgroundColor: 'black',
    borderColor: 'rgba(128, 128, 128, 0.5)',
    color: 'white',
    border: '1px solid rgba(128, 128, 128, 0.5)',
    padding: '8px 16px',
    fontSize: '14px',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    margin: '0 10px',
    fontFamily: "'DM Mono', monospace",
    boxShadow: '0 0 0 white',
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.boxShadow = '0 0 0 1px #00ff00';
  };  

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.boxShadow = '0 0 0 white';
  };

  return (
    <div ref={menuBarRef} style={{ ...menuBarStyle, opacity: 0 }}>
      <button
        style={menuButtonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Home
      </button>
      <button
        style={menuButtonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Education
      </button>
      <button
        style={menuButtonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Experience
      </button>
      <button
        style={menuButtonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Projects
      </button>
      <button
        style={menuButtonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        About Me
      </button>
    </div>
  );
};

const menuBarStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '38px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'black',
  padding: '10px 10px',
  borderRadius: '50px',
  display: 'flex',
  justifyContent: 'space-around',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  fontFamily: "'DM Mono', monospace",
};

export default MenuBar;
