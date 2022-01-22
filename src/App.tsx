import React, {useRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import MyKonva from "./myKonva.js"
import Konva from "konva";

function App() {
    const canvasEl = useRef<any>(null);
    let konvaObj = useRef<any>()
    useEffect(() => {
        konvaObj.current = new MyKonva(canvasEl)

        setTimeout(function () {
            konvaObj.current.drawFig5()
        }, 5000);

        konvaObj.current.drawIntro()
    }, [])
    return (
        <div className="App">
            <header className="App-header" onClick={() => {
                console.log('click')
                konvaObj.current.progressFig5()
            }}>
                <div ref={canvasEl} style={{backgroundColor:'white'}}/>

            </header>
        </div>
    );
}

export default App;
