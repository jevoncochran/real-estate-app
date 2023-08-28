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

export { MIN_PRICE, MAX_PRICE, propertyTypes, countries, responseType };
