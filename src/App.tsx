import React, { createRef, MouseEventHandler, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useRenderCounter } from './utils/utils';
import { DataProvider, useData, useUpdater } from './state/StateContext';
{/* TODO Change ? with Partial types */ }
type Data = {
    hor?: number,
    ver?: number,
    $plus2?: (st: Data) => number,
    _hor?: number,
    _$plus2?: (st: Data) => number,
}

function App() {
    const renderCounter = useRenderCounter()
    const [, forceState] = useState({})
    const data: Data = {
        hor: 0,
        ver: 0,
        $plus2: (st: Data) => (st.hor || 0) * 2,
        _hor: -3,
        _$plus2: (st: Data) => (st.hor || 0) * 2
    }

    return (

        <header className="App-header">
            <div style={{ border: '2px solid white', padding: 10 }} className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <label style={{ display: "block", padding: 10 }}>React Base</label>
                <div><label>Renders:</label> {renderCounter} <button onClick={() => forceState({})}>Force render</button></div>
                <DataProvider<Data> state={data}>
                    <StateDisplay />
                    <Updater />
                </DataProvider>
            </div>
        </header >

    );
}

const StateDisplay = React.memo(() => {
    const data: Data = useData()
    const renderCounter = useRenderCounter()
    const [, forceState] = useState({})

    return (
        <div style={{ border: '2px solid blue', padding: 10, marginTop: 10 }}>
            <div><label>Renders:</label> {renderCounter} <button onClick={() => forceState({})}>Force render</button></div>
            {`State: ${data.hor} ${data.ver} ${data.$plus2!(data)} ${data._hor} ${data._$plus2!(data)}`}
        </div>
    );
});

const Updater = React.memo(function Counter() {
    const updater = useUpdater();
    const renderCounter = useRenderCounter();
    const [, forceState] = useState({})
    const divRef = createRef<HTMLDivElement>()

    const handleScroll = (event: Event): void => {
        const h = Math.floor(divRef.current?.scrollLeft!)
        const v = Math.floor(divRef.current?.scrollTop!)
        updater({ hor: h, ver: v })
    };

    React.useEffect(() => {
        if (!divRef.current)
            return;

        divRef.current.addEventListener('scroll', handleScroll);

        return () => {
            divRef.current?.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <div style={{ border: '2px solid green', padding: 10 }}>
            <div><label>Renders:</label> {renderCounter} <button onClick={() => forceState({})}>Force render</button></div>
            <button onClick={() => {
                const h = Math.floor(Math.random() * 100);
                updater({ 
                    hor: -7,  
                    ver: -7,
                    $plus2: (st: Data) => (st.hor || 0) * 3,
                    _hor: -7,
                    _$plus3: (st: Data) => (st.hor || 0) * 3
                })
            }}>Change State</button>
            <div ref={divRef} style={{ border: "1px solid white", width: "350px", height: "200px", overflow: "auto", marginTop: 10 }}>
                <div style={{ border: "1px dashed white", width: "500px", height: "300px" }}>

                </div>
            </div>
        </div>
    );
});
export default App;
