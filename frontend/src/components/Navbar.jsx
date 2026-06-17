import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, LogOut, User } from 'lucide-react';

const Navbar = ({ onNavigate, activePage }) => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-emerald-900 text-white sticky top-0 z-50 shadow-md px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 onClick={() => onNavigate('home')} className="text-xl font-black tracking-tight cursor-pointer">
          MarketMeld <span className="text-amber-400">Africa</span>
        </h1>
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('home')} className={`text-sm font-medium ${activePage === 'home' ? 'text-amber-400' : ''}`}>
            Marketplace
          </button>
          <button onClick={() => onNavigate('cart')} className="relative p-2 hover:bg-emerald-800 rounded-full transition-all">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-emerald-950 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs bg-emerald-800 px-2 py-1 rounded">Hi, {user.name}</span>
              <button onClick={logout} className="p-2 hover:bg-emerald-800 rounded-full transition-all text-amber-400"><LogOut size={18} /></button>
            </div>
          ) : (
            <button onClick={() => onNavigate('login')} className="flex items-center gap-1 text-sm font-medium border border-white/30 px-3 py-1 rounded hover:bg-white/10">
              <User size={16} /> Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
