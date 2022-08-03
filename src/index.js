import React from 'react';
import reportWebVitals from './reportWebVitals';
import {addPost, State, subscribe} from "./State/State";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

 function renderApp(state){
    root.render(
        <React.StrictMode>
            <App state={state} addPost={addPost}/>
        </React.StrictMode>
    );
}
renderApp(State)

subscribe(renderApp)



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
