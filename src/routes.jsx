import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";

import ListingDetail from "./pages/ListingDetail";
import Account from "./pages/account/Account";
import PersonalInfo from "./pages/account/PesronalInfo";
import Trips from "./pages/Trips";
import Host from "./pages/Host";
import Reservations from "./pages/Reservations";

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
  {
    path: "/trips",
    element: <Trips />,
  },
  {
    path: "/host/:id",
    element: <Host />,
  },
  {
    path: "/reservations",
    element: <Reservations />,
  },
]);
export default routers;
