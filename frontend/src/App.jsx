import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddProductPage from "./pages/AddProductPage"; // 1. IMPORT ADMIN PAGE
import { useCart } from "./context/CartContext";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (activePage !== "home") return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/products`,
        );
        const data = await response.json();

        if (response.ok) {
          // 🛡️ PIPELINE ROBUSTNESS PATCH: Handles all potential backend API wrappers safely
          if (Array.isArray(data)) {
            setProducts(data);
          } else if (data.products && Array.isArray(data.products)) {
            setProducts(data.products);
          } else if (data.data && Array.isArray(data.data)) {
            setProducts(data.data);
          } else {
            console.error("Data received is not an array matrix:", data);
            setProducts([]);
          }
        } else {
          setError("Failed to fetch product catalog metadata.");
        }
      } catch (error) {
        console.error("Failed to load products:", error);
        setError("Unable to connect to the backend core engine.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activePage]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <Navbar onNavigate={setActivePage} activePage={activePage} />

      {/* QUICK FLOATING DEV SHORTCUT BUTTON TO ACCESS ADMIN EASILY */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() =>
            setActivePage(activePage === "admin" ? "home" : "admin")
          }
          className="bg-emerald-900 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-lg hover:bg-emerald-800 transition-all"
        >
          {activePage === "admin"
            ? "👁️ View Storefront"
            : "🛠️ Admin: Add Product"}
        </button>
      </div>

      <main className="py-6">
        {activePage === "home" && (
          <div>
            <div className="text-center py-6 px-4 max-w-xl mx-auto">
              <h2 className="text-2xl font-black text-emerald-950 sm:text-3xl">
                Direct Artisan Marketplace
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Real-time coordinated inventory engine supplying local West
                African goods globally.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12 text-sm text-gray-500 font-semibold animate-pulse">
                Loading catalog matrix...
              </div>
            ) : error ? (
              <div className="text-center py-12 max-w-md mx-auto px-4">
                <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 font-medium text-sm">
                  ⚠️ {error} <br />
                  <span className="text-xs text-red-500 font-normal mt-1 block">
                    Check that your node server is running on port 5000.
                  </span>
                </div>
              </div>
            ) : (
              <ProductGrid
                products={products}
                onAddToCart={(id) => addToCart(id, 1)}
              />
            )}
          </div>
        )}

        {activePage === "cart" && (
          <CartPage products={products} onNavigate={setActivePage} />
        )}
        {activePage === "login" && <LoginPage onNavigate={setActivePage} />}
        {activePage === "register" && (
          <RegisterPage onNavigate={setActivePage} />
        )}

        {/* 2. RENDER THE ADMIN PAGE CONDITIONALLY */}
        {activePage === "admin" && (
          <AddProductPage onNavigate={setActivePage} />
        )}
      </main>
    </div>
  );
}

export default App;
