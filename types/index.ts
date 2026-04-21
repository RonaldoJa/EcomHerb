export interface IProduct {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  onSale: boolean;
  salePrice?: number;
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface ICartContext {
  items: ICartItem[];
  isOpen: boolean;
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  itemCount: number;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}
