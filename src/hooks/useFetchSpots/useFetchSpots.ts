import { useQuery } from "@tanstack/react-query";
import { SpotsService } from "@/app/services/spots/SpotsService";

export const useFetchSpots = (eventId: string) => {
  const spotsService = new SpotsService();

  return useQuery({
    queryKey: ["fetchSpots"],
    queryFn: () => spotsService.fetchSpots(eventId),
  });
};
