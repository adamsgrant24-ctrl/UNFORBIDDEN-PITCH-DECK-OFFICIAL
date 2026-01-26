
export interface Character {
  name: string;
  talent: string;
  status: string;
  function: string;
  note: string;
  actionCard: string;
  image: string;
}

export interface RevenueProjection {
  assetClass: string;
  volume: string;
  price: string;
  yield: string;
}

export enum Section {
  HERO = 'hero',
  VISION = 'vision',
  ENSEMBLE = 'ensemble',
  METHODOLOGY = 'methodology',
  TECHNICAL = 'technical',
  REVENUE = 'revenue',
  INVESTOR = 'investor'
}
