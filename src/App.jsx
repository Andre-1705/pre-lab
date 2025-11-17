import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartProvider } from "./context/CartContext/CartProvider";
import { Cart } from "./components/Cart/Cart";
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer/ProductFormContainer";
import { MainLayout } from "./layouts/MainLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Login } from "./components/Login/Login";
import { RutaProtegida } from "./components/RutaProtegida/RutaProtegida";

function App() { 
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Rutas públicas bajo layout principal */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<ItemListContainer titulo={"Bienvenidos"} />} />
            <Route path="/category/:category" element={<ItemListContainer titulo={"Bienvenidos"} />} />
            <Route path="/detail/:id" element={<ItemDetailContainer />} />
            <Route path="/carrito" element={<Cart />} />
          </Route>

          {/* Área de administración con su layout y Outlet */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Login />} />
            <Route
              path="alta-producto"
              element={
                <RutaProtegida>
                  <ProductFormContainer />
                </RutaProtegida>
              }
            />
          </Route>
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}
export default App;
