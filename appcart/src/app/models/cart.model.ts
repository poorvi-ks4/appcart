export interface CartItem {
  name: string;
  quantity: number;
}

export interface CheckoutRecord {
  items: CartItem[];
  totalItems: number;
  username: string;
}
