import { useEffect } from "react";
import useLogin from "../../../hooks/useLogin";
import Profile from "../../profile/Profle";
import { Button } from "../../ui/Button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/NavigationMenu";

const LoginStatus = () => {
  const { email, getEmail, logOut } = useLogin();

  const logOutButton = () => {
    return <Button onClick={logOut}>Logout</Button>;
  };

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <>
      {email ? (
        <div className="flex justify-center flex-row gap-4 justify-items-center	items-center">
          <Profile />
          <div>{email}</div>
          {logOutButton()}
        </div>
      ) : (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/login">Login</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </>
  );
};

export default LoginStatus;
