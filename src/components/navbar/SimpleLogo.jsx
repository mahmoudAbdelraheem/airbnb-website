import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function SimpleLogo() {
  const navigator = useNavigate();
  return (
    <img
      onClick={() => {
        navigator("/");
        navigator(0);
      }}
      alt="logo"
      className="md:block cursor-pointer"
      height={100}
      width={100}
      src={logo}
    />
  );
}

export default SimpleLogo;
