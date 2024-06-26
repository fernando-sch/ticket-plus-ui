export type RemoteEvent = {
  id: string;
  name: string;
  organization: string;
  date: string;
  price: number;
  rating: string;
  image_url: string;
  location: string;
};

export class EventDto {
  constructor(
    public id: string,
    public name: string,
    public organization: string,
    public date: string,
    public price: number,
    public rating: string,
    public imageUrl: string,
    public location: string
  ) {
    this.id = id;
    this.name = name;
    this.organization = organization;
    this.date = date;
    this.price = price;
    this.rating = rating;
    this.imageUrl = imageUrl;
    this.location = location;
  }
}

export const buildEventDto = ({
  id,
  name,
  organization,
  date,
  price,
  rating,
  image_url,
  location,
}: RemoteEvent) =>
  new EventDto(
    id,
    name,
    organization,
    date,
    price,
    rating,
    image_url,
    location
  );
