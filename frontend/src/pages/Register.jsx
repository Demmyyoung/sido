import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    is_seller: false,
    shop_name: '',
    bank_code: '',
    account_number: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const payload = { ...formData };
      console.log('Register payload:', payload); 
      if (!payload.is_seller) {
        delete payload.shop_name;
        delete payload.bank_code;
        delete payload.account_number;
      }
      const response = await api.post('/auth/local/register', payload);
      localStorage.setItem('token', response.data.jwt);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (formData.is_seller) {
        navigate('/seller');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Registration Error:', err.response?.data);
      setError(err.response?.data?.error?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#f8f8f7]">
      <div className="max-w-md w-full">
        <header className="text-center mb-12">
           <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">Create <br/>Account</h1>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 text-center">Join the Premium Network</p>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-500/5 border-l-2 border-red-500 text-red-500 text-[10px] font-black uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-8">
          <div>
            <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-black/40 mb-2">Alias (Username)</label>
            <input 
              name="username" 
              type="text" 
              placeholder="YOUR NAME"
              className="w-full bg-white border-b-2 border-black/5 px-6 py-4 text-sm font-bold focus:outline-none focus:border-black transition-all placeholder:text-black/5" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-black/40 mb-2">Electronic Mail</label>
            <input 
              name="email" 
              type="email" 
              placeholder="EMAIL@SIDO.COM"
              className="w-full bg-white border-b-2 border-black/5 px-6 py-4 text-sm font-bold focus:outline-none focus:border-black transition-all placeholder:text-black/5" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-black/40 mb-2">Secret Code (Password)</label>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-white border-b-2 border-black/5 px-6 py-4 text-sm font-bold focus:outline-none focus:border-black transition-all placeholder:text-black/5" 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="flex items-center gap-4 bg-white/50 p-4 border border-black/5">
            <input
              name="is_seller"
              type="checkbox"
              className="h-4 w-4 text-black border-2 border-black focus:ring-black rounded-none"
              onChange={handleChange}
            />
            <label className="text-[10px] font-black uppercase tracking-widest text-black/60 cursor-pointer">Register as Seller</label>
          </div>

          {formData.is_seller && (
            <div className="space-y-8 pt-4 border-t border-black/5">
              <div>
                <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-black/40 mb-2">Brand Identity (Shop Name)</label>
                <input 
                  name="shop_name" 
                  type="text" 
                  placeholder="SHOP NAME"
                  className="w-full bg-white border-b-2 border-black/5 px-6 py-4 text-sm font-bold focus:outline-none focus:border-black transition-all placeholder:text-black/5" 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-black/40 mb-2">Bank (Code)</label>
                  <input 
                    name="bank_code" 
                    type="text" 
                    placeholder="057"
                    className="w-full bg-white border-b-2 border-black/5 px-6 py-4 text-sm font-bold focus:outline-none focus:border-black transition-all placeholder:text-black/5" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-black/40 mb-2">Account Number</label>
                  <input 
                    name="account_number" 
                    type="text" 
                    placeholder="0123456789"
                    className="w-full bg-white border-b-2 border-black/5 px-6 py-4 text-sm font-bold focus:outline-none focus:border-black transition-all placeholder:text-black/5" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 shadow-xl shadow-black/10 active:scale-[0.98] ${
                loading ? 'bg-zinc-200 text-black/20 cursor-not-allowed text-center' : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              {loading ? 'Initializing...' : 'Confirm Registration'}
            </button>
          </div>
        </form>
        
        <p className="mt-12 text-center text-[10px] font-black uppercase tracking-widest text-black/20">
          Already a member? <Link to="/login" className="text-black hover:underline decoration-2 underline-offset-4 ml-2">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
