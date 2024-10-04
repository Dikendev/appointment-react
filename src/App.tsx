import "./App.css";
import GlobalContextProvider from "./context/global/GlobalContextProvider";
import { HomePage } from "./pages/Home";

function App() {
  return (
    <GlobalContextProvider>
      <HomePage />
    </GlobalContextProvider>
  );
}

export default App;
