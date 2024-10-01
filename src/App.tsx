import "./App.css";
import GlobalContextProvider from "./components/context/global/GlobalContextProvider";
import { HomePage } from "./pages/Home";

function App() {
  return (
    <GlobalContextProvider>
      <HomePage />
    </GlobalContextProvider>
  );
}

export default App;
