import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import MenuBar from './MenuBar';
import MenuButton from './MenuButton';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  fontSize: '14px',
  color: 'white',
  position: 'absolute',
  whiteSpace: 'nowrap',
  opacity: 0,
  marginLeft: '50px',
  marginRight: '50px',
  fontWeight: 'normal',
};

const menuButtonStyle: React.CSSProperties = {
  backgroundColor: 'black',
  borderColor: 'rgba(128, 128, 128, 0.5)',
  color: 'white',
  border: '2px solid rgba(128, 128, 128, 0.5)',
  padding: '8px 16px',
  fontSize: '13px',
  borderRadius: '20px',
  cursor: 'pointer',
  margin: '0 10px',
  fontFamily: "'DM Mono', monospace",
  transition: 'box-shadow 0.3s ease-in-out',
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

const FirstPage: React.FC = () => {
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const topLeftTextRef = useRef<HTMLDivElement>(null);
  const topRightTextRef = useRef<HTMLDivElement>(null);
  const bottomLeftTextRef = useRef<HTMLDivElement>(null);
  const bottomRightTextRef = useRef<HTMLDivElement>(null);
  const [showMenuBar, setShowMenuBar] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuBarVisible, setIsMenuBarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const getCurrentTimeIST = () => {
    const now = new Date();
    const utcOffset = now.getTimezoneOffset() * 60000;
    const istOffset = 5.5 * 3600000;
    const istTime = new Date(now.getTime() + utcOffset + istOffset);
    const hours = istTime.getHours().toString().padStart(2, '0');
    const minutes = istTime.getMinutes().toString().padStart(2, '0');
    const seconds = istTime.getSeconds().toString().padStart(2, '0');
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
      gsap.set([leftText, rightText], { opacity: 1 });
      gsap.fromTo(leftText, { x: '-50%', opacity: 0 }, { x: '0%', opacity: 1, duration: 4, ease: 'power4.out' });
      gsap.fromTo(rightText, { x: '50%', opacity: 0 }, { x: '0%', opacity: 1, duration: 4, ease: 'power4.out' });

      sequentialFlicker(leftText, rightText);
    }

    const animateCornerText = (element: HTMLElement, fromX: string, toX: string, onStart: () => void) => {
      if (element) {
        document.body.style.overflow = 'hidden';
  
        gsap.set(element, { opacity: 1 });
        gsap.fromTo(element, { x: fromX, opacity: 0 }, { x: toX, opacity: 1, duration: 3, delay: 1.5, ease: 'power4', onStart: onStart, onComplete: () => {
          document.body.style.overflow = 'auto';
        } });
      }
    };

    animateCornerText(topLeftText!, '-50%', '0%', () => setShowMenuBar(true));
    animateCornerText(topRightText!, '50%', '0%', () => setShowMenuBar(true));
    animateCornerText(bottomLeftText!, '-50%', '0%', () => setShowMenuBar(true));
    animateCornerText(bottomRightText!, '50%', '0%', () => setShowMenuBar(true));

    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTimeIST());
    }, 1000);

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const isScrollingDown = currentScrollY > lastScrollY.current;
          
          // Check if we're at a page boundary (within 10 pixels of a multiple of window height)
          const isAtPageBoundary = Math.abs(currentScrollY % windowHeight) < 10 || 
                                   Math.abs(currentScrollY % windowHeight - windowHeight) < 10;

          if (isScrollingDown && !isAtPageBoundary) {
            setIsMenuBarVisible(false);
          } else if (!isScrollingDown || isAtPageBoundary) {
            setIsMenuBarVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

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
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(event.currentTarget, {
      boxShadow: '0 0 0 2px #00ff00',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(event.currentTarget, {
      boxShadow: '0 0 0 0px #00ff00',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const getBlurStyle = (isBlurred: boolean): React.CSSProperties => ({
    filter: isBlurred ? 'blur(5px)' : 'none',
    transition: 'filter 0.6s ease-in-out'
  });

  const handleMenuToggle = (open: boolean) => {
    setIsMenuOpen(open);
  };

  return (
    <div style={containerStyle}>
      <div ref={leftTextRef} style={{...textStyle, ...getBlurStyle(isMenuOpen)}}>
        {Array.from('Rishabh').map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
      <div ref={rightTextRef} style={{...textStyle, ...getBlurStyle(isMenuOpen)}}>
        {Array.from('Preethan').map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
      <div ref={topLeftTextRef} style={{ ...cornerTextStyle, top: '-5px', left: '-15px' }}>
        <MenuButton onToggle={setIsMenuOpen} />
      </div>
      <div 
        ref={topRightTextRef} 
        style={{ ...cornerTextStyle, ...getBlurStyle(isMenuOpen), top: '33px', right: '0px' }}
      >
        <a href="https://rishabhpreethan.github.io/resume/" target="_blank" rel="noopener noreferrer">
          <button
            style={{...menuButtonStyle, ...getBlurStyle(isMenuOpen)}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Resume
          </button>
        </a>
      </div>
      <div 
        ref={bottomLeftTextRef} 
        style={{ ...cornerTextStyle, ...getBlurStyle(isMenuOpen), bottom: '55px', left: '10px' }}
      >
        ◍ Software Engineer
      </div>
      <div 
        ref={bottomRightTextRef} 
        style={{ ...cornerTextStyle, ...getBlurStyle(isMenuOpen), bottom: '55px', right: '10px' }}
      >
        India {currentTime} ◍
      </div>
      {showMenuBar && <MenuBar isOpen={isMenuOpen} isVisible={isMenuBarVisible} />}
    </div>
  );
};

export default FirstPage;