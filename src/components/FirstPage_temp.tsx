import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import MenuBar from './MenuBar'; // Import the MenuBar component

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
  fontSize: '150px',
  position: 'relative',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  opacity: 0,
  marginTop: '-20px'
};

const cornerTextStyle: React.CSSProperties = {
  fontFamily: 'DM Mono, monospace',
  fontSize: '13px',
  color: 'white',
  position: 'absolute',
  whiteSpace: 'nowrap',
  opacity: 0,
  marginLeft: '50px',
  marginRight: '50px',
  fontWeight: 'normal',
};

const menuButtonStyle: React.CSSProperties = {
  backgroundColor: 'black', // Black background for buttons
  borderColor: 'rgba(128, 128, 128, 0.5)', // Grey border
  color: 'white',
  border: '2px solid rgba(128, 128, 128, 0.5)', // Grey border for buttons
  padding: '8px 16px', // Original padding
  fontSize: '13px', // Original font size
  borderRadius: '20px', // Rounded edges for buttons
  cursor: 'pointer',
  // transition: 'background-color 0.3s',
  margin: '0 10px', // Original space between buttons
  fontFamily: "'DM Mono', monospace", // DM Mono font style
  transition: 'box-shadow 0.3s',
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
  const topLeftTextRef = useRef<HTMLDivElement>(null);
  const topRightTextRef = useRef<HTMLDivElement>(null);
  const bottomLeftTextRef = useRef<HTMLDivElement>(null);
  const bottomRightTextRef = useRef<HTMLDivElement>(null);
  const [showMenuBar, setShowMenuBar] = useState(false); // State to control rendering of MenuBar
  const [currentTime, setCurrentTime] = useState<string>(''); // State to hold the current time

  // Function to get the current time in IST
  const getCurrentTimeIST = () => {
    const now = new Date();
    const utcOffset = now.getTimezoneOffset() * 60000;
    const istOffset = 5.5 * 3600000; // IST is UTC +5:30
    const istTime = new Date(now.getTime() + utcOffset + istOffset);
    const hours = istTime.getHours().toString().padStart(2, '0'); // Get hours and pad with leading zero if needed
    const minutes = istTime.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if needed
    const seconds = istTime.getSeconds().toString().padStart(2, '0'); // Get seconds and pad with leading zero if needed
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;
    const topLeftText = topLeftTextRef.current;
    const topRightText = topRightTextRef.current;
    const bottomLeftText = bottomLeftTextRef.current;
    const bottomRightText = bottomRightTextRef.current;

    if (leftText && rightText) {
      gsap.set([leftText, rightText], { opacity: 1 }); // Set opacity to 1 before starting the animation
      gsap.fromTo(leftText, { x: '-50%', opacity: 0 }, { x: '0%', opacity: 1, duration: 4, ease: 'power4.out' });
      gsap.fromTo(rightText, { x: '50%', opacity: 0 }, { x: '0%', opacity: 1, duration: 4, ease: 'power4.out' });

      // Apply sequential flicker effect to each letter
      sequentialFlicker(leftText, rightText);
    }

    const animateCornerText = (element: HTMLElement, fromX: string, toX: string, onStart: () => void) => {
      if (element) {
        // Hide scroll bars
        document.body.style.overflow = 'hidden';
  
        gsap.set(element, { opacity: 1 }); // Set opacity to 1 before starting the animation
        gsap.fromTo(element, { x: fromX, opacity: 0 }, { x: toX, opacity: 1, duration: 3, delay: 1.5, ease: 'power4', onStart: onStart, onComplete: () => {
          // Show scroll bars after animation
          document.body.style.overflow = 'auto';
        } });
      }
    };

    animateCornerText(topLeftText!, '-50%', '0%', () => setShowMenuBar(true));
    animateCornerText(topRightText!, '50%', '0%', () => setShowMenuBar(true));
    animateCornerText(bottomLeftText!, '-50%', '0%', () => setShowMenuBar(true));
    animateCornerText(bottomRightText!, '50%', '0%', () => setShowMenuBar(true));

    // Set up interval to update time every second
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTimeIST());
    }, 1000);

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
      clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, []);

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.boxShadow = '0 0 0 2px #00ff00';
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.boxShadow = '0 0 0 white';
  };

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
      <div ref={topLeftTextRef} style={{ ...cornerTextStyle, top: '40px', left: '10px' }}>
        Top Left Corner
      </div>
      <div ref={topRightTextRef} style={{ ...cornerTextStyle, top: '33px', right: '10px' }}>
        <a href="https://rishabhpreethan.github.io/resume/" target="_blank" rel="noopener noreferrer">
          <button
            style={menuButtonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Download Resume
          </button>
        </a>
      </div>
      <div ref={bottomLeftTextRef} style={{ ...cornerTextStyle, bottom: '55px', left: '10px' }}>
        ◍ Software Engineer
      </div>
      <div ref={bottomRightTextRef} style={{ ...cornerTextStyle, bottom: '55px', right: '10px' }}>
        India {currentTime} ◍
      </div>
      {showMenuBar && <MenuBar />}
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
  let interval: ReturnType<typeof setInterval>;

  useEffect(() => {
    const welcomeText = "Rishabh's ";
    const portfolioText = 'Portfolio 2024';
    let welcomeIndex = 0;
    let portfolioIndex = 0;

    const startTypingAnimation = () => {
      interval = setInterval(() => {
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
                circleRef.current.style.visibility = 'hidden'; // Make the circle invisible but keep its space
              }
              setTimeout(() => { // Wait for 0.5 seconds before moving the text
                if (textContainerRef.current) {
                  gsap.set(textContainerRef.current, {
                    position: 'fixed',
                    left: textContainerRef.current.offsetLeft, // Capture current left offset
                    xPercent: 0, // Ensure no horizontal translation
                  });
                  gsap.to(textContainerRef.current, {
                    duration: 2,
                    ease: 'power4',
                    left: '45.7%',
                    xPercent: -50,
                    onComplete: () => {
                      const tl = gsap.timeline();
                      tl.to(welcomeTextRef.current, {
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.in',
                        onComplete: () => {
                          if (welcomeTextRef.current) {
                            welcomeTextRef.current.innerHTML = "Welcome - ";
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
              }, 500);
            }
          });
        }
      }, 75);

      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.4,
        ease: 'steps(1)'
      });
    };

    setTimeout(startTypingAnimation, 1500); // Start typing animation after 1.5 seconds

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
  height: '60vh',
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
