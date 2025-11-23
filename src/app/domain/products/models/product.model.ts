export type ProductPresentation = {
  id?: number;
  description?: string;
  type: string;
  conversionFactor: number;
  salePrice: number;
  allowsSale: boolean;
}

export type Product = {
  id?: number;
  code: string;
  name: string;
  laboratory: string;
  sanitaryRegistration: string;
  purchasePrice: number;
  requiresPrescription: boolean;
  status: string;
  presentations: ProductPresentation[];
  createdAt?: Date;
  updatedAt?: Date;
};

