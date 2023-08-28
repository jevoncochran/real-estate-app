export interface Property {
  id: number;
  image: string;
  title: string;
  desc: string;
  category: string;
  sqmeters: number;
  beds: number;
  country: string;
  type: string;
}

export enum ResponseType {
  Success = "success",
  Error = "error",
}
