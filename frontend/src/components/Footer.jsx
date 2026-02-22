import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4">
            <Link to="/" className="text-4xl font-black tracking-tighter uppercase font-['Montserrat'] mb-8 block">
              sido
            </Link>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 leading-relaxed max-w-xs">
              Your global gateway to premium tech, essentials, and curated resources. Seamless sourcing, authenticated delivery.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-white/20">Discovery</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
              <li><Link to="/" className="hover:text-white/60 transition-colors">Catalog</Link></li>
              <li><Link to="/cart" className="hover:text-white/60 transition-colors">Selection</Link></li>
              <li><Link to="/register" className="hover:text-white/60 transition-colors">New Drops</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-white/20">Merchant</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
              <li><Link to="/seller" className="hover:text-white/60 transition-colors">Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-white/60 transition-colors">Seller Portal</Link></li>
              <li><Link to="/register" className="hover:text-white/60 transition-colors">Join Verified</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-white/20">Frequency</h4>
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Subscribe to Drop Alerts</p>
              <div className="flex border-b border-white/20 focus-within:border-white transition-all">
                <input 
                  type="email" 
                  placeholder="EMAIL@SIDO.COM" 
                  className="bg-transparent py-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none w-full placeholder:text-white/5"
                />
                <button className="text-[10px] font-black uppercase tracking-widest px-4">Join</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20">
            © 2026 sido — ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-8 text-[8px] font-black uppercase tracking-[0.4em] text-white/20">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Hustle</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
