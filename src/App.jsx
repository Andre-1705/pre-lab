import { BrowserRouter, Route, Routes, RouterContextProvider } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Nav } from "./components/Nav/Nav";
import { Footer } from "./components/Footer/Footer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartProvider } from "./context/CartContext/CartProvider";
import { Cart } from "./components/Cart/Cart";


function App() { 
  return (
    <>
      <BrowserRouter>
        <CartProvider> 
          <Header />
          <Nav />
            <Routes> 
              <Route path="/" element={<ItemListContainer titulo={"Bienvenidos"}/>} />               
              <Route path="/category/:category" element={<ItemListContainer titulo={"Bienvenidos"}/>} />
              <Route path="/detail/:id" element={<ItemDetailContainer/>}/>
              <Route path="/carrito" element={<Cart/>} />
              <Route path="/admin" element={ProductFormContainer}/>
            </Routes>
            <Footer />
        </CartProvider>  
      </BrowserRouter>
    </>
  );
}

export default App;
