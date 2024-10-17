import { FC, PropsWithChildren, useCallback, useState } from "react";
import LoginContext from "./login-context";
import { logout } from "../../../services/logout";
import { toast } from "../../../hooks/useToast";
import { LoginDto, login as loginApi } from "../../../services/login";
import { useNavigate } from "react-router-dom";

const LoginContextProvider: FC<PropsWithChildren<object>> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  const saveEmail = useCallback((email: string) => {
    localStorage.setItem("user_email", email);
    setEmail(email);
  }, []);

  const login = async (loginDto: LoginDto) => {
    try {
      const userData = await loginApi(loginDto);

      saveEmail(userData.profile.email);

      navigate("/");
      toast({
        title: "Logged in successfully",
        description: "Welcome back!",
      });
    } catch (error) {
      console.warn(error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    }
  };

  const logOut = async () => {
    try {
      await logout();

      setEmail(null);

      localStorage.removeItem("user_email");

      toast({
        title: "Logout",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.log("Error during logout", error);
    }
  };

  const getEmail = useCallback(() => {
    const userLocal = localStorage.getItem("user_email");

    if (userLocal === null) {
      setEmail(null);
      return;
    }
    saveEmail(userLocal);
  }, [saveEmail]);

  const value = {
    getEmail,
    saveEmail,
    logOut,
    email,
    login,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export default LoginContextProvider;
