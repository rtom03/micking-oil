import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Referrals from "./pages/Referrals";
import Cert from "./pages/Cert";
import Gallery from "./pages/Gallery";
import Products from "./pages/Products";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/certifications" element={<Cert />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/products" element={<Products />} />

        <Route path="/products/:slug" element={<Product />} />
      </Route>
    </Routes>
  );
};

export default App;
