
import React, { useState } from 'react';

const Merch: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const items = [
    { id: 1, name: 'Holographic Hoodie', price: 4200, stock: 42, sold: 128, category: 'Apparel', img: 'https://picsum.photos/seed/hoodie/600/600' },
    { id: 2, name: 'Cyber Shades V2', price: 6500, stock: 12, sold: 84, category: 'Accessory', img: 'https://picsum.photos/seed/shades/600/600' },
    { id: 3, name: 'Pixel Cap', price: 1800, stock: 156, sold: 312, category: 'Apparel', img: 'https://picsum.photos/seed/cap/600/600' },
    { id: 4, name: 'NFT VIP Pass', price: 12000, stock: 5, sold: 45, category: 'Digital', img: 'https://picsum.photos/seed/nft/600/600' },
    { id: 5, name: 'Vibe Sticker Pack', price: 450, stock: 1200, sold: 890, category: 'Accessory', img: 'https://picsum.photos/seed/stickers/600/600' },
    { id: 6, name: 'Overload Tee', price: 2200, stock: 88, sold: 215, category: 'Apparel', img: 'https://picsum.photos/seed/tee/600/600' },
  ];

  const categories = ['All', 'Apparel', 'Accessory', 'Digital'];
  const filteredItems = activeTab === 'All' ? items : items.filter(i => i.category === activeTab);

  return (
    <div className="p-8 md:p-12 space-y-12 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2 block">Drip Inventory</span>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">Merch Store</h1>
        </div>
        <div className="flex glass p-1 rounded-2xl overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === cat ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-500'}`}>{cat}</button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div key={item.id} className="group glass rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all duration-500">
            <div className="relative h-72">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-4 right-4 px-3 py-1 glass rounded-lg text-[10px] font-black uppercase tracking-widest text-white">{item.category}</div>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold tracking-tight uppercase italic">{item.name}</h3>
                <span className="text-xl font-black text-purple-400 italic">₹{item.price.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-bold uppercase text-zinc-500 mb-1">Stock</p>
                  <p className="text-sm font-mono font-bold text-zinc-300">{item.stock}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-bold uppercase text-zinc-500 mb-1">Sold</p>
                  <p className="text-sm font-mono font-bold text-emerald-400">{item.sold}</p>
                </div>
              </div>
              <button className="mt-6 w-full py-4 glass rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Merch;
