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
  fontSize: '170px', // Increased font size
  position: 'relative',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  opacity: 0, // Set initial opacity to 0
};

const sequentialFlicker = (leftElement: HTMLElement, rightElement: HTMLElement) => {
  const leftLetters = Array.from(leftElement.children);
  const rightLetters = Array.from(rightElement.children);
  const maxLength = Math.max(leftLetters.length, rightLetters.length);
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

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

const Name: React.FC = () => {
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;

    if (leftText && rightText) {
      gsap.set([leftText, rightText], { opacity: 1 }); // Set opacity to 1 before starting the animation
      gsap.fromTo(leftText, { x: '-50%', opacity: 0 }, { x: '0%', opacity: 1, duration: 2.5, ease: 'power4.out' });
      gsap.fromTo(rightText, { x: '50%', opacity: 0 }, { x: '0%', opacity: 1, duration: 2.5, ease: 'power4.out' });

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

export default Name;
