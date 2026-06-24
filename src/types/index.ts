export type Category = "Botanical Prints" | "Fruit Prints" | "Soft Landscapes";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string | null;
  etsy_url: string | null;
  featured: boolean;
  active: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
