import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './Component/Products/Products';
import Cart from './Component/Cart/Cart';
import Single from './Component/Single_product/Single';
function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path='/' Component={Products} />
            <Route path='/cart' Component={Cart} />
            <Route path='/product/:id' Component={Single} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
