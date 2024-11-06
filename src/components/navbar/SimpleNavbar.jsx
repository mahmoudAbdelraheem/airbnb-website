/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import Container from "../Container";
import UserMenu from "./UserMenu";
import SimpleLogo from "./SimpleLogo";

function SimpleNavbar({ user }) {
  const location = useLocation();
  const isPayment = location.pathname === "/payment";

  return (
    <div
      className={
        isPayment
          ? " fixed w-full bg-white z-[999] shadow-sm"
          : " fixed w-full bg-white z-[50] shadow-sm"
      }
    >
      <div
        className="
        py-4
        border-b-[1px]
        "
      >
        <Container>
          <div
            className="
                flex
                flex-row
                items-center
                justify-between
                gap-3
                md:gap-0
            "
          >
            <SimpleLogo />

            <UserMenu user={user} />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default SimpleNavbar;
