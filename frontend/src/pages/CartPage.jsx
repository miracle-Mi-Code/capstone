import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, AlertCircle } from 'lucide-react';

const CartPage = ({ products, onNavigate }) => {
  const { cart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Hydrate core minimalist array items into rich UI data structures matching current inventory list
  const fullCartItems = cart.map(cartItem => {
    const product = products.find(p => p._id === cartItem._id);
    return product ? { ...product, quantity: cartItem.quantity } : null;
  }).filter(Boolean);

  const checkoutTotal = fullCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!user) { onNavigate('login'); return; }
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          items: cart.map(item => ({ product: item._id, quantity: item.quantity }))
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Checkout failed');

      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl border border-emerald-100">
          <h2 className="text-2xl font-black mb-2">Order Confirmed!</h2>
          <p className="text-sm">Your order was synced directly with artisan nodes. Inventory decremented cleanly.</p>
          <button onClick={() => onNavigate('home')} className="mt-6 w-full bg-emerald-950 text-white font-bold py-2 rounded-xl text-sm">
            Return to Marketplace
          </button>
        </div>
      </div>
    );
  }

  if (fullCartItems.length === 0) {
    return (
      <div className="text-center py-16 px-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-900">Your basket is empty</h2>
        <p className="text-sm text-gray-500 mt-1">Explore authentic items across local artisan markets.</p>
        <button onClick={() => onNavigate('home')} className="mt-4 bg-emerald-900 text-white text-sm font-semibold px-4 py-2 rounded-lg">
          Shop Crafts
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-black text-gray-900 mb-4">Your Shopping Cart</h2>
      {error && (
        <div className="mb-4 bg-rose-50 text-rose-700 text-xs font-semibold p-3 rounded-lg flex items-center gap-2 border border-rose-100">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      <div className="space-y-3">
        {fullCartItems.map(item => (
          <div key={item._id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg shrink-0" />
            <div className="grow min-w-0">
              <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
              <p className="text-xs font-black text-emerald-800 mt-0.5">₦{item.price.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2 py-0.5 bg-gray-100 text-xs font-bold rounded">-</button>
                <span className="text-xs font-bold px-1">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2 py-0.5 bg-gray-100 text-xs font-bold rounded">+</button>
              </div>
            </div>
            <button onClick={() => updateQuantity(item._id, 0)} className="text-gray-400 hover:text-rose-600 p-2"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-gray-100 pt-4 bg-gray-50 p-4 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-bold uppercase">Total Order Amount</span>
          <span className="text-xl font-black text-emerald-950">₦{checkoutTotal.toLocaleString()}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-4 w-full bg-amber-500 text-emerald-950 font-black py-3 rounded-xl text-sm shadow-sm transition-all hover:bg-amber-600 disabled:opacity-50"
        >
          {loading ? 'Processing Transaction...' : user ? 'Place Secure Order' : 'Sign In to Complete Purchase'}
        </button>
      </div>
    </div>
  );
};

export default CartPage;