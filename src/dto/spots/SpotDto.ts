export type RemoteSpot = {
  id: string;
  name: string;
  status: string;
};

export class SpotDto {
  constructor(public id: string, public name: string, public status: string) {
    this.id = id;
    this.name = name;
    this.status = status;
  }

  spotLabel() {
    return this.name.slice(1);
  }
}

export const buildSpotDto = ({ id, name, status }: RemoteSpot) =>
  new SpotDto(id, name, status);
