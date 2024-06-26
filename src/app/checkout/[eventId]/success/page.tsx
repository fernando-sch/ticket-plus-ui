import { EventsService } from "@/app/services/events/EventsService";
import { Title } from "@/components/Title/Title";
import { useGetEvent } from "@/hooks/useGetEvent/useGetEvent";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

type PageRouterProps = {
  params: { eventId: string };
};

export async function getServerSideProps({
  params: { eventId },
}: PageRouterProps) {
  const queryClient = new QueryClient();
  const eventsService = new EventsService();

  await queryClient.prefetchQuery({
    queryKey: ["fetchSpots"],
    queryFn: () => eventsService.getEvent(eventId),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const CheckoutSuccessPage = async ({
  params: { eventId },
}: PageRouterProps) => {
  const { data: event } = useGetEvent(eventId);

  const cookiesStore = cookies();
  const selectedSpots = JSON.parse(cookiesStore.get("spots")?.value ?? "[]");

  return (
    <main className="mt-10 flex flex-col flex-wrap items-center ">
      <Title>Compra realizada com sucesso!</Title>
      <div className="mb-4 flex max-h-[250px] w-full max-w-[478px] flex-col gap-y-6 rounded-2xl bg-secondary p-4">
        <Title>Resumo da compra</Title>
        <p className="font-semibold">
          Evento {event.name}
          <br />
          Local {event.location}
          <br />
          Data{" "}
          {new Date(event.date).toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <p className="font-semibold text-white">
          Lugares escolhidos: {selectedSpots.join(", ")}
        </p>
      </div>
    </main>
  );
};

export default CheckoutSuccessPage;
