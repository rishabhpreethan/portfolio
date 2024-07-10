import React from 'react';
import FirstPage from './components/FirstPage_temp';
import CustomCursor from './components/CustomCursor';
// import Starfield from './components/StarField';
import SecondPage from './components/SecondPage';

const App = () => {
  return (
    <div>
      <CustomCursor />
      <FirstPage />
      <SecondPage />
      {/* <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.1}
        backgroundColor="black"
      /> */}
    </div>
  );
};

export default App;