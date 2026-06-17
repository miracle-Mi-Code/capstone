import React from 'react';

const ProductGrid = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">No authentic regional crafts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-w-6xl mx-auto">
      {products.map((product) => (
        <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          <div className="relative">
            <img src={product.imageUrl} alt={product.name} className="w-full h-44 object-cover" />
            <span className="absolute top-2 left-2 bg-emerald-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          <div className="p-3 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 truncate">{product.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">{product.description}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] block text-gray-400 font-medium uppercase">Price</span>
                <span className="text-base font-black text-emerald-900">₦{product.price.toLocaleString()}</span>
              </div>
              <button
                onClick={() => onAddToCart(product._id)}
                disabled={product.stock === 0}
                className={`text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                  product.stock > 0 
                    ? 'bg-amber-500 text-emerald-950 hover:bg-amber-600' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? 'Add' : 'Sold Out'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
