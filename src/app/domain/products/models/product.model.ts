export type ProductPresentation = {
  id?: number;
  description: string;
  conversionFactor: number;
  salePrice: number;
  status: string;
}

export type Product = {
  id?: number;
  code: string;
  name: string;
  laboratory: string;
  sanitaryRegistration: string;
  purchasePrice: number;
  requirePrescription: boolean;
  status: string;
  presentations: ProductPresentation[];
  createdAt?: Date;
  updatedAt?: Date;
};

