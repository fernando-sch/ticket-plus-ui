import { useQuery } from "@tanstack/react-query";
import { SpotsService } from "@/app/services/spots/SpotsService";

export const useFetchSpots = (eventId: string) => {
  const spotsService = new SpotsService(eventId);

  return useQuery(spotsService.fetchSportsQuery());
};
