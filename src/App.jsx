import { RouterProvider } from "react-router-dom";
import routers from "./routes";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
function App() {
  const initialOptions = {
    clientId:
      "AasK2GKojq52lJAafMj9rWD31tv__ahYAhLtiGLmvdKMVjlzYwHyrHVwPphoXBs0d-mJB6KPW5LZ-QV8", // Replace with your actual PayPal client ID
    currency: "USD", // Set your desired currency
    intent: "capture", // Specify intent (capture or authorize)
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <RouterProvider router={routers} />
    </PayPalScriptProvider>
  );
}

export default App;
