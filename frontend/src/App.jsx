import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Furniture from './pages/Furniture';
import Categories from './pages/Categories';
import ProductDetail from './pages/ProductDetail';
import Workspace from './pages/Workspace';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';

// Automatically scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export const App = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen font-sans bg-[#F4F7F7] text-[#172326]">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/furniture" element={<Furniture />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/furniture/:id" element={<ProductDetail />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
