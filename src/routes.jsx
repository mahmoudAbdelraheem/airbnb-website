import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";

import ListingDetail from "./pages/ListingDetail";
import Account from "./pages/account/Account";
import PersonalInfo from "./pages/account/PesronalInfo";

//TODO: add all new routes here
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/favorite",
    element: <Favorite />,
  },
  {
    path: "listings/:id",
    element: <ListingDetail />,
  },

  {
    path: "/account",
    element: <Account />,
    children: [
      {
        path: "personal-info",
        element: <PersonalInfo />,
      },
    ],
  },
]);
export default routers;
