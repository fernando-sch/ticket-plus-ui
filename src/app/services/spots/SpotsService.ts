import { AxiosInstance } from "axios";
import { axiosInstance } from "@/config/AxiosInstance";
import {
  EventWithSpotsDto,
  buildEventWithSpotsDto,
} from "@/dto/event-with-spots/EventWithSpotsDto";

export class SpotsService {
  private axiosInstance: AxiosInstance = axiosInstance;

  async fetchSpots(eventId: string): Promise<EventWithSpotsDto> {
    return await this.axiosInstance
      .get(`/events/${eventId}/spots`)
      .then((response) => buildEventWithSpotsDto(response.data));
  }
}
