import { axiosInstance } from "@/config/AxiosInstance";
import { EventDto, buildEventDto } from "@/dto/events/EventDto";

export const useFetchEvents = () => {
  const fetchTasks = async (): Promise<EventDto[]> => {
    return await axiosInstance
      .get("/events")
      .then((response) => response.data.events.map(buildEventDto));
  };

  return { queryKey: ["fetchEvents"], queryFn: fetchTasks };
};
