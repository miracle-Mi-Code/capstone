import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Authentication error occurred');
      login(data);
      onNavigate('home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <h2 className="text-xl font-black text-gray-900 text-center mb-1">Welcome Back</h2>
      <p className="text-xs text-gray-500 text-center mb-6">Access your MarketMeld engine account</p>
      {error && <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-700 text-xs p-3 rounded-lg font-medium">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-sm focus:outline-emerald-800" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-sm focus:outline-emerald-800" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-emerald-950 text-white text-sm font-bold py-2.5 rounded-xl transition-all hover:bg-emerald-900 disabled:opacity-50">
          {loading ? 'Authenticating Profile...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;