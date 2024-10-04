import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import GlobalContextProvider from "./context/global/GlobalContextProvider";

function App() {
  return (
    <GlobalContextProvider>
      <Header />
      <main>
        <Outlet />
      </main>
    </GlobalContextProvider>
  );
}

export default App;
