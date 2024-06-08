import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LandingPage = () => {
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
                left: '47.5%',
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

const typingContainerStyle: React.CSSProperties = {
  fontFamily: 'DM Mono, monospace',
  fontWeight: 400,
  fontSize: '16px',
  color: 'white',
  position: 'relative', // Initially relative
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
