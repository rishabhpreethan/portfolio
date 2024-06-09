import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Name from './Name';

const LandingPage = () => {
  const [showName, setShowName] = useState(false); // State to control rendering of Name component
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const welcomeTextRef = useRef<HTMLSpanElement | null>(null);
  const portfolioTextRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const welcomeText = "RISHABH PREETHAN'S ";
    const portfolioText = 'PORTFOLIO 2024';
    let welcomeIndex = 0;
    let portfolioIndex = 0;
    const interval = setInterval(() => {
      if (welcomeTextRef.current && welcomeIndex < welcomeText.length) {
        welcomeTextRef.current.innerHTML += welcomeText[welcomeIndex];
        welcomeIndex++;
      } else if (portfolioTextRef.current && portfolioIndex < portfolioText.length) {
        portfolioTextRef.current.innerHTML += portfolioText[portfolioIndex];
        portfolioIndex++;
      } else {
        clearInterval(interval);
        gsap.to([cursorRef.current, circleRef.current], {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (cursorRef.current) {
              cursorRef.current.style.display = 'none';
            }
            if (circleRef.current) {
              circleRef.current.style.display = 'none';
            }
            if (textContainerRef.current) {
              gsap.set(textContainerRef.current, {
                position: 'fixed',
                left: textContainerRef.current.offsetLeft, // Capture current left offset
                xPercent: 0, // Ensure no horizontal translation
              });
              gsap.to(textContainerRef.current, {
                duration: 1.5,
                ease: 'slow',
                left: '47.25%',
                xPercent: -50,
                onComplete: () => {
                  // Roll down animation for changing text
                  const tl = gsap.timeline();
                  tl.to(welcomeTextRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in',
                    onComplete: () => {
                      if (welcomeTextRef.current) {
                        welcomeTextRef.current.innerHTML = "WELCOME - ";
                      }
                      setShowName(true); // Set showName to true after welcome text animation completes
                    }
                  });
                  tl.to(welcomeTextRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                  });
                }
              });
            }
          }
        });
      }
    }, 150);

    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.7,
      ease: 'steps(1)'
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page" style={landingPageStyle}>
      <div ref={textContainerRef} className="typing-container" style={typingContainerStyle}>
        <span ref={circleRef} style={circleStyle}></span>
        <span ref={welcomeTextRef}></span>
        <span ref={portfolioTextRef}></span>
        <span ref={cursorRef} style={cursorStyle}>|</span>
      </div>
      {showName && ( // Render Name component only when showName is true
        <div style={centeredStyle}>
          <Name />
        </div>
      )}
    </div>
  );
};

const landingPageStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  height: '100vh',
  backgroundColor: '#000',
  padding: '10px',
  paddingTop: '40px', // Adjusted padding to push the whole thing down
};

const centeredStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  };

const typingContainerStyle: React.CSSProperties = {
  fontFamily: 'DM Mono, monospace',
  fontWeight: 'lighter',
  fontSize: '16px',
  color: 'white',
  position: 'absolute', // Initially relative
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  marginLeft: '50px', // Initial left margin
};

const circleStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '11px',
  height: '11px',
  backgroundColor: 'white',
  borderRadius: '50%',
  marginRight: '15px', // Small margin between the circle and text
  verticalAlign: 'middle'
};

const cursorStyle: React.CSSProperties = {
  fontWeight: 'bold',
  display: 'inline-block',
  width: '8px',
  height: '20px',
  backgroundColor: 'white'
};

export default LandingPage;
