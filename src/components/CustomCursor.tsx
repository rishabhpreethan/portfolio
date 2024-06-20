import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  useEffect(() => {
    const cursorInner = document.createElement('div');
    const cursorOuter = document.createElement('div');

    cursorInner.className = 'cursor-inner';
    cursorOuter.className = 'cursor-outer';

    document.body.appendChild(cursorInner);
    document.body.appendChild(cursorOuter);

    gsap.set(cursorInner, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorOuter, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      gsap.to(cursorInner, { duration: 0.1, x, y });
      gsap.to(cursorOuter, { duration: 0.4, x, y });
    };

    document.addEventListener('mousemove', moveCursor);

    document.addEventListener('mouseenter', () => {
      gsap.to(cursorInner, { opacity: 1 });
      gsap.to(cursorOuter, { opacity: 1 });
    });

    document.addEventListener('mouseleave', () => {
      gsap.to(cursorInner, { opacity: 0 });
      gsap.to(cursorOuter, { opacity: 0 });
    });

    document.addEventListener('mousedown', () => {
      gsap.to(cursorOuter, { duration: 0.2, scale: 0.5 });
    });

    document.addEventListener('mouseup', () => {
      gsap.to(cursorOuter, { duration: 0.2, scale: 1 });
    });

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.style.cursor = 'none';
      button.addEventListener('mouseover', () => {
        gsap.to(cursorOuter, { duration: 0.2, borderColor: '#00ff00' }); // Brighter green color
      });
      button.addEventListener('mouseout', () => {
        gsap.to(cursorOuter, { duration: 0.2, borderColor: 'white' });
      });
    });


    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', () => {
        gsap.to(cursorOuter, { duration: 0.2, scale: 0.5 });
      });
      document.removeEventListener('mouseup', () => {
        gsap.to(cursorOuter, { duration: 0.2, scale: 1 });
      });
      buttons.forEach(button => {
        button.removeEventListener('mouseover', () => {
          gsap.to(cursorOuter, { duration: 0.2, borderColor: 'green' });
        });
        button.removeEventListener('mouseout', () => {
          gsap.to(cursorOuter, { duration: 0.2, borderColor: 'white' });
        });
      });
      cursorInner.remove();
      cursorOuter.remove();
    };
  }, []);

  return null;
};

export default CustomCursor;

// Styles
const style = document.createElement('style');
style.innerHTML = `
  body {
    cursor: none;
  }
  .cursor-inner,
  .cursor-outer {
    position: fixed;
    top: 0;
    left: 0;
    border-radius: 50%;
    pointer-events: none;
    mix-blend-mode: difference;
    will-change: transform;
  }
  .cursor-inner {
    width: 20px;
    height: 20px;
    background-color: white;
  }
  .cursor-outer {
    width: 35px;
    height: 35px;
    border: 2px solid white;
    opacity: 1;
    transform-origin: center center;
  }
  button {
    cursor: none; /* Ensure buttons do not show the default pointer cursor */
  }
`;
document.head.appendChild(style);
