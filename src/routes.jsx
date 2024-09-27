import { createBrowserRouter } from "react-router-dom";
import Home from "./presentation/pages/Home";

//TODO: add all new routes here
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

]);
export default routers;
