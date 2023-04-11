import React from 'react';
import './styles/App.css';
import Game from './components/Game';

function App() {

  const gridLength = 3;
  const winconLength = 3;

  return (
    <div className="App">
      <Game gridSize={gridLength**2} winconLength={winconLength}/>
    </div>
  );
}

export default App;
