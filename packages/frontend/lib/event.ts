import { Venue } from './venue';

export interface EventCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  doorsTime?: string;
  category: EventCategory;
  venue: Venue;
}

// TODO: Fix type
// export const mapEventQueryResult: <
//   E extends {
//     [key: string]: any;
//     id?: string | null;
//     attributes?: {
//       [key: string]: any;
//       category?: {
//         [key: string]: any;
//         data?: {
//           [key: string]: any;
//           id?: string | null;
//           attributes?: { [key: string]: any } | null;
//         } | null;
//       } | null;
//       venue?: {
//         [key: string]: any;
//         data?: {
//           [key: string]: any;
//           id?: string | null;
//           attributes?: { [key: string]: any } | null;
//         } | null;
//       } | null;
//     } | null;
//   },
//   M extends {
//     id: string;
//     [key: string]: any;
//     category?: {
//       id: string;
//       [key: string]: any;
//     };
//     venue?: {
//       id: string;
//       [key: string]: any;
//     };
//   }
// >(
//   data: E
// ) => M = (data) => {
//   const category = data.attributes?.category?.data?.attributes
//     ? {
//         id: data.attributes.category.data.id as string,
//         ...data.attributes.category.data.attributes,
//       }
//     : undefined;
//   const venue = data.attributes?.venue?.data?.attributes
//     ? {
//         id: data.attributes.venue.data.id as string,
//         ...data.attributes.venue.data.attributes,
//       }
//     : undefined;

//   return {
//     id: data.id as string,
//     ...data.attributes,
//     category,
//     venue,
//   };
// };

// TODO: Fix type
export const mapEventQueryResult: <E, M>(data: any) => any = (data) => {
  const category = data.attributes?.category?.data?.attributes
    ? {
        id: data.attributes.category.data.id as string,
        ...data.attributes.category.data.attributes,
      }
    : undefined;
  const venue = data.attributes?.venue?.data?.attributes
    ? {
        id: data.attributes.venue.data.id as string,
        ...data.attributes.venue.data.attributes,
      }
    : undefined;

  return {
    id: data.id as string,
    ...data.attributes,
    category,
    venue,
  };
};
