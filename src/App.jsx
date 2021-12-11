import React, { Fragment } from 'react';
import MyGame from './components/myGame';
import NewGame from './components/newGame';
export default function App(props) {
    return (
        <div style={{
            height: "auto",
            padding: "0 0 50px"
        }}>
            <div>
                <h1>NewGame</h1>
                <NewGame />
            </div>
            <div>
                <h1>OldGame</h1>
                <MyGame />
            </div>
        </div>
    )
}