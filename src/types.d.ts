export interface CartItem {
  id: string;
  image_url: string;
  quantity: number;
  price: number;
  name: string;
  description: string;
}

export interface Cart {
  currency?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
