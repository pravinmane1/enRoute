export interface AirportResponse {
  airports: Airport[];
}

export interface Airport {
  code?: string;
  name?: string;
  country?: string;
  city?: string;
  displayName?:string;
}
