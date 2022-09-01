import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./app.css";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
