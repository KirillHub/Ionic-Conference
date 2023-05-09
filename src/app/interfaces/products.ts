export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  percentSale?: number;
  salePrice?: number;
}

export interface ProductCategory {
  name: string;
  productCategory: string;
  productId: number;
}
