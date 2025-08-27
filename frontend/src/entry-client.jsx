import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./App.css";
const serverData = window.__SERVER_DATA__ || null;
const categoryProducts = window.__CATEGORY_PRODUCTS__ || null;

const rootElement = document.getElementById("root");

hydrateRoot(
  rootElement,
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App serverData={serverData} CategoryProducts={categoryProducts} />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
