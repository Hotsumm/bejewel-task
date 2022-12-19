import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import ProductDetail from '../src/pages/ProductDetail';
import ProductUpload from '../src/pages/ProductUpload';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-upload" element={<ProductUpload />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
    </Routes>
  );
}
