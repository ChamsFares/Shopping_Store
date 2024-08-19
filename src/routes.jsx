import App from "./App";
import ShopPage from "./pages/ShopPage";
import ErrorPage from "./ErrorPage";
import ProductDetails from "./components/ProductDetails";
import HomePage from "./pages/HomePage";
import { element } from "prop-types";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/Home",
        element: <HomePage />,
      },
      {
        path: "/",
        element: <ShopPage />,
      },

      {
        path: "/product/:productId",
        element: <ProductDetails />,
      },
    ],
  },
];

export default routes;
