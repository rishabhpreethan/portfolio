import React, { useEffect, useState } from 'react';

const sidebarStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '250px', // Width of the sidebar
  backgroundColor: 'black', // Black background for the sidebar
  color: 'white',
  zIndex: 1000, // Lower than the MenuButton
  transform: 'translateX(-100%)', // Initially hide the sidebar (off-screen)
  transition: 'transform 0.6s ease-in-out', // Smooth animation for sliding
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Center items vertically
  alignItems: 'center',    // Center items horizontally
  transformOrigin: 'center', // Center the transformation
};

const openSidebarStyle: React.CSSProperties = {
  transform: 'translateX(0)', // Move sidebar to the visible area when open
};

const listItemStyle: React.CSSProperties = {
  opacity: 0,
  transform: 'translateX(-20px)', // Initially position each item slightly off-screen
  transition: 'opacity 0.3s ease-out, transform 0.3s ease-out', // Smooth fade-in and move-in animation
};

const visibleItemStyle: React.CSSProperties = {
  opacity: 1,
  transform: 'translateX(0) translateY(-10px)', // Move items into view and shift them 10px higher
  textAlign: 'center', // Center-align text
};

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [itemVisible, setItemVisible] = useState<boolean[]>([false, false, false, false, false]);

  useEffect(() => {
    if (isOpen) {
      const timers = itemVisible.map((_, index) => {
        return setTimeout(() => {
          setItemVisible(prev => {
            const newVisibility = [...prev];
            newVisibility[index] = true;
            return newVisibility;
          });
        }, index * 100); // Delay each item by 0.1 seconds
      });

      // Clear timeouts when component unmounts or sidebar closes
      return () => timers.forEach(timer => clearTimeout(timer));
    } else {
      // Reset visibility when closing sidebar
      setItemVisible([false, false, false, false, false]);
    }
  }, [isOpen]);

  return (
    <div style={{ ...sidebarStyle, ...(isOpen ? openSidebarStyle : {}) }}>
      {['Home', 'Education', 'Experience', 'Projects', 'About Me'].map((item, index) => (
        <h2
          key={item}
          style={{
            ...listItemStyle,
            ...(itemVisible[index] ? visibleItemStyle : {}),
            transitionDelay: `${index * 0.1}s`, // Stagger the animation delay for each item
          }}
        >
          {item}
        </h2>
      ))}
    </div>
  );
};

export default Sidebar;
