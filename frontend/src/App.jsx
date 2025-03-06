import { Routes, Route } from 'react-router-dom';
import { Home, Shop, About, Contact, Cart, Faqs, Product, PlaceOrder, Orders, Login } from './pages';
import Navigation from './components/Navigation'; 
import Footer from './components/Footer'
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (  
    <>
      <ToastContainer />
      <div>
        <Navigation />
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>      
          <SearchBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </div> 
    </>  
  );
};

export default App;