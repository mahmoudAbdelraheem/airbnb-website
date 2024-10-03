import { RouterProvider } from "react-router-dom";
import routers from "./routes";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
function App() {
  return <RouterProvider router={routers} />;
}

export default App;
