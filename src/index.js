import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { NoteListProvider } from "./context/NoteListContext";
import { NoteProvider } from "./context/NoteContext";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import App from "./App";
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <NoteListProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
      </NoteListProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
