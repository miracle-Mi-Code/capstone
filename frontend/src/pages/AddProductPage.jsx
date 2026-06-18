import React, { useState } from "react";

const AddProductPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Artisan", // matches your schema enum default
    imageUrl: "",
  });

  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If you have auth tokens set up later, you've to pass: 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          // Temporary fallback ID for the required schema relationship until auth token state is passed
          artisan: "65f1a2b3c4d5e6f7a8b9c0d1" 
        }),
      });

      const resData = await response.json();

      if (response.ok) {
        setStatus({ loading: false, error: null, success: true });
        setFormData({ name: "", description: "", price: "", stock: "", category: "Artisan", imageUrl: "" });
        setTimeout(() => onNavigate("home"), 1500); // Redirect to inventory home grid
      } else {
        setStatus({ loading: false, error: resData.message || "Failed to add product matrix.", success: false });
      }
    } catch (err) {
      setStatus({ loading: false, error: "Cannot reach backend core engine.", success: false });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 my-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-emerald-950">Add New Marketplace Product</h2>
        <button onClick={() => onNavigate("home")} className="text-xs text-gray-500 hover:underline">
          ← Cancel
        </button>
      </div>

      {status.success && (
        <div className="mb-4 bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 text-xs font-semibold">
          🚀 Product successfully broadcasted to marketplace array! Redirecting...
        </div>
      )}

      {status.error && (
        <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-xl border border-red-100 text-xs font-medium">
          ⚠️ {status.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Product Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-emerald-900" placeholder="e.g., Handwoven Kente Fabric" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" className="w-full text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-emerald-900" placeholder="Detailed product craftsmanship details..."></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Price (₦)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" className="w-full text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-emerald-900" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Stock Level</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" className="w-full text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-emerald-900" placeholder="Available units" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Category Segment</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-emerald-900">
            <option value="Artisan">Artisan</option>
            <option value="Textiles">Textiles</option>
            <option value="Food">Food</option>
            <option value="Jewelry">Jewelry</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Image URL</label>
          <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-emerald-900" placeholder="https://images.unsplash.com/... or blank for placeholder" />
        </div>

        <button type="submit" disabled={status.loading} className="w-full bg-amber-500 text-emerald-950 text-sm font-bold p-3 rounded-xl hover:bg-amber-600 transition-all disabled:opacity-50">
          {status.loading ? "Processing Engine..." : "Deploy Product to Matrix"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;