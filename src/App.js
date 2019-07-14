import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const SNIPPETS = [
    'Type this sentence really fast!',
    "Don't screw up like you always do!",
    'I wonder how many times I look at the keyboard when I type?',
    "It's probably faster to just copy and paste this into the Browser."
  ];

  const INITIAL_GAME_STATE = {
    victory: false,
    startTime: null,
    endTime: null
  };
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  const [snippet, setSnippet] = useState('');
  const chooseSnippet = snippetIndex => () => {
    setUserText("");
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({ ...gameState, startTime: new Date().getTime() });
    // console.log('setSnippet', snippetIndex);
  };

  const [userText, setUserText] = useState('');
  const updateUserText = event => {
    setUserText(event.target.value);
    // console.log('current userText', userText);

    if(event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }

  };

  useEffect(() => {
    if(gameState.victory) document.title = 'Victory!';
  });

  return (
    <div>
      <h2>Typing Challenge</h2>
      <hr />
      <h3>Snippet</h3>
      { snippet }
      <h4>{ gameState.victory ? `Done! Time: ${ gameState.endTime }ms` : null }</h4>
      <input value={ userText } onChange={ updateUserText } />
      <hr />
      {
        SNIPPETS.map((SNIPPET, index) => (
          <button onClick={ chooseSnippet(index) } key={ index } >
            { SNIPPET.substring(0, 10) }...
          </button>
        ))
      }
    </div>
  )
}

export default App;
