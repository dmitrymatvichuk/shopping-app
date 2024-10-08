import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

import "./App.scss";

export const App = () => (
  <div className="App" id="App">
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);
