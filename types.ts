
export interface EventStat {
  id: string;
  name: string;
  ticketsSold: number;
  revenue: number;
  attendance: number;
  date: string;
  status: 'Sold Out' | 'Live' | 'Upcoming';
}

export interface EventData {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  price: number;
  image: string;
}

export interface MerchItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  category: 'Apparel' | 'Accessory' | 'Digital';
  image: string;
}

export interface Booking {
  id: string;
  eventId: string;
  eventName: string;
  quantity: number;
  totalPrice: number;
  bookingDate: string;
  status: 'Confirmed' | 'Cancelled';
}

export interface User {
  email: string;
  role: 'admin' | 'customer';
  isAuthenticated: boolean;
}
