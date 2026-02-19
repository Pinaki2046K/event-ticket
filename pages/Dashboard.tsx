
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EventData } from '../types';

interface DashboardProps {
  role: 'admin' | 'customer';
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('vibe_events');
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  const adminStats = [
    { label: 'Active Events', value: events.length.toString(), trend: 'Global Reach', color: 'purple' },
    { label: 'Tickets Sold', value: '4.2K', trend: '+12.4%', color: 'pink' },
    { label: 'Total Revenue', value: '₹12.4L', trend: '+18.2%', color: 'orange' },
    { label: 'User Flow', value: '78%', trend: 'High Vibe', color: 'cyan' },
  ];

  const customerStats = [
    { label: 'Tickets Held', value: '3', trend: 'Verified', color: 'purple' },
    { label: 'Saved Events', value: '8', trend: 'Trending', color: 'pink' },
    { label: 'Total Spent', value: '₹5,400', trend: 'Lifetime', color: 'orange' },
    { label: 'Loyalty Tier', value: 'GOLD', trend: 'Level 4', color: 'cyan' },
  ];

  const stats = role === 'admin' ? adminStats : customerStats;

  return (
    <div className="p-8 md:p-12 space-y-12 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2 block">Vibe Dashboard</span>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">{role === 'admin' ? 'HQ Overview' : 'My Experience'}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold uppercase text-zinc-500">Live Status</p>
            <p className="text-sm font-black italic text-emerald-400 underline decoration-emerald-500/20 underline-offset-4">Authenticated as {role}</p>
          </div>
          <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center neon-border">
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="group relative p-8 glass rounded-[2rem] hover:bg-white/5 transition-all duration-300 overflow-hidden border-b-4 border-b-transparent hover:border-b-purple-500">
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">{s.label}</p>
              <h3 className="text-4xl font-black italic tracking-tighter mb-4">{s.value}</h3>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-white/5 px-2 py-1 rounded-full text-zinc-400">
                <span className="text-emerald-400">↑</span> {s.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-[2.5rem] p-10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase">Trending Events</h2>
            <Link to={role === 'admin' ? "/events-manage" : "/explore"} className="text-xs font-black uppercase tracking-widest text-purple-400 hover:text-white transition-colors bg-purple-500/10 px-4 py-2 rounded-xl border border-purple-500/20">
              {role === 'admin' ? 'Manage' : 'Discover'}
            </Link>
          </div>
          
          <div className="space-y-6">
            {events.length > 0 ? events.slice(0, 3).map((event) => (
              <div key={event.id} className="group relative rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all p-1 flex items-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0">
                  <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="event" />
                </div>
                <div className="flex-1 px-6 truncate">
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-400 tracking-widest">{event.date}</span>
                  <h3 className="text-xl font-bold tracking-tight mb-1 truncate">{event.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                    <span className="truncate">📍 {event.location}</span>
                    <span className="shrink-0">🎟️ ₹{event.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="px-6 text-right hidden sm:block">
                  <Link to={role === 'admin' ? "/events-manage" : "/explore"} className="px-3 py-2 bg-white/5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
                    {role === 'admin' ? 'Control' : 'Book'}
                  </Link>
                </div>
              </div>
            )) : (
              <div className="p-12 text-center text-zinc-500 font-black italic">NO EVENTS FOUND</div>
            )}
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-10 flex flex-col h-full bg-gradient-to-br from-purple-500/5 to-transparent">
          <h2 className="text-2xl font-black italic tracking-tighter mb-8 uppercase">Hot Feed</h2>
          <div className="space-y-8 flex-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 group">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_#ec4899]"></div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">New Drop</p>
                  <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors leading-relaxed">Exclusive access to "Future Bass" starts in 2 hours. Keep your credentials ready.</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-10 w-full py-4 glass rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all text-purple-400">View Announcements</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
