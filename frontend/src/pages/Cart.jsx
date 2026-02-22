import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-40 text-center bg-[#f8f8f7]">
        <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-none">Your Selection <br/>is Empty</h2>
        <p className="mb-12 text-black/40 text-[10px] uppercase font-bold tracking-[0.3em]">No articles added to your collection yet.</p>
        <Link 
          to="/" 
          className="inline-block bg-black text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all duration-300 shadow-xl shadow-black/10"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f7] text-black">
      <div className="container mx-auto px-6 py-20">
        <header className="mb-20">
           <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">Collection</h1>
           <div className="flex items-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">{cartItems.length} Articles Selected</span>
              <div className="h-px flex-grow bg-black/5"></div>
           </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-12">
            {cartItems.map((item) => (
              <div key={item.id} className="group flex flex-col md:flex-row gap-10 pb-12 border-b border-black/5 last:border-0">
                <div className="w-full md:w-48 aspect-[4/5] bg-white flex-shrink-0 overflow-hidden shadow-2xl shadow-black/5 rounded-sm">
                  {item.image ? (
                    <img src={item.image.url} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/5 text-[10px] font-black uppercase tracking-widest">No Visual</div>
                  )}
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-black text-2xl uppercase tracking-tighter leading-none">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-black/20 hover:text-black transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em] mb-8">{item.category || 'Curated Article'}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center bg-white border border-black/5 rounded-full px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white rounded-full transition-all text-sm font-black"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 text-[10px] font-black w-10 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white rounded-full transition-all text-sm font-black"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-2xl font-black font-['Montserrat']">₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-10 shadow-2xl shadow-black/5 sticky top-32">
              <h3 className="text-xl font-black mb-10 uppercase tracking-[0.2em] border-b border-black/5 pb-4">Summary</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-black/40">
                  <span>Subtotal</span>
                  <span className="text-black">₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-black/40">
                  <span>Logistics</span>
                  <span className="text-zinc-400 font-black">Complimentary</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-black/40">
                  <span>Tax (Estimated)</span>
                  <span className="text-black">₦0.00</span>
                </div>
              </div>
              
              <div className="border-t-2 border-black pt-8 mb-12 flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Total</span>
                <span className="text-4xl font-black font-['Montserrat'] leading-none">₦{total.toLocaleString()}</span>
              </div>
              
              <button className="w-full bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all duration-300 shadow-xl shadow-black/10 active:scale-[0.98]">
                Proceed to Checkout
              </button>
              
              <div className="mt-8 flex items-center justify-center gap-4 text-[8px] font-bold text-black/30 uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full"></div>
                 Secure SSL Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
