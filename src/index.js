import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

export const rootUrl = process.env.REACT_APP_FETCH_URL;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
