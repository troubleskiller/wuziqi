/* eslint-disable prettier/prettier */
import React, { Fragment } from 'react';
import MyGame from './components/myGame';
import NewGame from './components/newGame';
type Props = {

};
export default function App(props: Props) {
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

// import React from 'react';
//
// type Props = {};
//
// const App = (props: Props) => {
//   return <div>App</div>;
// };
//
// export default App;
