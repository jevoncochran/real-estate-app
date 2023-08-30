import { Session } from "next-auth";

export interface Property {
  _id: string;
  img: string;
  title: string;
  desc: string;
  propertyType: string;
  sqmeters: number;
  beds: number;
  country: string;
  type: string;
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
