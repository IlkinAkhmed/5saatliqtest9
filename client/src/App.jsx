import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BasketContextProvider from "./context/basket";
import WishlistContextProvider from "./context/wishlist";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/about";
import Add from "./pages/add";
import Basket from "./pages/basket";
import Contact from "./pages/contact";
import Details from "./pages/details";
import Home from "./pages/home";
import Wishlist from "./pages/wishlist";

function App() {
  return (
    <BrowserRouter>
      <WishlistContextProvider>
        <BasketContextProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/add" element={<Add />} />
            </Route>
          </Routes>
        </BasketContextProvider>
      </WishlistContextProvider>
    </BrowserRouter>
  );
}

export default App;
