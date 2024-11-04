export interface IMealForm {
  meal: string;
  description: string;
  calories: number;
}

export interface IMeal {
  id: string;
  meal: string;
  description: string;
  calories: number;
}

export interface IMealAPI {
  [id: string]: IMeal;
}
