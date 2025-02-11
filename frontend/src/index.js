import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "./components/ui/provider";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
