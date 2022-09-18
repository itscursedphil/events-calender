export interface VenueAddress {
  id: string;
  street: string;
  streetNumber: string;
  postcode: number;
}

export interface Venue {
  id: string;
  name: string;
  description?: string;
  website?: string;
  address: VenueAddress;
}
