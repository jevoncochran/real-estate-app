import { Session } from "next-auth";

export interface Property {
  _id: string;
  img: string;
  title: string;
  desc: string;
  propertyType: string;
  price: number;
  sqmeters: number;
  beds: number;
  country: string;
  type: string;
}

export interface CurrentUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  accessToken?: string;
}

export enum ResponseType {
  Success = "success",
  Error = "error",
}

export interface ExtendedSession extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    _id: string;
    accessToken: string;
  };
}

export type Photo = File | null | undefined;
