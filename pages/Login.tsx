
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (role: 'admin' | 'customer') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@vibe.event' && password === 'pass123') {
      onLogin('admin');
    } else if (email === 'user@vibe.event' && password === 'user123') {
      onLogin('customer');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#050505]">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative w-full max-w-md">
        <div className={`p-8 glass rounded-[2.5rem] shadow-2xl transition-all duration-500 ${isHovering ? 'scale-[1.02] border-white/20' : 'border-white/10'}`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-3xl mb-6 shadow-2xl rotate-3">
              <span className="text-4xl font-black italic tracking-tighter">V</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-2 italic uppercase">The Portal</h1>
            <p className="text-zinc-500 font-medium">Step into the event horizon.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@vibe.event"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-white placeholder:text-zinc-600"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-white placeholder:text-zinc-600"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm font-medium text-center italic">
                {error}
              </div>
            )}

            <button 
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.5)] transition-all duration-300 transform active:scale-95"
            >
              Verify Identity
            </button>
          </form>

          <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 border-b border-white/5 pb-2">Demo Credentials</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-purple-400 uppercase mb-1">Admin</p>
                <p className="text-[11px] text-zinc-400 truncate">admin@vibe.event</p>
                <p className="text-[11px] text-zinc-500">pass123</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-pink-400 uppercase mb-1">Customer</p>
                <p className="text-[11px] text-zinc-400 truncate">user@vibe.event</p>
                <p className="text-[11px] text-zinc-500">user123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Login;
