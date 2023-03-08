import type { User } from '../redux/models/user';

export interface Review {
  id: string;
  user: User;
  content: string;
  mediaType: string;
  mediaId: number;
  mediaTitle: string;
  mediaPoster: string;
  createdAt: Date;
  updatedAt: Date;
}
