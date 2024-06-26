import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { useGetEvent } from "@/hooks/useGetEvent/useGetEvent";

type TotalPriceProps = {
  eventId: string;
  spotsQuantity: number;
  payHalf: boolean;
};

export const CheckoutResume = ({
  eventId,
  spotsQuantity,
  payHalf,
}: TotalPriceProps) => {
  const { data: event } = useGetEvent(eventId);

  if (!event) {
    return <ErrorMessage error="Something went wrong, try again later." />;
  }

  let totalPrice = spotsQuantity * event.price;

  if (payHalf) {
    totalPrice = totalPrice / 2;
  }

  const formattedTotalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalPrice);

  return (
    <>
      <p className="font-semibold">
        {event.name}
        <br />
        {event.location}
        <br />
        {new Date(event.date).toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>
      <p className="font-semibold text-white">{formattedTotalPrice}</p>
    </>
  );
};
