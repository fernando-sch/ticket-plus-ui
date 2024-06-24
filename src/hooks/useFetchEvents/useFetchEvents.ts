import { axiosInstance } from "@/config/AxiosInstance";
import { EventDto, buildEventDto } from "@/dto/events/EventDto";
import { useQuery } from "@tanstack/react-query";

export const useFetchEvents = () => {
  const fetchTasks = async () => {
    return await axiosInstance
      .get("/events")
      .then((response) => response.data.events.map(buildEventDto));
  };

  return useQuery<EventDto[]>({
    queryKey: ["fetchEvents"],
    queryFn: fetchTasks,
  });
};
