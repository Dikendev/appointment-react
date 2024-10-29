import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import GlobalContextProvider from "./context/global/GlobalContextProvider";
import LoginContextProvider from "./context/global/login/LoginContextProvider";
import { Toaster } from "./components/toast/Toaster";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalContextProvider>
        <LoginContextProvider>
          <Header />
          <main>
            <Outlet />
          </main>
          <Toaster />
        </LoginContextProvider>
      </GlobalContextProvider>
    </DndProvider>
  );
};
export default App;
