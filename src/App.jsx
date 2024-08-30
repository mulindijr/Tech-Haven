import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Shop, About, Contact, Cart, Faqs, Login, SignUp } from './pages';
import Navigation from './components/Navigation'; 
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;