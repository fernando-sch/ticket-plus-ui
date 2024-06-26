import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";
import { Title } from "../../components/Title/Title";
import { CheckoutResume } from "./CheckoutResume";
import { EventsService } from "../services/events/EventsService";

const CheckoutPage = async () => {
  const queryClient = new QueryClient();
  const eventsService = new EventsService();

  const cookiesStore = cookies();
  const eventId = cookiesStore.get("eventId")?.value;

  if (!eventId) {
    return redirect("/");
  }

  await queryClient.prefetchQuery({
    queryKey: ["getEvent", eventId],
    queryFn: () => eventsService.getEvent(eventId),
  });

  const spotsQuantity = JSON.parse(
    cookiesStore.get("spots")?.value ?? "[]"
  ).length;

  const payHalf = cookiesStore.get("ticketKind")?.value === "half";

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="mt-10 flex flex-wrap justify-center md:justify-between">
        <div className="mb-4 flex max-h-[250px] w-full max-w-[478px] flex-col gap-y-6 rounded-2xl bg-secondary p-4">
          <Title>Resumo da compra</Title>
          <CheckoutResume
            eventId={eventId}
            spotsQuantity={spotsQuantity}
            payHalf={payHalf}
          />
        </div>
        <div className="w-full max-w-[650px] rounded-2xl bg-secondary p-4">
          <Title>Informações de pagamento</Title>
          <CheckoutForm className="mt-6 flex flex-col gap-y-3">
            <div className="flex flex-col">
              <label htmlFor="titular">E-mail</label>
              <input
                type="email"
                name="email"
                className="mt-2 border-solid rounded p-2 h-10 bg-input"
                defaultValue={"test@test.com"}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="titular">Nome no cartão</label>
              <input
                type="text"
                name="card_name"
                className="mt-2 border-solid rounded p-2 h-10 bg-input"
                defaultValue={"Teste Teste"}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="cc">Numero do cartão</label>
              <input
                type="card_number"
                name="cc"
                className="mt-2 border-solid rounded p-2 h-10 bg-input"
                defaultValue={"4111111111111111"}
              />
            </div>
            <div className="flex flex-wrap sm:justify-between">
              <div className="flex w-full flex-col md:w-auto">
                <label htmlFor="expire">Vencimento</label>
                <input
                  type="text"
                  name="expire_date"
                  className="mt-2 sm:w-[240px] border-solid rounded p-2 h-10 bg-input"
                  defaultValue={"12/2024"}
                />
              </div>
              <div className="flex w-full flex-col md:w-auto">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  className="mt-2 sm:w-[240px] border-solid rounded p-2 h-10 bg-input"
                  defaultValue={"123"}
                />
              </div>
            </div>
            <button className="rounded-lg bg-btn-primary py-4 px-4 text-sm font-semibold uppercase text-btn-primary">
              Finalizar pagamento
            </button>
          </CheckoutForm>
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default CheckoutPage;
