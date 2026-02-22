import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { PLACEHOLDER_PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}?populate=*`);
        if (response.data && response.data.data) {
             setProduct(response.data.data);
        } else {
             throw new Error("Product not found");
        }
      } catch (error) {
        if (PLACEHOLDER_PRODUCTS) {
            const placeholder = PLACEHOLDER_PRODUCTS.find(p => p.id === Number(id));
            if (placeholder) setProduct(placeholder);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuy = async () => {
     try {
      const response = await api.post('/orders/initialize', {
        productId: product.id,
        quantity: 1
      });
      window.location.href = response.data.authorization_url;
    } catch (error) {
      alert('Action Restricted. Authentication required.');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f7]">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f7]">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20">Article Not Found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f8f7] text-black">
      <div className="container mx-auto px-6 py-12">
        <button onClick={() => navigate(-1)} className="group flex items-center gap-4 mb-20 text-[10px] font-black uppercase tracking-widest text-black/30 hover:text-black transition-all">
          <span className="group-hover:-translate-x-2 transition-transform">&larr;</span>
          <span>Return to Catalog</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Image Section */}
          <div className="lg:col-span-7">
            <div className="aspect-[4/5] bg-white relative overflow-hidden shadow-2xl shadow-black/5">
              {product.image ? (
                <img src={product.image.url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-black/5 text-2xl font-black uppercase tracking-[0.5em]">No Visual</div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-6 block">
                {product.category || 'Curated Article'}
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-none mb-6">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 mb-10">
                 <span className="text-3xl font-black text-black font-['Montserrat']">
                   ₦{Number(product.price).toLocaleString()}
                 </span>
                 <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest">VAT Included</span>
              </div>
              
              <div className="h-px w-full bg-black/5 mb-10"></div>
              
              <div 
                className="text-sm text-black/60 leading-relaxed font-medium mb-12 max-w-md" 
                dangerouslySetInnerHTML={{ __html: product.description }} 
              />
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all duration-300 shadow-xl shadow-black/10 active:scale-[0.98]"
              >
                Add to Collection
              </button>
              <button 
                onClick={handleBuy}
                className="w-full bg-transparent text-black border-2 border-black py-6 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300 active:scale-[0.98]"
              >
                Instant Checkout
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-[#f8f8f7] bg-zinc-200"></div>
                  ))}
               </div>
               <p className="text-[8px] font-bold text-black/40 uppercase tracking-widest">
                 Trusted by 500+ collectors in Lagos
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
