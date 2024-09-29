import "./App.css";
import GlobalContextProvider from "./context/GlobalContextProvider";
import { HomePage } from "./pages/home";

function App() {
  return (
    <GlobalContextProvider>
      <HomePage />
    </GlobalContextProvider>
  );
}

export default App;
