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

  const cardStyle = {
    flex: '0 0 25%', // Adjust the width of the cards as needed
    background: 'black',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    width: '500px',
    margin: '10px',
    borderRadius: '50px',
    border: '4px solid white',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 'bold'
  };

  return (
    <div ref={containerRef} style={{ overflow: 'hidden', height: '100vh', display: 'flex', alignItems: 'center' }}>
      <div ref={horizontalRef} style={{ display: 'flex', width: '300%', transform: 'translateX(33.33%)' }}>
        <div style={cardStyle}>Card 1</div>
        <div style={cardStyle}>Card 2</div>
        <div style={cardStyle}>Card 3</div>
        <div style={cardStyle}>Card 4</div>
      </div>
    </div>
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
    {/* <HorizontalScrollSection /> */}
    <VerticalScrollSection />
  </div>
);

export default SecondPage;
