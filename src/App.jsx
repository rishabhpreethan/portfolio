import React from 'react';
import FirstPage from './components/FirstPage_temp';
import CustomCursor from './components/CustomCursor';
import SecondPage from './components/SecondPage';

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