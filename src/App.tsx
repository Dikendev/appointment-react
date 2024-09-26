import "./App.css";
import ContextProvider from "./context/context-provider";
import { HomePage } from "./pages/home";

function App() {
  return (
    <ContextProvider>
      <HomePage />
    </ContextProvider>
  );
}

export default App;
