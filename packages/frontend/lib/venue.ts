export interface VenueAddress {
  id: string;
  street: string;
  streetNumber: string;
  postCode: string;
}

export interface Venue {
  id: string;
  name: string;
  description?: string;
  website?: string;
  address: VenueAddress;
}
