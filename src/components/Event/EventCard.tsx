import Link from "next/link";
import { EventImage } from "./EventImage";

type EventCardProps = {
  id: string;
  name: string;
  date: string;
  imageUrl: string;
  location: string;
};

export const EventCard = ({
  id,
  name,
  date,
  imageUrl,
  location,
}: EventCardProps) => {
  const formatedDate = new Date(date).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Link href={`/event/${id}/spots-layout`}>
      <div className="flex w-[277px] flex-col rounded-2xl bg-secondary">
        <EventImage src={imageUrl} alt={name} />
        <div className="flex flex-col gap-y-2 px-4 py-6">
          <p className="text-sm uppercase text-subtitle">{formatedDate}</p>
          <p className="font-semibold">{name}</p>
          <p className="text-sm font-normal">{location}</p>
        </div>
      </div>
    </Link>
  );
};
