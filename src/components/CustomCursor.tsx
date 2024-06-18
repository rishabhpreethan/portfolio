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

    return () => {
      document.removeEventListener('mousemove', moveCursor);
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
    width: 30px;
    height: 30px;
    background-color: white;
  }
  .cursor-outer {
    width: 50px;
    height: 50px;
    border: 2px solid white;
    opacity: 0.5;
  }
`;
document.head.appendChild(style);
