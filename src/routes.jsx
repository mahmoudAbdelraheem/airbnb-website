import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import ListingDetail from "./components/listings/ListingDetail";
import Account from "./pages/Account";

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
  },
]);
export default routers;
