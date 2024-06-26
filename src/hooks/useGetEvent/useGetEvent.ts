import { EventsService } from "@/app/services/events/EventsService";
import { useQuery } from "@tanstack/react-query";

export const useGetEvent = (eventId: string) => {
  const eventsService = new EventsService();

  return useQuery({
    queryKey: ["getEvent", eventId],
    queryFn: () => eventsService.getEvent(eventId),
  });
};
