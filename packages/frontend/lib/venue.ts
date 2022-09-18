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

// TODO: Add correct types
export const mapVenueQueryResult = (venueResult: any): Venue => ({
  id: venueResult.id as string,
  name: venueResult.attributes?.name as string,
  description: venueResult.attributes?.description ?? '',
  website: venueResult.attributes?.website ?? '',
  address: {
    id: venueResult.attributes?.address.id as string,
    street: venueResult.attributes?.address.street as string,
    streetNumber: venueResult.attributes?.address.streetNumber as string,
    postcode: venueResult.attributes?.address.postcode as number,
  },
});
