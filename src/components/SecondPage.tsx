import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Starfield from './StarField';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    gsap.to(horizontal, {
      xPercent: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true
      }
    });
  }, []);

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 0,
    width: '500px',
    height: '300px',
    borderRadius: '50px', // Keep the border radius
    overflow: 'hidden',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 'bold',
    color: 'white',
    background: 'black',
    border: '2px solid rgba(128, 128, 128, 0.5)',
    margin: '10px',
    transition: 'transform 0.3s ease-in-out'
  };

  return (
    <>
      <style>{`
        @keyframes rotate {
          100% {
            transform: rotate(1turn);
          }
        }

        .rainbow:hover {
          transform: scale(1.05);
        }

        .rainbow:hover::before {
          content: '';
          position: absolute;
          z-index: -2;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          border-radius: 50px; /* Match card's border radius */
          background-color: transparent;
          background-repeat: no-repeat;
          background-size: 60% 60%, 40% 40%; /* Adjust sizes to make white thinner */
          background-position: 0 0, 100% 0, 100% 100%, 0 100%;
          background-image: 
            linear-gradient(#00ff00, #00ff00), /* Top-left green */
            linear-gradient(#ffffff, #ffffff), /* Top-right white */
            linear-gradient(#00ff00, #00ff00), /* Bottom-right green */
            linear-gradient(#ffffff, #ffffff); /* Bottom-left white */
          animation: rotate 4s linear infinite;
        }

        .rainbow:hover::after {
          content: '';
          position: absolute;
          z-index: -1;
          left: 2px; /* Reduced to make the border thinner */
          top: 2px;  /* Reduced to make the border thinner */
          width: calc(100% - 4px); /* Adjust width */
          height: calc(100% - 4px); /* Adjust height */
          border-radius: 50px; /* Same border-radius */
          background: black; /* Keep the center black */
        }
      `}</style>
      <div ref={containerRef} style={{ overflow: 'hidden', height: '100vh', display: 'flex', alignItems: 'center' }}>
        <div ref={horizontalRef} style={{ display: 'flex', width: '300%', transform: 'translateX(33.33%)' }}>
          <div className="rainbow" style={cardStyle}>Card 1</div>
          <div className="rainbow" style={cardStyle}>Card 2</div>
          <div className="rainbow" style={cardStyle}>Card 3</div>
          <div className="rainbow" style={cardStyle}>Card 4</div>
        </div>
      </div>
    </>
  );
};

const VerticalScrollSection = () => (
  <div style={{ height: '100vh', background: 'lightgreen' }}>
    <h2>Under Progress</h2>
  </div>
);

const SecondPage = () => (
  <div>
    <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.1}
        backgroundColor="black"
    />
    <HorizontalScrollSection />
    <VerticalScrollSection />
  </div>
);

export default SecondPage;
