import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useRenderCounter } from './utils/utils';

function App() {
    const renderCounter = useRenderCounter()
    const [state, setState] = useState({counter: 0})
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div><label>Renders</label> {renderCounter} *{state.counter}* <button onClick={() => setState({...state})}>Force render</button></div>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
