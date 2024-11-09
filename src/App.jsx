import React from 'react';
import CustomCursor from './components/CustomCursor';
import SecondPage from './components/SecondPage';
import FirstPage from './components/FirstPage';

const App = () => {
  return (
    <div>
      <CustomCursor />
      <FirstPage />
      <SecondPage />
    </div>
  );
};

export default App;