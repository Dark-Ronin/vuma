import { Route, Routes } from 'react-router-dom'
import StoreLayout from './layouts/StoreLayout'
import AccountLayout from './layouts/AccountLayout'
import Home from './pages/store/Home'
import Products from './pages/store/Products'
import ProductDetails from './pages/store/ProductDetails'
import Cart from './pages/store/Cart'
import Checkout from './pages/store/Checkout'
import OrderSuccess from './pages/store/OrderSuccess'
import OrderDetails from './pages/store/OrderDetails'
import InfoPage from './pages/store/InfoPage'
import NotFound from './pages/store/NotFound'
import Profile from './pages/account/Profile'
import Orders from './pages/account/Orders'
import Addresses from './pages/account/Addresses'
import Wishlist from './pages/account/Wishlist'
import Stores from './pages/seller/Stores'
import SellerStore from './pages/seller/SellerStore'

export default function App() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/orders/:id/success" element={<OrderSuccess />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/:id" element={<SellerStore />} />
        <Route path="/info/:slug" element={<InfoPage />} />
        <Route element={<AccountLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
