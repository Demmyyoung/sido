import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/local', {
        identifier,
        password,
      });

      localStorage.setItem('token', response.data.jwt);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      const user = response.data.user;
      if (user.is_seller) {
        navigate('/seller');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#f8f8f7]">
      <div className="max-w-md w-full">
        <header className="text-center mb-12">
           <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">Welcome <br/>Back</h1>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 text-center">Identity Verification Required</p>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-500/5 border-l-2 border-red-500 text-red-500 text-[10px] font-black uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-black/40 mb-2">Access Key (Email)</label>
            <input
              type="email"
              placeholder="IDENTIFIER@DROPSNG.COM"
              className="w-full bg-white border-b-2 border-black/5 px-6 py-4 text-sm font-bold focus:outline-none focus:border-black transition-all placeholder:text-black/5"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-black/40 mb-2">Security Hash (Password)</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-white border-b-2 border-black/5 px-6 py-4 text-sm font-bold focus:outline-none focus:border-black transition-all placeholder:text-black/5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="pt-6">
            <button 
              type="submit" 
              className="w-full bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all duration-300 shadow-xl shadow-black/10 active:scale-[0.98]"
            >
              Sign In
            </button>
          </div>
        </form>
        
        <p className="mt-12 text-center text-[10px] font-black uppercase tracking-widest text-black/20">
          New collector? <Link to="/register" className="text-black hover:underline decoration-2 underline-offset-4 ml-2">Open Account</Link>
        </p>
      </div>
    </div>
  );
}
