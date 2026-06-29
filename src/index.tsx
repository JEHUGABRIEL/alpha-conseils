import "./index.css";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./i18n";

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<App />);
}
