import { useContext } from "react";
import GlobalContext from "../context/global/global-context";

const useGlobal = () => {
  const globalContext = useContext(GlobalContext);

  return { ...globalContext };
};

export default useGlobal;
