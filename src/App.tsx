import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import GlobalContextProvider from "./context/global/GlobalContextProvider";
import LoginContextProvider from "./context/global/login/LoginContextProvider";
import { Toaster } from "./components/toast/Toaster";

const App = () => {
  return (
    <GlobalContextProvider>
      <LoginContextProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <Toaster />
      </LoginContextProvider>
    </GlobalContextProvider>
  );
};
export default App;
