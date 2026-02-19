
import React, { useState, useEffect } from 'react';
import { Booking } from '../types';

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('vibe_bookings');
    if (saved) setBookings(JSON.parse(saved));
  }, []);

  const handleCancel = (id: string) => {
    if (window.confirm('Void this booking? This might affect your vibe level.')) {
      const updated = bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' as const } : b);
      setBookings(updated);
      localStorage.setItem('vibe_bookings', JSON.stringify(updated));
    }
  };

  return (
    <div className="p-8 md:p-12 space-y-12 max-w-7xl mx-auto">
      <header>
        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2 block">Personal Vault</span>
        <h1 className="text-5xl font-black italic tracking-tighter uppercase">My Tickets</h1>
      </header>

      <div className="space-y-6">
        {bookings.length > 0 ? bookings.map(booking => (
          <div key={booking.id} className="glass rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-white/10 transition-all border border-white/5">
            <div className="w-20 h-20 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-white/5">
              <span className="text-[10px] font-black text-zinc-600 uppercase">Type</span>
              <span className="text-xl font-black italic text-purple-400">VIP</span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2 justify-center md:justify-start">
                <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest uppercase">{booking.id}</span>
                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                  {booking.status}
                </span>
              </div>
              <h3 className="text-2xl font-black italic tracking-tight uppercase group-hover:text-purple-400 transition-colors">{booking.eventName}</h3>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Booked on {booking.bookingDate} • {booking.quantity} Tickets</p>
            </div>

            <div className="text-center md:text-right shrink-0">
              <p className="text-xs text-zinc-500 font-black uppercase mb-1">Paid Amount</p>
              <p className="text-2xl font-black italic text-white">₹{booking.totalPrice.toLocaleString()}</p>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Download</button>
              {booking.status === 'Confirmed' && (
                <button 
                  onClick={() => handleCancel(booking.id)}
                  className="px-6 py-3 glass rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-red-400 transition-all"
                >
                  Void
                </button>
              )}
            </div>
          </div>
        )) : (
          <div className="py-24 text-center glass rounded-[3rem] border-dashed border-2 border-white/5">
            <p className="text-2xl font-black italic text-zinc-600 uppercase mb-4">The vault is empty</p>
            <p className="text-sm font-bold text-zinc-700 uppercase tracking-widest">Go explore the horizon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
