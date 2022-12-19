import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import ProductDetail from '../src/pages/ProductDetail';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
    </Routes>
  );
}
