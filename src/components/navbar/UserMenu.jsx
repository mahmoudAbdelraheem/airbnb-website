/* eslint-disable react/prop-types */
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { handleSignOut } from "../../data/auth/authSignOut";
import { useNavigate } from "react-router-dom";
import DropdownWithIcon from "../DropdownMenu";
import { useTranslation } from "react-i18next";

function UserMenu({ user }) {
  const { t } = useTranslation();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const navigator = useNavigate();

  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          // TODO: add click event
          onClick={() => {}}
          className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                "
        >
          {t("airyourhome")}
        </div>
        <DropdownWithIcon />

        <div
          onClick={toggleOpen}
          className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                "
        >
          <AiOutlineMenu />

          <div className="hidden md:block">
            <Avatar imageSrc={user?.photoURL} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
            "
        >
          <div
            className="
                flex
                flex-col
                cursor-pointer
                "
          >
            {user ? (
              <>
                <MenuItem
                  onClick={() => {
                    navigator("/trips");
                  }}
                  label={t("mytrips")}
                />
                <MenuItem
                  onClick={() => {
                    navigator("/favorite");
                  }}
                  label={t("myfav")}
                />
                <MenuItem onClick={() => {}} label={t("myreservations")} />
                <MenuItem
                  onClick={() => {
                    navigator("/account");
                  }}
                  label={t("myaccount")}
                />
                <MenuItem onClick={() => {}} label={t("airyourhome")} />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label={t("myprofile")}
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    handleSignOut();
                    navigator("/");
                  }}
                  label={t("logout")}
                />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label={t("login")} />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label={t("register")}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
