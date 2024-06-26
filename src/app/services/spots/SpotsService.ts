import { AxiosInstance } from "axios";
import { axiosInstance } from "@/config/AxiosInstance";
import {
  EventWithSpotsDto,
  buildEventWithSpotsDto,
} from "@/dto/event-with-spots/EventWithSpotsDto";

export class SpotsService {
  private axiosInstance: AxiosInstance = axiosInstance;

  constructor(private eventId: string) {
    this.eventId = eventId;
  }

  private async fetchSpots(): Promise<EventWithSpotsDto> {
    return await this.axiosInstance
      .get(`/events/${this.eventId}/spots`)
      .then((response) => buildEventWithSpotsDto(response.data));
  }

  fetchSportsQuery() {
    return { queryKey: ["fetchSpots"], queryFn: this.fetchSpots };
  }
}
