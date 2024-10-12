import { useContext } from "react";
import LoginContext from "../context/global/login/login-context";

const useLogin = () => {
  const { getEmail, saveEmail, login, logOut, email } =
    useContext(LoginContext);
  return { getEmail, saveEmail, login, logOut, email };
};

export default useLogin;
