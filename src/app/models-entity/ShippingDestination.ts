import { Country } from "./Country";

export class ShippingDestination {
  shippingDestinationId: number;
  province: string;
  city: string;
  country: Country;
  address: string;
  zip: number;
  name: string;
  telephone: number;
  attention: string;
  selected: boolean;
}
