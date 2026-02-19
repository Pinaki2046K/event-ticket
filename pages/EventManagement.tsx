
import React, { useState, useEffect } from 'react';
import { EventData } from '../types';

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  
  const [formData, setFormData] = useState<Omit<EventData, 'id'>>({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    price: 0,
    image: 'https://picsum.photos/seed/' + Math.random() + '/800/600',
  });

  useEffect(() => {
    const savedEvents = localStorage.getItem('vibe_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      const initial: EventData[] = [
        {
          id: '1',
          name: 'Neon Nights Festival',
          date: '2025-08-12',
          time: '20:00',
          location: 'Bangalore, IN',
          description: 'The ultimate futuristic music experience in the garden city.',
          price: 4500,
          image: 'https://picsum.photos/seed/event1/800/600'
        },
        {
          id: '2',
          name: 'Digital Horizon 2025',
          date: '2025-09-05',
          time: '18:30',
          location: 'Mumbai, IN',
          description: 'A deep dive into the next wave of tech by the sea.',
          price: 2500,
          image: 'https://picsum.photos/seed/event2/800/600'
        }
      ];
      setEvents(initial);
      localStorage.setItem('vibe_events', JSON.stringify(initial));
    }
  }, []);

  const saveToLocalStorage = (newEvents: EventData[]) => {
    setEvents(newEvents);
    localStorage.setItem('vibe_events', JSON.stringify(newEvents));
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setFormData({
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
      price: 0,
      image: 'https://picsum.photos/seed/' + Date.now() + '/800/600',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (event: EventData) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      price: event.price,
      image: event.image,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure?')) {
      const updated = events.filter(e => e.id !== id);
      saveToLocalStorage(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      const updated = events.map(e => e.id === editingEvent.id ? { ...formData, id: e.id } : e);
      saveToLocalStorage(updated);
    } else {
      const newEvent: EventData = { ...formData, id: Date.now().toString() };
      saveToLocalStorage([...events, newEvent]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 md:p-12 space-y-12 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2 block">Event Architecture</span>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">Management</h1>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-white text-black font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300 transform active:scale-95 shadow-xl"
        >
          Add New Event
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {events.map((event) => (
          <div key={event.id} className="glass rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 group hover:border-white/20 transition-all border border-white/5">
            <div className="w-full md:w-48 h-48 rounded-[2rem] overflow-hidden shrink-0">
              <img src={event.image} alt={event.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-400 tracking-widest">{event.date}</span>
                  <span className="text-xl font-black italic text-zinc-300">₹{event.price.toLocaleString()}</span>
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-2 group-hover:text-purple-400 transition-colors uppercase italic">{event.name}</h3>
                <p className="text-zinc-500 text-sm line-clamp-2 mb-4">{event.description}</p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <button onClick={() => openEditModal(event)} className="flex-1 py-3 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Edit</button>
                <button onClick={() => handleDelete(event.id)} className="px-4 py-3 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 text-zinc-600">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl glass rounded-[3rem] p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-black italic tracking-tighter mb-8 uppercase">{editingEvent ? 'Edit Vibe' : 'New Vibe'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Event Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-purple-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Price (₹)</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-purple-500 outline-none transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white" />
                <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white" />
              </div>
              <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-purple-500 outline-none transition-all" placeholder="Location" />
              <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none transition-all resize-none" placeholder="Vibe description" />
              <div className="flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 glass rounded-2xl font-black uppercase tracking-widest">Cancel</button>
                <button type="submit" className="flex-[2] py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg transform active:scale-95">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
