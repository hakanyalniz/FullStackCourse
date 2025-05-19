import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

import "./style.css";

// Normally, in redux toolkit, a seperate file is used to create the store
// more "classical" version of redux is used for learning purposes
const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };
  const ok = () => {
    store.dispatch({
      type: "OK",
    });
  };
  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };
  const reset = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div className="flex-container">
      <div className="box-container">
        <div className="row">
          <div className="number">good {store.getState().good}</div>
          <button onClick={good}>good</button>
        </div>
        <div className="row">
          <div className="number">ok {store.getState().ok}</div>
          <button onClick={ok}>ok</button>
        </div>
        <div className="row">
          <div className="number">bad {store.getState().bad}</div>
          <button onClick={bad}>bad</button>
        </div>
        <div className="row">
          <button className="reset-button" onClick={reset}>
            reset stats
          </button>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
