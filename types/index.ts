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
  maxQuantity?: number;
  bulkDiscountMinQty?: number;
  bulkDiscountPercent?: number;
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface IToast {
  id: string;
  productName: string;
}

export interface ICartContext {
  items: ICartItem[];
  isOpen: boolean;
  toasts: IToast[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  itemCount: number;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}
