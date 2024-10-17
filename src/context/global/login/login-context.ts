import { createContext } from "react";
import { LoginDto } from "../../../services/login";

interface LoginContextType {
  saveEmail: (email: string) => void;
  getEmail: () => void;
  logOut: () => void;
  login: (loginDto: LoginDto) => void;
  email: string | null;
}

const LoginContext = createContext<LoginContextType>({
  getEmail: () => {},
  saveEmail: () => {},
  logOut: () => {},
  email: null,
  login: () => {},
});

export default LoginContext;
