import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game';

function App() {

  const gridSize = 9;

  return (
    <div className="App">
      minor trolling
      <Game gridSize={gridSize}/>
    </div>
  );
}

export default App;
