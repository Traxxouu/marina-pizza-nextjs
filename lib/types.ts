
export interface Product {
  _id: string;
  _type: 'product';
  name: string;
  description: string;
  price: number;
  image?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  category: {
    _ref: string;
    _type: 'reference';
  };
  allergenes?: string[];
  available: boolean;
  featured?: boolean;
}

export interface Category {
  _id: string;
  _type: 'category';
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  order: number;
  icon?: string;
  image?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    hotspot?: { x: number; y: number };
  };
}

export interface Notification {
  _id: string;
  _type: 'notification';
  message: string;
  type: 'info' | 'warning' | 'success' | 'promo';
  active: boolean;
  startDate?: string;
  endDate?: string;
}

export interface Settings {
  _id: string;
  _type: 'settings';
  siteName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  openingHours: {
    day: string;
    hours: string;
  }[];
  deliveryZones: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
  };
}