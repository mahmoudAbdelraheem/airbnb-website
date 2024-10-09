import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";

import ListingDetail from "./pages/ListingDetail";
import Account from "./pages/account/Account";
import PersonalInfo from "./pages/account/PesronalInfo";
import Trips from "./pages/Trips";
import Host from "./pages/Host";
import Reservations from "./pages/Reservations";
import Properties from "./pages/Properties";
import Payment from "./components/Payment";

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
    path: "/properties",
    element: <Properties />,
  },
  {
    path: "/host/:id",
    element: <Host />,
  },
  {
    path: "/reservations",
    element: <Reservations />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
]);
export default routers;
