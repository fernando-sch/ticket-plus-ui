"use client";

import { useFetchEvents } from "@/hooks/useFetchEvents/useFetchEvents";
import { useQuery } from "@tanstack/react-query";
import { EventCard } from "./EventCard";

export const Events = () => {
  const { data: events } = useQuery(useFetchEvents());

  return (
    <div className="mt-8 sm:grid sm:grid-cols-auto-fit-cards flex flex-wrap justify-center gap-x-2 gap-y-4">
      {events?.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
