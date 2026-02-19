
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-50">
      <div className="relative">
        {/* Animated Rings */}
        <div className="w-24 h-24 rounded-full border-t-2 border-purple-500 animate-spin"></div>
        <div className="absolute inset-0 w-24 h-24 rounded-full border-b-2 border-pink-500 animate-spin-reverse opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black italic tracking-tighter">VB</span>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-xl font-bold tracking-widest uppercase mb-2">Syncing Reality</h2>
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-progress"></div>
        </div>
        <p className="mt-4 text-xs font-mono text-zinc-500 uppercase tracking-widest animate-pulse">
          Fetching the vibe...
        </p>
      </div>

      <style>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
