import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Starfield from './StarField';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]); // Array to hold card references
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;

    // Create a container animation and assign it an ID for referencing
    const containerAnimation = gsap.to(horizontal, {
      xPercent: -65,
      ease: 'none',
      scrollTrigger: {
        id: 'horizontalScroll',
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        pin: true,
      }
    });

    // Animate each card individually
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.8, x: -50 }, // Start with fade, smaller scale, and slight left position
        {
          opacity: 1, 
          scale: 1,
          x: 0,
          duration: 0.6,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation, // Reference the container animation
            start: "top 90%", // Trigger animation when card is in view
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    return () => {
      if (containerAnimation.scrollTrigger) containerAnimation.scrollTrigger.kill();
    };
  }, []);

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 0,
    width: '500px',
    height: '300px',
    borderRadius: '100px',
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
    transition: 'filter 0.3s ease-in-out',
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
          transition: filter 0.7s ease-in-out;
        }

        .rainbow:hover::before {
          content: '';
          position: absolute;
          z-index: -2;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          border-radius: 100px;
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
          border-radius: 100px;
          background: black;
          transition: filter 0.3s ease-in-out;
        }

        .blur {
          filter: blur(2px);
        }
      `}</style>

      <div
        ref={containerRef}
        style={{ position: 'relative', overflow: 'hidden', height: '100vh', display: 'flex', alignItems: 'center' }}
      >
        {/* Top-left "Projects" text */}
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '50px',
          fontFamily: "'DM Mono', monospace",
          fontSize: '14px',
          color: 'white',
        }}>
          ◍ Projects
        </div>

        <div
          ref={horizontalRef}
          style={{ display: 'flex', width: '300%', transform: 'translateX(10%)' }}
        >
          {/* Render each card with ref and hover events */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el!)} // Store each card reference
              className={`rainbow ${hoveredIndex !== null && hoveredIndex !== index ? 'blur' : ''}`}
              style={cardStyle}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
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
