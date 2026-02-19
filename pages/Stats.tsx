
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const data = [
  { name: 'Mon', sales: 4000, visits: 2400 },
  { name: 'Tue', sales: 3000, visits: 1398 },
  { name: 'Wed', sales: 2000, visits: 9800 },
  { name: 'Thu', sales: 2780, visits: 3908 },
  { name: 'Fri', sales: 1890, visits: 4800 },
  { name: 'Sat', sales: 2390, visits: 3800 },
  { name: 'Sun', sales: 3490, visits: 4300 },
];

const eventStats = [
  { name: 'Techno Night', value: 85, color: '#a855f7' },
  { name: 'Cyber Punk', value: 45, color: '#ec4899' },
  { name: 'Lo-fi Study', value: 65, color: '#3b82f6' },
  { name: 'Art Showcase', value: 30, color: '#f59e0b' },
];

const Stats: React.FC = () => {
  return (
    <div className="p-8 md:p-12 space-y-12 max-w-7xl mx-auto">
      <header>
        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2 block">Insights & Growth</span>
        <h1 className="text-5xl font-black italic tracking-tighter">ANALYTICS HUB</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 glass rounded-[2.5rem] p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter">TICKET TRACTION</h2>
              <p className="text-zinc-500 text-xs font-bold uppercase">Last 7 Days performance</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 glass rounded-lg">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Sales</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 glass rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Visits</span>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff30" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{fontWeight: 'bold'}}
                />
                <YAxis 
                  stroke="#ffffff30" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{fontWeight: 'bold'}}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mini Chart Section */}
        <div className="glass rounded-[2.5rem] p-10 flex flex-col">
          <h2 className="text-2xl font-black italic tracking-tighter mb-2">HYPE LEVEL</h2>
          <p className="text-zinc-500 text-xs font-bold uppercase mb-8">Capacity per Event</p>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventStats} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#ffffff60" 
                  fontSize={10} 
                  width={80} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{fontWeight: '800'}}
                />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                  {eventStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 space-y-4">
            <div className="p-6 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl">
              <p className="text-[10px] font-mono font-bold uppercase text-purple-400 mb-1">AI Prediction</p>
              <p className="text-sm font-bold text-zinc-300 italic">"Techno Night" is likely to sell out in the next 14 hours based on velocity.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Table */}
      <div className="glass rounded-[2.5rem] p-10 overflow-hidden">
        <h2 className="text-2xl font-black italic tracking-tighter mb-8">RAW DATA BREAKDOWN</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 uppercase text-[10px] font-black tracking-widest text-zinc-500">
                <th className="pb-6 pl-4">Event Name</th>
                <th className="pb-6">Status</th>
                <th className="pb-6">Tickets Sold</th>
                <th className="pb-6">Revenue</th>
                <th className="pb-6 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[1, 2, 3, 4].map(i => (
                <tr key={i} className="group hover:bg-white/5 transition-colors">
                  <td className="py-6 pl-4">
                    <div className="font-bold flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                      Ultra Glow Festival {i}
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-md text-[9px] font-black uppercase tracking-widest border border-purple-500/20">LIVE</span>
                  </td>
                  <td className="py-6 font-mono text-sm">{1200 + i*150} / 5000</td>
                  <td className="py-6 font-mono font-bold">$ {(42500 * i).toLocaleString()}</td>
                  <td className="py-6 pr-4 text-right">
                    <button className="text-[10px] font-black uppercase tracking-widest p-2 glass rounded-lg hover:neon-border transition-all">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stats;
