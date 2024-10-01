import AccountCards from "../components/account/AccountCards";
import SimpleNavbar from "../components/navbar/SimpleNavbar";

function Account() {
  return (
    <>
      <SimpleNavbar />
      <div className="h-[20vh]" />
      <AccountCards />
    </>
  );
}

export default Account;
