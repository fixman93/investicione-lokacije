export type Contact = {
  name: string;
  email?: string;
  phone?: string;
};

export type LocationFeature = {
  id: string;
  name: string;
  description?: string;
  areaM2: number;
  pricePerM2: number;
  address?: string;
  contact: Contact;
  geometry: any;
  coordinates?: any;
};
