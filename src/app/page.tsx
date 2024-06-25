import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Title } from "@/components/Title/Title";
import { Events } from "@/components/Event/Events";
import { useFetchEvents } from "@/hooks/useFetchEvents/useFetchEvents";

export const HomePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(useFetchEvents());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="mt-10 flex flex-col">
        <Title>Eventos disponíveis</Title>
        <Events />
      </main>
    </HydrationBoundary>
  );
};
