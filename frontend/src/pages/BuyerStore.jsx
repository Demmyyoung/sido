import { useEffect, useState } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { PLACEHOLDER_PRODUCTS } from '../constants';

const CATEGORIES = ["All", "Tech", "Electronics", "Home", "Fashion", "Gaming", "Gadgets", "Other"];

export default function BuyerStore() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products?populate=*');
        const data = response.data.data;
        if (data && data.length > 0) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
             // Fallback to placeholders if API returns empty
             setProducts(PLACEHOLDER_PRODUCTS);
             setFilteredProducts(PLACEHOLDER_PRODUCTS);
        }
      } catch (error) {
        console.error("API error, using placeholders:", error);
        setProducts(PLACEHOLDER_PRODUCTS);
        setFilteredProducts(PLACEHOLDER_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  return (
    <div className="min-h-screen bg-[#f8f8f7] text-black">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white px-6">
         <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop" 
              alt="Streetwear Hero" 
              className="w-full h-full object-cover"
            />
         </div>
         <div className="relative z-10 text-center max-w-5xl">
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
               GLOBAL<br/>RESOURCES
            </h1>
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-white/60 mb-12">
               Tech, Essentials & Everything In-Between
            </p>
            <div className="flex justify-center">
               <button 
                 onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}
                 className="group flex flex-col items-center gap-4 text-[10px] uppercase font-black tracking-widest"
               >
                 <span>Explore Catalog</span>
                 <div className="w-px h-12 bg-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white animate-bounce-slow origin-top"></div>
                 </div>
               </button>
            </div>
         </div>
      </section>

      {/* Catalog Search & Categories */}
      <div id="catalog" className="sticky top-20 z-40 bg-[#f8f8f7]/95 backdrop-blur-md border-b border-black/5">
        <div className="container mx-auto px-6 py-10">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              {/* Search */}
              <div className="relative max-w-xl w-full">
                 <span className="text-[10px] font-black uppercase tracking-widest text-black/20 block mb-2">Search Items</span>
                 <input 
                   type="text" 
                   placeholder="TYPE TO SEARCH..." 
                   className="w-full bg-transparent border-b-2 border-black/10 py-3 text-4xl font-black focus:outline-none focus:border-black uppercase placeholder:text-black/5 transition-all duration-500"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>

              {/* Categories */}
              <div className="flex gap-10 overflow-x-auto no-scrollbar pb-2">
                 {CATEGORIES.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 relative pb-2 ${
                       selectedCategory === cat 
                         ? 'text-black' 
                         : 'text-black/30 hover:text-black'
                     }`}
                   >
                     {cat}
                     {selectedCategory === cat && (
                       <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black animate-in fade-in zoom-in duration-300"></div>
                     )}
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-6 py-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-12">
              <div className="text-[10px] font-black text-black/40 uppercase tracking-[0.3em]">
                {filteredProducts.length} ARTICLES FOUND
              </div>
              <div className="hidden md:block w-32 h-px bg-black/10"></div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-40">
                <p className="text-2xl font-black uppercase tracking-tighter text-black/20 mb-4">No Articles Found</p>
                <button 
                  onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
                  className="text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
