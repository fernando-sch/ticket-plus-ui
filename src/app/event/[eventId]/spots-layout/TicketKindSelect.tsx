"use client";

import { selectTicketTypeAction } from "@/app/actions";

export type TicketKindSelectProps = {
  defaultValue: "full" | "half";
  price: number;
};

export const TicketKindSelect = ({
  defaultValue,
  price,
}: TicketKindSelectProps) => {
  const formattedFullPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
  const formattedHalfPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 2);
  return (
    <>
      <label htmlFor="ticket-type">Escolha o tipo de ingresso</label>
      <select
        name="ticket-type"
        id="ticket-type"
        className="mt-2 rounded-lg bg-input px-4 py-[14px]"
        defaultValue={defaultValue}
        onChange={async (e) => {
          await selectTicketTypeAction(e.target.value as any);
        }}
      >
        <option value="full">Inteira - {formattedFullPrice}</option>
        <option value="half">Meia-entrada - {formattedHalfPrice}</option>
      </select>
    </>
  );
};
