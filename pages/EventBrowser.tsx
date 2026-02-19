
import React, { useState, useEffect } from 'react';
import { EventData, Booking } from '../types';

const EventBrowser: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'paying' | 'success'>('idle');

  useEffect(() => {
    const saved = localStorage.getItem('vibe_events');
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  const handleBook = () => {
    if (!selectedEvent) return;
    setBookingStatus('paying');
    
    // Simulate payment delay
    setTimeout(() => {
      const newBooking: Booking = {
        id: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        eventId: selectedEvent.id,
        eventName: selectedEvent.name,
        quantity: quantity,
        totalPrice: selectedEvent.price * quantity,
        bookingDate: new Date().toLocaleDateString(),
        status: 'Confirmed'
      };
      
      const savedBookings = JSON.parse(localStorage.getItem('vibe_bookings') || '[]');
      localStorage.setItem('vibe_bookings', JSON.stringify([...savedBookings, newBooking]));
      
      setBookingStatus('success');
      setTimeout(() => {
        setBookingStatus('idle');
        setSelectedEvent(null);
        setQuantity(1);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="p-8 md:p-12 space-y-12 max-w-7xl mx-auto">
      <header>
        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2 block">Live Experiences</span>
        <h1 className="text-5xl font-black italic tracking-tighter uppercase">Explore Events</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <div key={event.id} className="group glass rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-500">
            <div className="relative h-64">
              <img src={event.image} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md mb-2 inline-block">{event.date}</span>
                  <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase">{event.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-400 font-bold uppercase mb-1">Pass From</p>
                  <p className="text-xl font-black italic text-white">₹{event.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {event.location}</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span> {event.time}</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{event.description}</p>
              <button 
                onClick={() => setSelectedEvent(event)}
                className="w-full py-4 glass rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
              >
                Get Tickets
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => bookingStatus === 'idle' && setSelectedEvent(null)}></div>
          <div className="relative w-full max-w-lg glass rounded-[3rem] p-10 overflow-hidden">
            {bookingStatus === 'idle' ? (
              <>
                <h2 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">{selectedEvent.name}</h2>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">Booking Details</p>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center p-6 bg-white/5 rounded-3xl border border-white/5">
                    <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Quantity</span>
                    <div className="flex items-center gap-6">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center glass rounded-xl hover:bg-white/10 transition-colors">-</button>
                      <span className="text-xl font-black italic">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center glass rounded-xl hover:bg-white/10 transition-colors">+</button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center px-6">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Grand Total</span>
                    <span className="text-3xl font-black italic text-purple-400">₹{(selectedEvent.price * quantity).toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleBook}
                  className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:shadow-purple-500/40 transition-all transform active:scale-95"
                >
                  Pay via Razorpay
                </button>
              </>
            ) : bookingStatus === 'paying' ? (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 border-t-4 border-purple-500 rounded-full animate-spin mb-8"></div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Authenticating Transaction</h2>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Don't close the window...</p>
              </div>
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_#10b981]">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">VIBE CONFIRMED</h2>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Redirecting to tickets...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventBrowser;
