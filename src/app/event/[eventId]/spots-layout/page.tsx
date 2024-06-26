import { dehydrate, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { Title } from "../../../../components/Title/Title";
import { SpotSeat } from "../../../../components/SpotSeat/SpotSeat";
import { TicketKindSelect } from "./TicketKindSelect";
import { EventImage } from "../../../../components/Event/EventImage";
import { useFetchSpots } from "@/hooks/useFetchSpots/useFetchSpots";
import { SpotsService } from "@/app/services/spots/SpotsService";

type PageRouterProps = {
  params: { eventId: string };
};

export async function getServerSideProps({
  params: { eventId },
}: PageRouterProps) {
  const queryClient = new QueryClient();
  const spotsService = new SpotsService(eventId);

  await queryClient.prefetchQuery(spotsService.fetchSportsQuery());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const SpotsLayoutPage = ({ params: { eventId } }: PageRouterProps) => {
  const { data } = useFetchSpots(eventId);
  const cookieStore = cookies();

  const selectedSpots = JSON.parse(cookieStore.get("spots")?.value ?? "[]");

  let totalPrice = selectedSpots.length * data.event.price;
  const ticketKind = cookieStore.get("ticketKind")?.value ?? "full";

  if (ticketKind === "half") {
    totalPrice = totalPrice / 2;
  }

  const formattedTotalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalPrice);

  return (
    <main className="mt-10">
      <div className="flex w-[1176px] max-w-full flex-row flex-wrap justify-center gap-x-8 rounded-2xl bg-secondary p-4 md:justify-normal">
        <EventImage src={data.event.imageUrl} alt={data.event.name} />
        <div className="flex max-w-full flex-col gap-y-6">
          <div className="flex flex-col gap-y-2 ">
            <p className="text-sm font-semibold uppercase text-subtitle">
              {/* SÁB, 11/05/2024 - 20h00 */}
              {new Date(event.date).toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p className="text-2xl font-semibold">{event.name}</p>
            <p className="font-normal">{event.location}</p>
          </div>
          <div className="flex h-[128px] flex-wrap justify-between gap-y-5 gap-x-3">
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold">Organizador</p>
              <p className="text-sm font-normal">{event.organization}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold">Classificação</p>
              <p className="text-sm font-normal">{event.rating}</p>
            </div>
          </div>
        </div>
      </div>
      <Title className="mt-10">Escolha seu lugar</Title>
      <div className="mt-6 flex flex-wrap justify-between">
        <div className=" mb-4 flex w-full max-w-[650px] flex-col gap-y-8 rounded-2xl bg-secondary p-6">
          <div className="rounded-2xl bg-bar py-4 text-center text-[20px] font-bold uppercase text-white">
            Palco
          </div>
          <div className="md:w-full md:justify-normal">
            {data?.spotsGroupedByRow().map(({ row, spots }) => {
              return (
                <div
                  key={row}
                  className="flex flex-row gap-3 items-center mb-3"
                >
                  <div className="w-4">{row}</div>
                  <div className="ml-2 flex flex-row">
                    {spots.map((spot) => {
                      const isSold = spot.status === "sold";
                      const isSelected = selectedSpots.includes(spot.name);

                      return (
                        <SpotSeat
                          key={spot.id}
                          spotId={spot.name}
                          spotLabel={spot.spotLabel()}
                          eventId={data.event.id}
                          selected={isSelected}
                          disabled={isSold}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex w-full flex-row justify-around">
            <div className=" flex flex-row items-center">
              <span className="mr-1 block h-4 w-4 rounded-full bg-[#00A96E]">
                Disponível
              </span>
            </div>
            <div className=" flex flex-row items-center">
              <span className="mr-1 block h-4 w-4 rounded-full bg-[#A6ADBB]">
                Ocupado
              </span>
            </div>
            <div className=" flex flex-row items-center">
              <span className="mr-1 block h-4 w-4  rounded-full bg-[#7480FF]">
                Selecionado
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-[478px] flex-col gap-y-6 rounded-2xl bg-secondary px-4 py-6">
          <h1 className="text-[20px] font-semibold">
            Confira os valores do evento
          </h1>
          <p>
            Inteira: {"R$ 100,00"} <br />
            Meia-entrada: {`R$ 50,00`}
          </p>
          <div className="flex flex-col">
            <TicketKindSelect
              defaultValue={ticketKind as any}
              price={data.event.price}
            />
          </div>
          <div>Total: {formattedTotalPrice}</div>
          {/* TO-DO: implements Checkout Page
          <Link
            href="/checkout"
            className="rounded-lg bg-btn-primary py-4 text-sm font-semibold uppercase text-btn-primary text-center hover:bg-[#fff]"
          >
            Ir para pagamento
          </Link> */}
        </div>
      </div>
    </main>
  );
};

export default SpotsLayoutPage;
