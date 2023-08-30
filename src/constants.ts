import { ResponseType } from "@/types";

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

const propertyTypes = [
  "Party villa",
  "Family home",
  "Seaside house",
  "Mountain villa",
  "Penthouse",
];

const countries = [
  "Greece",
  "Norway",
  "India",
  "Italy",
  "Portugal",
  "Bulgaria",
  "Indonesia",
  "Japan",
  "Nigeria",
  "Brazil",
];

const responseType = {
  error: ResponseType.Error,
  success: ResponseType.Success,
};

const CLOUD_NAME = "dqhfx5f07";

const UPLOAD_PRESET = "real-estate-app";

export {
  MIN_PRICE,
  MAX_PRICE,
  propertyTypes,
  countries,
  responseType,
  CLOUD_NAME,
  UPLOAD_PRESET,
};
