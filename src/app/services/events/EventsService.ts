import { AxiosInstance } from "axios";
import { axiosInstance } from "@/config/AxiosInstance";
import { EventDto, buildEventDto } from "@/dto/events/EventDto";

export class EventsService {
  private axiosInstance: AxiosInstance = axiosInstance;

  async getEvent(eventId: string): Promise<EventDto> {
    return await this.axiosInstance
      .get(`/events/${eventId}`)
      .then((response) => buildEventDto(response.data));
  }
}
