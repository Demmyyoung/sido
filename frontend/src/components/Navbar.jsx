import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#f8f8f7]/80 backdrop-blur-md border-b border-black/5">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-black tracking-tighter text-black uppercase font-['Montserrat']">
            sido
          </Link>
          
          <div className="flex items-center space-x-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            {token ? (
              <>
                {user.is_seller && (
                  <Link to="/seller" className="text-black/50 hover:text-black transition-colors">Seller Portal</Link>
                )}
                <span className="text-black/30 cursor-default select-none">{user.username}</span>
                <button 
                  onClick={handleLogout}
                  className="text-black/50 hover:text-red-500 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-black/50 hover:text-black transition-colors">Log In</Link>
                <Link 
                  to="/register" 
                  className="bg-black text-white px-6 py-3 hover:bg-zinc-800 transition-all duration-300"
                >
                  Start Selling
                </Link>
              </>
            )}

            <Link to="/cart" className="relative group text-black/80 hover:text-black transition-colors ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
