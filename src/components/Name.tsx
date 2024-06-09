import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: 'black',
  fontFamily: 'DM Sans, sans-serif',
  color: 'white',
  fontWeight: 'bold',
};

const textStyle: React.CSSProperties = {
  fontSize: '150px', // Increased font size
  position: 'relative',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const randomFlicker = (element: HTMLElement) => {
  const tl = gsap.timeline({ repeat: -1 });
  tl.to(element, {
    opacity: 0.4,
    duration: Math.random() * 0.1 + 0.05, // Random duration between 0.05 and 0.15 seconds
    ease: 'power1.inOut',
  });
  tl.to(element, {
    opacity: 1,
    duration: Math.random() * 0.1 + 0.05, // Random duration between 0.05 and 0.15 seconds
    ease: 'power1.inOut',
  });
  tl.duration(Math.random() * 2 + 1); // Random total duration between 1 and 3 seconds
};

const Name: React.FC = () => {
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leftTextRef.current && rightTextRef.current) {
      gsap.fromTo(leftTextRef.current, { x: '-100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 2.5 });
      gsap.fromTo(rightTextRef.current, { x: '100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 2.5 });

      // Apply random flicker effect to each letter
      const applyRandomFlicker = (element: HTMLElement) => {
        Array.from(element.children).forEach((letter) => {
          randomFlicker(letter as HTMLElement);
        });
      };

      applyRandomFlicker(leftTextRef.current);
      applyRandomFlicker(rightTextRef.current);
    }

    return () => {
      // Clean up flicker animations when component unmounts
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div ref={leftTextRef} style={textStyle}>
        {Array.from('Rishabh').map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
      <div ref={rightTextRef} style={textStyle}>
        {Array.from('Preethan').map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
    </div>
  );
};

export default Name;
