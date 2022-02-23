import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ShoppingCartProvider from "./context/ShoppingCart";
import { ThemeProvider } from "styled-components";

import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ShoppingCartProvider>
        <App />
      </ShoppingCartProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
