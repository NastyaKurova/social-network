import React from 'react';
import reportWebVitals from './reportWebVitals';
import store from "./State/reduxStore";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderApp(state) {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                <App store={store} state={state} dispatch={store.dispatch.bind(store)}/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    );
}

renderApp(store.getState())

store.subscribe(() => {
    const state = store.getState();
    renderApp(state);
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
