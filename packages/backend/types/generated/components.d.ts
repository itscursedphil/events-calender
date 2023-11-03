import type { Schema, Attribute } from '@strapi/strapi';

export interface LocationAddress extends Schema.Component {
  collectionName: 'components_location_addresses';
  info: {
    displayName: 'address';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    street: Attribute.String & Attribute.Required;
    streetNumber: Attribute.String & Attribute.Required;
    postcode: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 30000;
        max: 31999;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'location.address': LocationAddress;
    }
  }
}
