import React, { useEffect, useRef, useState } from 'react';
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
  fontSize: '170px', // Increased font size
  position: 'relative',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  opacity: 0, // Set initial opacity to 0
  marginTop: '-20px'
};

const sequentialFlicker = (leftElement: HTMLElement, rightElement: HTMLElement) => {
  const leftLetters = Array.from(leftElement.children);
  const rightLetters = Array.from(rightElement.children);
  const maxLength = Math.max(leftLetters.length, rightLetters.length);
  const tl = gsap.timeline({ repeat: -1, repeatDelay: -0.3 });

  for (let i = 0; i < maxLength; i++) {
    if (leftLetters[i]) {
      tl.to(leftLetters[i], {
        opacity: 0.4,
        duration: 0.7,
        ease: 'power1.inOut',
      }, i * 0.2)
        .to(leftLetters[i], {
          opacity: 1,
          duration: 0.7,
          ease: 'power1.inOut',
        }, i * 0.2 + 0.35);
    }

    if (rightLetters[i]) {
      tl.to(rightLetters[i], {
        opacity: 0.4,
        duration: 0.7,
        ease: 'power1.inOut',
      }, i * 0.2)
        .to(rightLetters[i], {
          opacity: 1,
          duration: 0.7,
          ease: 'power1.inOut',
        }, i * 0.2 + 0.35);
    }
  }
};

const Test: React.FC = () => {
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;

    if (leftText && rightText) {
      gsap.set([leftText, rightText], { opacity: 1 }); // Set opacity to 1 before starting the animation
      gsap.fromTo(leftText, { x: '-50%', opacity: 0 }, { x: '0%', opacity: 1, duration: 3, ease: 'power4.out' });
      gsap.fromTo(rightText, { x: '50%', opacity: 0 }, { x: '0%', opacity: 1, duration: 3, ease: 'power4.out' });

      // Apply sequential flicker effect to each letter
      sequentialFlicker(leftText, rightText);
    }

    return () => {
      if (leftText) {
        gsap.killTweensOf(leftText);
        Array.from(leftText.children).forEach((letter) => {
          gsap.killTweensOf(letter);
        });
      }
      if (rightText) {
        gsap.killTweensOf(rightText);
        Array.from(rightText.children).forEach((letter) => {
          gsap.killTweensOf(letter);
        });
      }
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

const FirstPage = () => {
  const [showName, setShowName] = useState(false); // State to control rendering of Name component
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const welcomeTextRef = useRef<HTMLSpanElement | null>(null);
  const portfolioTextRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const welcomeText = "RISHABH'S ";
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
                duration: 2,
                ease: 'power4',
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
    }, 75);

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
    <div className="first-page" style={landingPageStyle}>
      <div ref={textContainerRef} className="typing-container" style={typingContainerStyle}>
        <span ref={circleRef} style={circleStyle}></span>
        <span ref={welcomeTextRef}></span>
        <span ref={portfolioTextRef}></span>
        <span ref={cursorRef} style={cursorStyle}>|</span>
      </div>
      {showName && ( // Render Name component only when showName is true
        <div style={centeredStyle}>
          <Test />
        </div>
      )}
    </div>
  );
};

const landingPageStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  height: '90vh',
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

export default FirstPage;
