import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LandingPage.css';

const LandingPage = () => {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const text = 'Welcome!';
    let textIndex = 0;
    const interval = setInterval(() => {
      if (textRef.current && textIndex < text.length) {
        textRef.current.innerHTML += text[textIndex];
        textIndex++;
      } else if (textRef.current) {
        clearInterval(interval);
        gsap.to(cursorRef.current, { 
          opacity: 0, 
          duration: 0.5, 
          onComplete: () => {
            if (cursorRef.current) {
              cursorRef.current.style.display = 'none';
            }
            gsap.to(textRef.current, {
              duration: 2.5,
              ease: "slow(0.7, 0.7, false)",
              x: '50%', 
              y: '-50%',
              transform: 'translate(-50%, -50%)'
            });
          }
        });
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page">
      <div className="typing-container">
        <span ref={textRef}></span><span ref={cursorRef} className="cursor">|</span>
      </div>
    </div>
  );
};

export default LandingPage;
