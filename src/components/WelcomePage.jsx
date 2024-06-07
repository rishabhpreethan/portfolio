import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './WelcomePage.css'; // Correct path to your App.css file

const WelcomePage = () => {
  useEffect(() => {
    const letters = document.querySelectorAll('.letter');
    const tl = gsap.timeline();

    tl.fromTo(
      letters,
      { y: '50vh' }, // Start from slightly lower than the middle
      {
        y: 0,
        duration: 2, // Faster duration for initial movement
        ease: 'power4.out',
        stagger: 0.1,
      }
    ).to(
      letters,
      {
        y: '-50vh',
        duration: 2, // Faster duration for upward movement
        ease: 'power4.in',
        stagger: 0.1,
      },
      "+=0.1" // Slight delay to ensure a smooth transition
    );
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
      <div style={{ position: 'relative', width: '100%', textAlign: 'center', overflow: 'hidden', height: '50vh' }}>
        <div style={{ position: 'absolute', width: '100%', top: '50%', transform: 'translateY(-50%)', fontSize: '4rem', fontWeight: 'bold', color: 'white', fontFamily: 'Arges, sans-serif', overflow: 'hidden', lineHeight: '1.2' }}>
          {Array.from('WELCOME!').map((letter, index) => (
            <span key={index} className="letter" style={{ display: 'inline-block', lineHeight: '1.2' }}>
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
