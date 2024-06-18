import React from 'react';
import LandingPage from './components/LandingPage';
// import FirstPage from './components/FirstPage';
// import WelcomePage from './components/WelcomePage';
import Name from './components/Name';
import Test from './components/Test'
import FirstPage from './components/FirstPage_temp';
import CustomCursor from './components/CustomCursor';
import MenuBar from './components/MenuBar';

const App = () => {
  return (
    <div>
      <CustomCursor />
      {/* <MenuBar /> */}
      <FirstPage />
      {/* <LandingPage /> */}
      {/* <Name /> */}
      {/* <Test /> */}
    </div>
  );
};

export default App;
