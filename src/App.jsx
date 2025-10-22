import { BrowserRouter, Route, Routes, RouterContextProvider } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav/Nav";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartProvider } from "./context/CartContext/CartProvider";

function App() { 
  return (
    <>
      <BrowserRouter>
        <CartProvider> 
          <Nav />
            <Routes> 
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/detail/:id" element={<ItemDetailContainer/>}/>
              <Route path="/carrito" element={<h1>Carrito</h1>} />
            </Routes>
        </CartProvider>  
      </BrowserRouter>
    </>
  );
}

export default App;
