export interface User {
  username: string;
  password: string;
}

export interface Application {
  name: string;
  description: string;
  image: string;
}

export interface CartItem {
  name: string;
}

export interface CheckoutRecord {
  items: CartItem[];
  totalItems: number;
  username: string;
}
