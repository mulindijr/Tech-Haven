import { Routes, Route } from 'react-router-dom';
import { Home, Shop, About, Contact, Cart, Faqs, Product, PlaceOrder, Orders } from './pages';
import Navigation from './components/Navigation'; 
import Footer from './components/Footer'
import SearchBar from './components/SearchBar';
import Login from './components/Login';

const App = () => {
  return (    
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navigation />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>   
  );
};

export default App;