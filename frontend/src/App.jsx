import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import { useCart } from './context/CartContext';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/products');
        const data = await response.json();
        if (response.ok) setProducts(data);
      } catch (error) {
        console.error("Failed to load products from API Engine:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activePage]); // Refetches when returning home to catch inventory state drops cleanly

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <Navbar onNavigate={setActivePage} activePage={activePage} />
      <main className="py-6">
        {activePage === 'home' && (
          <div>
            <div className="text-center py-6 px-4 max-w-xl mx-auto">
              <h2 className="text-2xl font-black text-emerald-950 sm:text-3xl">Direct Artisan Marketplace</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Real-time coordinated inventory engine supplying local West African goods globally.</p>
            </div>
            {loading ? (
              <div className="text-center py-12 text-sm text-gray-500 font-semibold">Loading catalog matrix...</div>
            ) : (
              <ProductGrid products={products} onAddToCart={(id) => addToCart(id, 1)} />
            )}
          </div>
        )}
        {activePage === 'cart' && <CartPage products={products} onNavigate={setActivePage} />}
        {activePage === 'login' && <LoginPage onNavigate={setActivePage} />}
      </main>
    </div>
  );
}

export default App;
