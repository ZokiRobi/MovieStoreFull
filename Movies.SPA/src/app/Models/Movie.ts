import { Photo } from "./Photo";

export class Movie {
  id: number;
  name: string;
  genre: string;
  yearOfRelease: number;
  rating: number;
  photoUrl: string;
  photos:Photo[];
  price:number;
  inCart:boolean;
}
