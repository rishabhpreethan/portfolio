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
  alignItems: 'flex-start', // Align items to the left
  paddingLeft: '20px', // Add padding to move buttons away from the left edge
  transformOrigin: 'center', // Center the transformation
};

const openSidebarStyle: React.CSSProperties = {
  transform: 'translateX(0)', // Move sidebar to the visible area when open
};

const listItemStyle: React.CSSProperties = {
  opacity: 0,
  transform: 'translateX(-20px)', // Initially position each item slightly off-screen
  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out', // Smooth fade-in and move-in animation
  cursor: 'pointer', // Change cursor to pointer
  margin: '10px 0', // Add margin for spacing between buttons
};

// Define hover styles explicitly as strings
const hoverStyle: { border: string; borderRadius: string } = {
  border: '0.5px solid #00ff00', // Thinner green border on hover
  borderRadius: '5px',
};

const visibleItemStyle: React.CSSProperties = {
  opacity: 1,
  transform: 'translateX(0) translateY(-10px)', // Move items into view and shift them 10px higher
  textAlign: 'left', // Align text to the left
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

      return () => timers.forEach(timer => clearTimeout(timer));
    } else {
      // Reset visibility when closing sidebar smoothly
      const timers = itemVisible.map((_, index) => {
        return setTimeout(() => {
          setItemVisible(prev => {
            const newVisibility = [...prev];
            newVisibility[index] = false; // Set items to not visible after a delay
            return newVisibility;
          });
        }, index * 100); // Delay each item by 0.1 seconds on exit
      });

      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isOpen]);

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.border = hoverStyle.border; // Thinner green outline on hover
    event.currentTarget.style.boxShadow = '0 0 0 1px #00ff00'; // Add shadow effect
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.border = '1px solid transparent'; // Reset to 1px solid transparent
    event.currentTarget.style.boxShadow = 'none'; // Remove shadow
  };

  return (
    <div style={{ ...sidebarStyle, ...(isOpen ? openSidebarStyle : {}) }}>
      {['Home', 'Education', 'Experience', 'Projects', 'About Me'].map((item, index) => (
        <button
          key={item}
          style={{
            ...listItemStyle,
            ...(itemVisible[index] ? visibleItemStyle : {}),
            transitionDelay: `${index * 0.1}s`, // Stagger the animation delay for each item
            backgroundColor: 'black',
            color: 'white',
            border: '1px solid transparent', // Default border for button
            padding: '10px 20px',
            fontSize: '14px',
            fontFamily: "'DM Mono', monospace",
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'border-color 0.3s, box-shadow 0.3s, opacity 0.6s, transform 0.6s',
            width: '50%', // Make buttons take full width
            textAlign: 'left', // Align text to the left
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p style={{ margin: 0 }}>{item}</p> {/* Use <p> tag for the text */}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
