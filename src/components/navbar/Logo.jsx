import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Logo() {
  const navigator = useNavigate();
  return (
    <img
      onClick={() => navigator("/")}
      alt="logo"
      className="hidden md:block cursor-pointer"
      height={100}
      width={100}
      src={logo}
    />
  );
}

export default Logo;
