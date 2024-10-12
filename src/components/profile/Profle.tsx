import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

const Profile = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>Error</AvatarFallback>
    </Avatar>
  );
};

export default Profile;
