import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 relative">
      <div className="aspect-[4/5] bg-[#f0f0ef] relative overflow-hidden">
        {product.image ? (
          <img 
            src={product.image.url} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black/10 text-[10px] font-black uppercase tracking-[0.3em]">
            No Visual
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
           <span className="bg-white/90 backdrop-blur-sm text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1">
             {product.category || 'Other'}
           </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-[10px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1 truncate">
          {product.name}
        </h3>
        <div className="flex justify-between items-end">
          <span className="text-lg font-black text-black font-['Montserrat'] leading-none">
            ₦{Number(product.price).toLocaleString()}
          </span>
          <span className="text-[8px] font-black uppercase tracking-widest text-black/20 group-hover:text-black transition-colors">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
