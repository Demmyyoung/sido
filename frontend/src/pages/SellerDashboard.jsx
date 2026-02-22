import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // In a real app, filter by seller. For demo, fetching all.
      const response = await api.get('/products?populate=*');
      // Filter client-side for demo simplicity if API doesn't filter
      const myProducts = response.data.data.filter(p => p.author?.id === user.id);
      setProducts(myProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', {
        data: {
          ...newProduct,
          author: user.id
        }
      });
      fetchProducts();
      setNewProduct({ name: '', price: '', stock: '' });
    } catch (error) {
      alert('Failed to create user. Ensure you are a seller.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f7] text-black">
      <div className="container mx-auto px-6 py-20">
        <header className="mb-20">
           <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">Merchant <br/>Console</h1>
           <div className="flex items-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">Verified Seller: {user.username}</span>
              <div className="h-px flex-grow bg-black/5"></div>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Status & Creation */}
          <div className="lg:col-span-4 space-y-12">
            <section className="bg-white p-10 shadow-2xl shadow-black/5">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 border-b border-black/5 pb-4">Brand Status</h2>
              <div className="space-y-6">
                <div>
                   <span className="block text-[8px] font-black uppercase tracking-widest text-black/30 mb-1">Shop Name</span>
                   <span className="text-xl font-black uppercase tracking-tight">{user.shop_name}</span>
                </div>
                <div>
                  <span className="block text-[8px] font-black uppercase tracking-widest text-black/30 mb-1">Settlement ID</span>
                  {user.paystack_subaccount_code ? (
                    <span className="text-sm font-bold text-black font-mono">{user.paystack_subaccount_code}</span>
                  ) : (
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Awaiting Authorization</span>
                  )}
                </div>
              </div>
            </section>

            <section className="bg-black text-white p-10 shadow-2xl shadow-black/20">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-4">Launch Article</h2>
              <form onSubmit={handleCreateProduct} className="space-y-6">
                <div>
                  <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">Article Name</label>
                  <input 
                    placeholder="E.G. OVERSIZED TEE" 
                    className="w-full bg-white/5 border-b border-white/10 py-3 text-sm font-bold focus:outline-none focus:border-white transition-all placeholder:text-white/5"
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">Price (₦)</label>
                    <input 
                      placeholder="0" 
                      type="number"
                      className="w-full bg-white/5 border-b border-white/10 py-3 text-sm font-bold focus:outline-none focus:border-white transition-all placeholder:text-white/5"
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">Units Available</label>
                    <input 
                      placeholder="0" 
                      type="number"
                      className="w-full bg-white/5 border-b border-white/10 py-3 text-sm font-bold focus:outline-none focus:border-white transition-all placeholder:text-white/5"
                      value={newProduct.stock}
                      onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <button className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all duration-300 shadow-xl shadow-white/5 mt-4">
                  Confirm Product
                </button>
              </form>
            </section>
          </div>

          {/* Product Inventory */}
          <div className="lg:col-span-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-12 flex items-center gap-4">
              Inventory Ledger
              <span className="w-12 h-px bg-black/10"></span>
            </h2>
            
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {products.map(product => (
                  <div key={product.id} className="bg-white p-8 border border-black/5 hover:border-black/20 transition-all group relative overflow-hidden">
                    <div className="flex justify-between items-start mb-10">
                       <h3 className="text-xl font-black uppercase tracking-tight max-w-[70%] leading-none">{product.name}</h3>
                       <span className="text-[10px] font-black text-black font-['Montserrat']">₦{product.price.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-end">
                       <div className="space-y-1">
                          <span className="block text-[8px] font-black uppercase tracking-widest text-black/30">Current Stock</span>
                          <span className="text-xl font-black">{product.stock}</span>
                       </div>
                       <div className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-[#f8f8f7]">
                          Active Drop
                       </div>
                    </div>
                    
                    <div className="absolute top-0 right-0 w-12 h-12 bg-black/5 translate-x-1/2 -translate-y-1/2 rotate-45 group-hover:bg-black group-hover:scale-150 transition-all duration-500 opacity-20"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-black/5">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/10 mb-8">No collections listed yet</p>
                 <div className="w-8 h-px bg-black/5"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
