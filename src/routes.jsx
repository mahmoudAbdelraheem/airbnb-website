import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";

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
]);
export default routers;
