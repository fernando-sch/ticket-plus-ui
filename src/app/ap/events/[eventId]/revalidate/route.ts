// Exemplo cache sob demanda
// Teria que usar o fetch e não o React Query

import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

type PageRouterProps = {
  params: { eventId: string };
};

export function POST(_: NextRequest, { params: { eventId } }: PageRouterProps) {
  // Re-valida caches onde o request fetch possui como tag os valores de parametro
  // Ex:
  // await fetch(`${process.env.GOLANG_API_URL}/events/${eventId}`, {
  //   headers: {
  //     "apikey": process.env.GOLANG_API_TOKEN as string
  //   },
  //   cache: "no-store",
  //   next: {
  //     tags: [`events/${eventId}`],
  //   }
  // });
  //
  // revalidateTag(`events/${eventId}`);

  revalidateTag("events");
  revalidateTag(`events/${eventId}`);

  return new Response(null, { status: 204 });
}
