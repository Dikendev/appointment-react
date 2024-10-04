import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to={`/`}>Agendamentos</Link>
      <Link to={`clients`}>Clientes</Link>
    </div>
  );
};

export default Header;
