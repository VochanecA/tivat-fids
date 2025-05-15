export interface Flight {
  Updateovano: string;
  Datum: string;
  Dan: string;
  TipLeta: 'O' | 'I'; // "O" for departures, "I" for arrivals
  KompanijaNaziv: string;
  Logo: string;
  Kompanija: string;
  KompanijaICAO: string;
  BrojLeta: string;
  CodeShare: string;
  IATA: string;
  Grad: string;
  Planirano: string;
  Predvidjeno: string;
  Aktuelno: string;
  Terminal: string;
  Karusel: string;
  CheckIn: string;
  Gate: string;
  Aerodrom: string;
  Status: string;
  Via: string;
  StatusEN: string;
  StatusMN: string;
}

export type FlightType = 'arrivals' | 'departures';