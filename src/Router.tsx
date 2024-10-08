import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages /HomePage";
import { App } from "./App";
import { NotFoundPage } from "./pages /NotFoundPage";
import { CartPage } from "./pages /CartPage";
import { ProductsPage } from "./pages /ProductsPage";

const Router = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />

      <Route path="products" element={<ProductsPage />} />
      <Route path="cart" element={<CartPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default Router;
