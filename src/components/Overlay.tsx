import React from 'react';

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '90vw',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  backdropFilter: 'blur(5px)', // Blur effect
  zIndex: 900, // Lower than the MenuButton, higher than the sidebar
  transition: 'opacity 0.6s ease-in-out',
};

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose }) => {
  return (
    <div
      style={{
        ...overlayStyle,
        opacity: isOpen ? 1 : 0, // Show or hide overlay based on isOpen
        pointerEvents: isOpen ? 'auto' : 'none', // Prevent interactions when hidden
      }}
      onClick={onClose}
    />
  );
};

export default Overlay;