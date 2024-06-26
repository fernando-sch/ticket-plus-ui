import { buildEventDto, EventDto, RemoteEvent } from "../events/EventDto";
import { buildSpotDto, RemoteSpot, SpotDto } from "../spots/SpotDto";

type RemoteEventWithSpots = {
  event: RemoteEvent;
  spots: RemoteSpot[];
};

export class EventWithSpotsDto {
  event: EventDto;
  spots: SpotDto[];

  constructor(
    private readonly remoteEvent: RemoteEvent,
    private readonly remoteSpots: RemoteSpot[]
  ) {
    this.event = buildEventDto(this.remoteEvent);
    this.spots = this.remoteSpots.map(buildSpotDto);
  }

  rowLetters(): string[] {
    return this.spots.map((spot) => spot.name[0]);
  }

  spotsGroupedByRow(): { row: string; spots: SpotDto[] }[] {
    return this.rowLetters()
      .filter((row, index) => this.rowLetters().indexOf(row) === index)
      .map((row) => {
        return {
          row,
          spots: [
            ...this.spots
              .filter((spot) => spot.name[0].startsWith(row))
              .sort((a, b) => {
                const aNumber = parseInt(a.name.slice(1));
                const bNumber = parseInt(b.name.slice(1));

                if (aNumber < bNumber) {
                  return -1;
                }

                if (aNumber > bNumber) {
                  return 1;
                }

                return 0;
              }),
          ],
        };
      });
  }
}

export const buildEventWithSpotsDto = ({
  event,
  spots,
}: RemoteEventWithSpots) => new EventWithSpotsDto(event, spots);
