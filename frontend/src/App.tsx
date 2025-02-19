import React from 'react';
import AppRouter from './routes';
import NavbarComponent from './components/NavbarComponent';


import './App.css'
import './index.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter />
      <NavbarComponent />
    </div>
  );
};

export default App
