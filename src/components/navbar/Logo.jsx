
import logo from "../../assets/logo.png";
 function Logo() {
  return (
    <img
      alt="logo"
      className="hidden md:block cursor-pointer"
      height={100}
      width={100}
      src={logo}
    />
  );
}

export default Logo;
