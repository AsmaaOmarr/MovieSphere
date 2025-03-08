export interface Feature {
  text: string;
  valid: boolean;
}

export interface Plan {
  title: string;
  price: string;
  features: Feature[];
  highlighted: boolean;
}