import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Starfield from './StarField';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track which card is hovered

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
    borderRadius: '50px',
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
    transition: 'filter 0.3s ease-in-out' // Only transition filter
  };

  return (
    <>
      <style>{`
        @keyframes rotate {
          100% {
            transform: rotate(1turn);
          }
        }

        .rainbow {
          transition: filter 0.7s ease-in-out; /* Smooth transition for blur */
        }

        .rainbow:hover::before {
          content: '';
          position: absolute;
          z-index: -2;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          border-radius: 50px;
          background-color: transparent;
          background-repeat: no-repeat;
          background-size: 60% 60%, 40% 40%;
          background-position: 0 0, 100% 0, 100% 100%, 0 100%;
          background-image: 
            radial-gradient(circle at top left, #000000, #000000),
            radial-gradient(circle at top right, #ffffff, #ffffff),
            radial-gradient(circle at bottom right, #000000, #000000),
            radial-gradient(circle at bottom left, #ffffff, #ffffff);
          animation: rotate 7s linear infinite;
        }

        .rainbow:hover::after {
          content: '';
          position: absolute;
          z-index: -1;
          left: 2px;
          top: 2px;
          width: calc(100% - 4px);
          height: calc(100% - 4px);
          border-radius: 50px;
          background: black;
        }

        /* Apply blur effect to all cards except the hovered one */
        .blur {
          filter: blur(2px); /* Adjusted to lighter blur */
        }
      `}</style>
      <div
        ref={containerRef}
        style={{ overflow: 'hidden', height: '100vh', display: 'flex', alignItems: 'center' }}
      >
        <div
          ref={horizontalRef}
          style={{ display: 'flex', width: '300%', transform: 'translateX(33.33%)' }}
        >
          {/* Cards with hover events */}
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`rainbow ${hoveredIndex !== null && hoveredIndex !== index ? 'blur' : ''}`} // Apply blur if not hovered
              style={cardStyle}
              onMouseEnter={() => setHoveredIndex(index)} // Set hovered index
              onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index
            >
              Card {index + 1}
            </div>
          ))}
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
