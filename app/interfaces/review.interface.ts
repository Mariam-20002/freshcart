export interface ReviewInterface {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  updatedAt: string;

  user: ReviewUser;
}

export interface ReviewUser {
  _id: string;
  name: string;
}
