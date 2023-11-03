import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Time: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  containsi?: InputMaybe<Scalars['Boolean']['input']>;
  endsWith?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  eqi?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  nei?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentLocationAddress = {
  __typename?: 'ComponentLocationAddress';
  id: Scalars['ID']['output'];
  postcode: Scalars['Int']['output'];
  street: Scalars['String']['output'];
  streetNumber: Scalars['String']['output'];
};

export type ComponentLocationAddressFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentLocationAddressFiltersInput>>>;
  not?: InputMaybe<ComponentLocationAddressFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentLocationAddressFiltersInput>>>;
  postcode?: InputMaybe<IntFilterInput>;
  street?: InputMaybe<StringFilterInput>;
  streetNumber?: InputMaybe<StringFilterInput>;
};

export type ComponentLocationAddressInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  postcode?: InputMaybe<Scalars['Int']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  streetNumber?: InputMaybe<Scalars['String']['input']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  containsi?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  eqi?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  nei?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Event = {
  __typename?: 'Event';
  attendeesCount?: Maybe<Scalars['Int']['output']>;
  attending?: Maybe<Scalars['Boolean']['output']>;
  category?: Maybe<EventCategoryEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  doorsTime?: Maybe<Scalars['Time']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  uid?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  venue?: Maybe<VenueEntityResponse>;
};

export type EventCategory = {
  __typename?: 'EventCategory';
  events?: Maybe<EventRelationResponseCollection>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};


export type EventCategoryEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type EventCategoryEntity = {
  __typename?: 'EventCategoryEntity';
  attributes?: Maybe<EventCategory>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type EventCategoryEntityResponse = {
  __typename?: 'EventCategoryEntityResponse';
  data?: Maybe<EventCategoryEntity>;
};

export type EventCategoryEntityResponseCollection = {
  __typename?: 'EventCategoryEntityResponseCollection';
  data: Array<EventCategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type EventCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventCategoryFiltersInput>>>;
  events?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<EventCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventCategoryFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
};

export type EventEntity = {
  __typename?: 'EventEntity';
  attributes?: Maybe<Event>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type EventEntityResponse = {
  __typename?: 'EventEntityResponse';
  data?: Maybe<EventEntity>;
};

export type EventEntityResponseCollection = {
  __typename?: 'EventEntityResponseCollection';
  data: Array<EventEntity>;
  meta: ResponseCollectionMeta;
};

export type EventFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  category?: InputMaybe<EventCategoryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  creator?: InputMaybe<UsersPermissionsUserFiltersInput>;
  description?: InputMaybe<StringFilterInput>;
  doorsTime?: InputMaybe<TimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<EventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  uid?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  venue?: InputMaybe<VenueFiltersInput>;
};

export type EventInput = {
  category?: InputMaybe<Scalars['ID']['input']>;
  creator?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  doorsTime?: InputMaybe<Scalars['Time']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
  venue?: InputMaybe<Scalars['ID']['input']>;
};

export type EventRelationResponseCollection = {
  __typename?: 'EventRelationResponseCollection';
  data: Array<EventEntity>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains?: InputMaybe<Scalars['Float']['input']>;
  containsi?: InputMaybe<Scalars['Float']['input']>;
  endsWith?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  eqi?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nei?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']['input']>;
  notContainsi?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type GenericMorph = ComponentLocationAddress | Event | EventCategory | I18NLocale | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Venue;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  containsi?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  eqi?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  nei?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notContainsi?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains?: InputMaybe<Scalars['Int']['input']>;
  containsi?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  eqi?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nei?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']['input']>;
  notContainsi?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains?: InputMaybe<Scalars['JSON']['input']>;
  containsi?: InputMaybe<Scalars['JSON']['input']>;
  endsWith?: InputMaybe<Scalars['JSON']['input']>;
  eq?: InputMaybe<Scalars['JSON']['input']>;
  eqi?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  ne?: InputMaybe<Scalars['JSON']['input']>;
  nei?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']['input']>;
  notContainsi?: InputMaybe<Scalars['JSON']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createEvent?: Maybe<EventEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createVenue?: Maybe<VenueEntityResponse>;
  deleteEvent?: Maybe<EventEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteVenue?: Maybe<VenueEntityResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateEvent?: Maybe<EventEntityResponse>;
  updateEventAttending?: Maybe<Scalars['Boolean']['output']>;
  updateFileInfo: UploadFileEntityResponse;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateVenue?: Maybe<VenueEntityResponse>;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateEventArgs = {
  data: EventInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationCreateVenueArgs = {
  data: VenueInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVenueArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  files: Array<InputMaybe<Scalars['Upload']['input']>>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUpdateEventArgs = {
  data: EventInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateEventAttendingArgs = {
  attending: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateVenueArgs = {
  data: VenueInput;
  id: Scalars['ID']['input'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  event?: Maybe<EventEntityResponse>;
  eventCategories?: Maybe<EventCategoryEntityResponseCollection>;
  eventCategory?: Maybe<EventCategoryEntityResponse>;
  events?: Maybe<EventEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  venue?: Maybe<VenueEntityResponse>;
  venues?: Maybe<VenueEntityResponseCollection>;
};


export type QueryEventArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryEventCategoriesArgs = {
  filters?: InputMaybe<EventCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryEventCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryVenueArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryVenuesArgs = {
  filters?: InputMaybe<VenueFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  containsi?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  eqi?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nei?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notContainsi?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  contains?: InputMaybe<Scalars['Time']['input']>;
  containsi?: InputMaybe<Scalars['Time']['input']>;
  endsWith?: InputMaybe<Scalars['Time']['input']>;
  eq?: InputMaybe<Scalars['Time']['input']>;
  eqi?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  ne?: InputMaybe<Scalars['Time']['input']>;
  nei?: InputMaybe<Scalars['Time']['input']>;
  not?: InputMaybe<TimeFilterInput>;
  notContains?: InputMaybe<Scalars['Time']['input']>;
  notContainsi?: InputMaybe<Scalars['Time']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  startsWith?: InputMaybe<Scalars['Time']['input']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  ext?: Maybe<Scalars['String']['output']>;
  formats?: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata?: Maybe<Scalars['JSON']['output']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String']['output'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String']['output'];
  pathId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  events?: Maybe<EventEntityResponseCollection>;
  id: Scalars['ID']['output'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};


export type UsersPermissionsMeEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  avatar?: Maybe<UploadFileEntityResponse>;
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdEvents?: Maybe<EventRelationResponseCollection>;
  createdVenues?: Maybe<VenueRelationResponseCollection>;
  email: Scalars['String']['output'];
  events?: Maybe<EventRelationResponseCollection>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  uid?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};


export type UsersPermissionsUserCreatedEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsUserCreatedVenuesArgs = {
  filters?: InputMaybe<VenueFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsUserEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  createdEvents?: InputMaybe<EventFiltersInput>;
  createdVenues?: InputMaybe<VenueFiltersInput>;
  email?: InputMaybe<StringFilterInput>;
  events?: InputMaybe<EventFiltersInput>;
  firstName?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lastName?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  uid?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  avatar?: InputMaybe<Scalars['ID']['input']>;
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  confirmationToken?: InputMaybe<Scalars['String']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  createdEvents?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  createdVenues?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  email?: InputMaybe<Scalars['String']['input']>;
  events?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type Venue = {
  __typename?: 'Venue';
  address: ComponentLocationAddress;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  events?: Maybe<EventRelationResponseCollection>;
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  uid?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};


export type VenueEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type VenueEntity = {
  __typename?: 'VenueEntity';
  attributes?: Maybe<Venue>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type VenueEntityResponse = {
  __typename?: 'VenueEntityResponse';
  data?: Maybe<VenueEntity>;
};

export type VenueEntityResponseCollection = {
  __typename?: 'VenueEntityResponseCollection';
  data: Array<VenueEntity>;
  meta: ResponseCollectionMeta;
};

export type VenueFiltersInput = {
  address?: InputMaybe<ComponentLocationAddressFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<VenueFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  creator?: InputMaybe<UsersPermissionsUserFiltersInput>;
  description?: InputMaybe<StringFilterInput>;
  events?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<VenueFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<VenueFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  uid?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  website?: InputMaybe<StringFilterInput>;
};

export type VenueInput = {
  address?: InputMaybe<ComponentLocationAddressInput>;
  creator?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  events?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type VenueRelationResponseCollection = {
  __typename?: 'VenueRelationResponseCollection';
  data: Array<VenueEntity>;
};

export type CreateEventMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  categoryId: Scalars['ID']['input'];
  venueId: Scalars['ID']['input'];
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', title: string, description: string, startDate: any, endDate?: any | null, doorsTime?: any | null, attending?: boolean | null, category?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', name: string, slug: string } | null } | null } | null, venue?: { __typename?: 'VenueEntityResponse', data?: { __typename?: 'VenueEntity', id?: string | null, attributes?: { __typename?: 'Venue', name: string, description?: string | null, website?: string | null, address: { __typename?: 'ComponentLocationAddress', street: string, streetNumber: string, postcode: number } } | null } | null } | null } | null } | null } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me?: { __typename?: 'UsersPermissionsMe', id: string, email?: string | null, username: string } | null };

export type CurrentUserCalendarQueryVariables = Exact<{
  from?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  startDate: Scalars['DateTime']['input'];
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
  venues?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
}>;


export type CurrentUserCalendarQuery = { __typename?: 'Query', me?: { __typename?: 'UsersPermissionsMe', id: string, events?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', title: string, description: string, startDate: any, endDate?: any | null, doorsTime?: any | null, venue?: { __typename?: 'VenueEntityResponse', data?: { __typename?: 'VenueEntity', id?: string | null, attributes?: { __typename?: 'Venue', name: string } | null } | null } | null, category?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', name: string, slug: string } | null } | null } | null } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null } | null };

export type EventQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EventQuery = { __typename?: 'Query', event?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', title: string, description: string, startDate: any, endDate?: any | null, doorsTime?: any | null, venue?: { __typename?: 'VenueEntityResponse', data?: { __typename?: 'VenueEntity', id?: string | null, attributes?: { __typename?: 'Venue', name: string, description?: string | null, address: { __typename?: 'ComponentLocationAddress', id: string, street: string, streetNumber: string, postcode: number } } | null } | null } | null, category?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', name: string, slug: string } | null } | null } | null } | null } | null } | null };

export type EventAttendingStatusQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EventAttendingStatusQuery = { __typename?: 'Query', event?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', attending?: boolean | null } | null } | null } | null };

export type EventCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type EventCategoriesQuery = { __typename?: 'Query', eventCategories?: { __typename?: 'EventCategoryEntityResponseCollection', data: Array<{ __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', name: string, slug: string } | null }> } | null };

export type EventPathsQueryVariables = Exact<{
  from?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  startDate: Scalars['DateTime']['input'];
}>;


export type EventPathsQuery = { __typename?: 'Query', events?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', title: string } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null } } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null } } };

export type SearchVenueQueryVariables = Exact<{
  term: Scalars['String']['input'];
}>;


export type SearchVenueQuery = { __typename?: 'Query', venues?: { __typename?: 'VenueEntityResponseCollection', data: Array<{ __typename?: 'VenueEntity', id?: string | null, attributes?: { __typename?: 'Venue', name: string } | null }> } | null };

export type UpcomingEventsQueryVariables = Exact<{
  from?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  startDate: Scalars['DateTime']['input'];
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
  venues?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
}>;


export type UpcomingEventsQuery = { __typename?: 'Query', events?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', title: string, description: string, startDate: any, endDate?: any | null, doorsTime?: any | null, venue?: { __typename?: 'VenueEntityResponse', data?: { __typename?: 'VenueEntity', id?: string | null, attributes?: { __typename?: 'Venue', name: string } | null } | null } | null, category?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', name: string, slug: string } | null } | null } | null } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null };

export type UpdateEventAttendingMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  attending: Scalars['Boolean']['input'];
}>;


export type UpdateEventAttendingMutation = { __typename?: 'Mutation', updateEventAttending?: boolean | null };

export type VenueQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type VenueQuery = { __typename?: 'Query', venue?: { __typename?: 'VenueEntityResponse', data?: { __typename?: 'VenueEntity', id?: string | null, attributes?: { __typename?: 'Venue', name: string, description?: string | null, website?: string | null, address: { __typename?: 'ComponentLocationAddress', id: string, street: string, streetNumber: string, postcode: number } } | null } | null } | null };

export type VenuePathsQueryVariables = Exact<{
  from?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type VenuePathsQuery = { __typename?: 'Query', venues?: { __typename?: 'VenueEntityResponseCollection', data: Array<{ __typename?: 'VenueEntity', id?: string | null, attributes?: { __typename?: 'Venue', name: string } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null };

export type VenuesQueryVariables = Exact<{
  from?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
}>;


export type VenuesQuery = { __typename?: 'Query', venues?: { __typename?: 'VenueEntityResponseCollection', data: Array<{ __typename?: 'VenueEntity', id?: string | null, attributes?: { __typename?: 'Venue', name: string, description?: string | null, website?: string | null, address: { __typename?: 'ComponentLocationAddress', id: string, street: string, streetNumber: string, postcode: number } } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null };


export const CreateEventDocument = gql`
    mutation CreateEvent($title: String!, $description: String!, $startDate: DateTime!, $endDate: DateTime, $categoryId: ID!, $venueId: ID!) {
  createEvent(
    data: {title: $title, description: $description, startDate: $startDate, endDate: $endDate, category: $categoryId, venue: $venueId}
  ) {
    data {
      id
      attributes {
        title
        description
        startDate
        endDate
        doorsTime
        attending
        category {
          data {
            id
            attributes {
              name
              slug
            }
          }
        }
        venue {
          data {
            id
            attributes {
              name
              description
              website
              address {
                street
                streetNumber
                postcode
              }
            }
          }
        }
      }
    }
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      categoryId: // value for 'categoryId'
 *      venueId: // value for 'venueId'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  me {
    id
    email
    username
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export function useCurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserSuspenseQueryHookResult = ReturnType<typeof useCurrentUserSuspenseQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const CurrentUserCalendarDocument = gql`
    query CurrentUserCalendar($from: Int = 0, $limit: Int = 10, $startDate: DateTime!, $categories: [ID], $venues: [ID]) {
  me {
    id
    events(
      filters: {startDate: {gte: $startDate}, category: {id: {in: $categories}}, venue: {id: {in: $venues}}}
      pagination: {start: $from, limit: $limit}
      sort: "startDate:asc"
    ) {
      data {
        id
        attributes {
          title
          description
          startDate
          endDate
          doorsTime
          venue {
            data {
              id
              attributes {
                name
              }
            }
          }
          category {
            data {
              id
              attributes {
                name
                slug
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
}
    `;

/**
 * __useCurrentUserCalendarQuery__
 *
 * To run a query within a React component, call `useCurrentUserCalendarQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserCalendarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserCalendarQuery({
 *   variables: {
 *      from: // value for 'from'
 *      limit: // value for 'limit'
 *      startDate: // value for 'startDate'
 *      categories: // value for 'categories'
 *      venues: // value for 'venues'
 *   },
 * });
 */
export function useCurrentUserCalendarQuery(baseOptions: Apollo.QueryHookOptions<CurrentUserCalendarQuery, CurrentUserCalendarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserCalendarQuery, CurrentUserCalendarQueryVariables>(CurrentUserCalendarDocument, options);
      }
export function useCurrentUserCalendarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserCalendarQuery, CurrentUserCalendarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserCalendarQuery, CurrentUserCalendarQueryVariables>(CurrentUserCalendarDocument, options);
        }
export function useCurrentUserCalendarSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CurrentUserCalendarQuery, CurrentUserCalendarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentUserCalendarQuery, CurrentUserCalendarQueryVariables>(CurrentUserCalendarDocument, options);
        }
export type CurrentUserCalendarQueryHookResult = ReturnType<typeof useCurrentUserCalendarQuery>;
export type CurrentUserCalendarLazyQueryHookResult = ReturnType<typeof useCurrentUserCalendarLazyQuery>;
export type CurrentUserCalendarSuspenseQueryHookResult = ReturnType<typeof useCurrentUserCalendarSuspenseQuery>;
export type CurrentUserCalendarQueryResult = Apollo.QueryResult<CurrentUserCalendarQuery, CurrentUserCalendarQueryVariables>;
export const EventDocument = gql`
    query Event($id: ID!) {
  event(id: $id) {
    data {
      id
      attributes {
        title
        description
        startDate
        endDate
        doorsTime
        venue {
          data {
            id
            attributes {
              name
              description
              address {
                id
                street
                streetNumber
                postcode
              }
            }
          }
        }
        category {
          data {
            id
            attributes {
              name
              slug
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventQuery(baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, options);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export function useEventSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventSuspenseQueryHookResult = ReturnType<typeof useEventSuspenseQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const EventAttendingStatusDocument = gql`
    query EventAttendingStatus($id: ID!) {
  event(id: $id) {
    data {
      id
      attributes {
        attending
      }
    }
  }
}
    `;

/**
 * __useEventAttendingStatusQuery__
 *
 * To run a query within a React component, call `useEventAttendingStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventAttendingStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventAttendingStatusQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventAttendingStatusQuery(baseOptions: Apollo.QueryHookOptions<EventAttendingStatusQuery, EventAttendingStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventAttendingStatusQuery, EventAttendingStatusQueryVariables>(EventAttendingStatusDocument, options);
      }
export function useEventAttendingStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventAttendingStatusQuery, EventAttendingStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventAttendingStatusQuery, EventAttendingStatusQueryVariables>(EventAttendingStatusDocument, options);
        }
export function useEventAttendingStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventAttendingStatusQuery, EventAttendingStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventAttendingStatusQuery, EventAttendingStatusQueryVariables>(EventAttendingStatusDocument, options);
        }
export type EventAttendingStatusQueryHookResult = ReturnType<typeof useEventAttendingStatusQuery>;
export type EventAttendingStatusLazyQueryHookResult = ReturnType<typeof useEventAttendingStatusLazyQuery>;
export type EventAttendingStatusSuspenseQueryHookResult = ReturnType<typeof useEventAttendingStatusSuspenseQuery>;
export type EventAttendingStatusQueryResult = Apollo.QueryResult<EventAttendingStatusQuery, EventAttendingStatusQueryVariables>;
export const EventCategoriesDocument = gql`
    query EventCategories {
  eventCategories {
    data {
      id
      attributes {
        name
        slug
      }
    }
  }
}
    `;

/**
 * __useEventCategoriesQuery__
 *
 * To run a query within a React component, call `useEventCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<EventCategoriesQuery, EventCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventCategoriesQuery, EventCategoriesQueryVariables>(EventCategoriesDocument, options);
      }
export function useEventCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventCategoriesQuery, EventCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventCategoriesQuery, EventCategoriesQueryVariables>(EventCategoriesDocument, options);
        }
export function useEventCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventCategoriesQuery, EventCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventCategoriesQuery, EventCategoriesQueryVariables>(EventCategoriesDocument, options);
        }
export type EventCategoriesQueryHookResult = ReturnType<typeof useEventCategoriesQuery>;
export type EventCategoriesLazyQueryHookResult = ReturnType<typeof useEventCategoriesLazyQuery>;
export type EventCategoriesSuspenseQueryHookResult = ReturnType<typeof useEventCategoriesSuspenseQuery>;
export type EventCategoriesQueryResult = Apollo.QueryResult<EventCategoriesQuery, EventCategoriesQueryVariables>;
export const EventPathsDocument = gql`
    query EventPaths($from: Int = 0, $limit: Int = 10, $startDate: DateTime!) {
  events(
    filters: {startDate: {gte: $startDate}}
    pagination: {start: $from, limit: $limit}
    sort: "startDate:asc"
  ) {
    data {
      id
      attributes {
        title
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
    `;

/**
 * __useEventPathsQuery__
 *
 * To run a query within a React component, call `useEventPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventPathsQuery({
 *   variables: {
 *      from: // value for 'from'
 *      limit: // value for 'limit'
 *      startDate: // value for 'startDate'
 *   },
 * });
 */
export function useEventPathsQuery(baseOptions: Apollo.QueryHookOptions<EventPathsQuery, EventPathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventPathsQuery, EventPathsQueryVariables>(EventPathsDocument, options);
      }
export function useEventPathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventPathsQuery, EventPathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventPathsQuery, EventPathsQueryVariables>(EventPathsDocument, options);
        }
export function useEventPathsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventPathsQuery, EventPathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventPathsQuery, EventPathsQueryVariables>(EventPathsDocument, options);
        }
export type EventPathsQueryHookResult = ReturnType<typeof useEventPathsQuery>;
export type EventPathsLazyQueryHookResult = ReturnType<typeof useEventPathsLazyQuery>;
export type EventPathsSuspenseQueryHookResult = ReturnType<typeof useEventPathsSuspenseQuery>;
export type EventPathsQueryResult = Apollo.QueryResult<EventPathsQuery, EventPathsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {identifier: $email, password: $password}) {
    jwt
    user {
      id
      username
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(input: {username: $username, email: $email, password: $password}) {
    jwt
    user {
      id
      username
      email
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SearchVenueDocument = gql`
    query SearchVenue($term: String!) {
  venues(filters: {name: {containsi: $term}}) {
    data {
      id
      attributes {
        name
      }
    }
  }
}
    `;

/**
 * __useSearchVenueQuery__
 *
 * To run a query within a React component, call `useSearchVenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchVenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchVenueQuery({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useSearchVenueQuery(baseOptions: Apollo.QueryHookOptions<SearchVenueQuery, SearchVenueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchVenueQuery, SearchVenueQueryVariables>(SearchVenueDocument, options);
      }
export function useSearchVenueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchVenueQuery, SearchVenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchVenueQuery, SearchVenueQueryVariables>(SearchVenueDocument, options);
        }
export function useSearchVenueSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchVenueQuery, SearchVenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchVenueQuery, SearchVenueQueryVariables>(SearchVenueDocument, options);
        }
export type SearchVenueQueryHookResult = ReturnType<typeof useSearchVenueQuery>;
export type SearchVenueLazyQueryHookResult = ReturnType<typeof useSearchVenueLazyQuery>;
export type SearchVenueSuspenseQueryHookResult = ReturnType<typeof useSearchVenueSuspenseQuery>;
export type SearchVenueQueryResult = Apollo.QueryResult<SearchVenueQuery, SearchVenueQueryVariables>;
export const UpcomingEventsDocument = gql`
    query UpcomingEvents($from: Int = 0, $limit: Int = 10, $startDate: DateTime!, $categories: [ID], $venues: [ID]) {
  events(
    filters: {startDate: {gte: $startDate}, category: {id: {in: $categories}}, venue: {id: {in: $venues}}}
    pagination: {start: $from, limit: $limit}
    sort: "startDate:asc"
  ) {
    data {
      id
      attributes {
        title
        description
        startDate
        endDate
        doorsTime
        venue {
          data {
            id
            attributes {
              name
            }
          }
        }
        category {
          data {
            id
            attributes {
              name
              slug
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
    `;

/**
 * __useUpcomingEventsQuery__
 *
 * To run a query within a React component, call `useUpcomingEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpcomingEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpcomingEventsQuery({
 *   variables: {
 *      from: // value for 'from'
 *      limit: // value for 'limit'
 *      startDate: // value for 'startDate'
 *      categories: // value for 'categories'
 *      venues: // value for 'venues'
 *   },
 * });
 */
export function useUpcomingEventsQuery(baseOptions: Apollo.QueryHookOptions<UpcomingEventsQuery, UpcomingEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UpcomingEventsQuery, UpcomingEventsQueryVariables>(UpcomingEventsDocument, options);
      }
export function useUpcomingEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpcomingEventsQuery, UpcomingEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UpcomingEventsQuery, UpcomingEventsQueryVariables>(UpcomingEventsDocument, options);
        }
export function useUpcomingEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UpcomingEventsQuery, UpcomingEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UpcomingEventsQuery, UpcomingEventsQueryVariables>(UpcomingEventsDocument, options);
        }
export type UpcomingEventsQueryHookResult = ReturnType<typeof useUpcomingEventsQuery>;
export type UpcomingEventsLazyQueryHookResult = ReturnType<typeof useUpcomingEventsLazyQuery>;
export type UpcomingEventsSuspenseQueryHookResult = ReturnType<typeof useUpcomingEventsSuspenseQuery>;
export type UpcomingEventsQueryResult = Apollo.QueryResult<UpcomingEventsQuery, UpcomingEventsQueryVariables>;
export const UpdateEventAttendingDocument = gql`
    mutation UpdateEventAttending($eventId: ID!, $attending: Boolean!) {
  updateEventAttending(id: $eventId, attending: $attending)
}
    `;
export type UpdateEventAttendingMutationFn = Apollo.MutationFunction<UpdateEventAttendingMutation, UpdateEventAttendingMutationVariables>;

/**
 * __useUpdateEventAttendingMutation__
 *
 * To run a mutation, you first call `useUpdateEventAttendingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventAttendingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventAttendingMutation, { data, loading, error }] = useUpdateEventAttendingMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      attending: // value for 'attending'
 *   },
 * });
 */
export function useUpdateEventAttendingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventAttendingMutation, UpdateEventAttendingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventAttendingMutation, UpdateEventAttendingMutationVariables>(UpdateEventAttendingDocument, options);
      }
export type UpdateEventAttendingMutationHookResult = ReturnType<typeof useUpdateEventAttendingMutation>;
export type UpdateEventAttendingMutationResult = Apollo.MutationResult<UpdateEventAttendingMutation>;
export type UpdateEventAttendingMutationOptions = Apollo.BaseMutationOptions<UpdateEventAttendingMutation, UpdateEventAttendingMutationVariables>;
export const VenueDocument = gql`
    query Venue($id: ID!) {
  venue(id: $id) {
    data {
      id
      attributes {
        name
        description
        website
        address {
          id
          street
          streetNumber
          postcode
        }
      }
    }
  }
}
    `;

/**
 * __useVenueQuery__
 *
 * To run a query within a React component, call `useVenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenueQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVenueQuery(baseOptions: Apollo.QueryHookOptions<VenueQuery, VenueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenueQuery, VenueQueryVariables>(VenueDocument, options);
      }
export function useVenueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenueQuery, VenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenueQuery, VenueQueryVariables>(VenueDocument, options);
        }
export function useVenueSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VenueQuery, VenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VenueQuery, VenueQueryVariables>(VenueDocument, options);
        }
export type VenueQueryHookResult = ReturnType<typeof useVenueQuery>;
export type VenueLazyQueryHookResult = ReturnType<typeof useVenueLazyQuery>;
export type VenueSuspenseQueryHookResult = ReturnType<typeof useVenueSuspenseQuery>;
export type VenueQueryResult = Apollo.QueryResult<VenueQuery, VenueQueryVariables>;
export const VenuePathsDocument = gql`
    query VenuePaths($from: Int = 0, $limit: Int = 100) {
  venues(pagination: {start: $from, limit: $limit}) {
    data {
      id
      attributes {
        name
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
    `;

/**
 * __useVenuePathsQuery__
 *
 * To run a query within a React component, call `useVenuePathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenuePathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenuePathsQuery({
 *   variables: {
 *      from: // value for 'from'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useVenuePathsQuery(baseOptions?: Apollo.QueryHookOptions<VenuePathsQuery, VenuePathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenuePathsQuery, VenuePathsQueryVariables>(VenuePathsDocument, options);
      }
export function useVenuePathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenuePathsQuery, VenuePathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenuePathsQuery, VenuePathsQueryVariables>(VenuePathsDocument, options);
        }
export function useVenuePathsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VenuePathsQuery, VenuePathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VenuePathsQuery, VenuePathsQueryVariables>(VenuePathsDocument, options);
        }
export type VenuePathsQueryHookResult = ReturnType<typeof useVenuePathsQuery>;
export type VenuePathsLazyQueryHookResult = ReturnType<typeof useVenuePathsLazyQuery>;
export type VenuePathsSuspenseQueryHookResult = ReturnType<typeof useVenuePathsSuspenseQuery>;
export type VenuePathsQueryResult = Apollo.QueryResult<VenuePathsQuery, VenuePathsQueryVariables>;
export const VenuesDocument = gql`
    query Venues($from: Int = 0, $limit: Int = 20, $ids: [ID]) {
  venues(filters: {id: {or: $ids}}, pagination: {start: $from, limit: $limit}) {
    data {
      id
      attributes {
        name
        description
        website
        address {
          id
          street
          streetNumber
          postcode
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
    `;

/**
 * __useVenuesQuery__
 *
 * To run a query within a React component, call `useVenuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenuesQuery({
 *   variables: {
 *      from: // value for 'from'
 *      limit: // value for 'limit'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useVenuesQuery(baseOptions?: Apollo.QueryHookOptions<VenuesQuery, VenuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenuesQuery, VenuesQueryVariables>(VenuesDocument, options);
      }
export function useVenuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenuesQuery, VenuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenuesQuery, VenuesQueryVariables>(VenuesDocument, options);
        }
export function useVenuesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VenuesQuery, VenuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VenuesQuery, VenuesQueryVariables>(VenuesDocument, options);
        }
export type VenuesQueryHookResult = ReturnType<typeof useVenuesQuery>;
export type VenuesLazyQueryHookResult = ReturnType<typeof useVenuesLazyQuery>;
export type VenuesSuspenseQueryHookResult = ReturnType<typeof useVenuesSuspenseQuery>;
export type VenuesQueryResult = Apollo.QueryResult<VenuesQuery, VenuesQueryVariables>;