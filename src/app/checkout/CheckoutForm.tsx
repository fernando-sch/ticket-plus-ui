"use client";

import { useFormState } from "react-dom";
import { checkoutAction } from "../actions";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";

type getCardHashParams = {
  cardName: string;
  cardNumber: string;
  expireDate: string;
  cvv: string;
};

const getCardHash = async (_: getCardHashParams) => {
  return Math.random().toString(36).substring(7);
};

type CheckoutFormProps = {
  children: React.ReactNode;
  className?: string;
};

export function CheckoutForm({ children, className = "" }: Readonly<CheckoutFormProps>) {
  const [state, formAction] = useFormState(checkoutAction, {
    error: null as string | null,
  });

  const handleFormAction = async (formData: FormData) => {
    const cardHash = await getCardHash({
      cardName: formData.get("card_name") as string,
      cardNumber: formData.get("cc") as string,
      expireDate: formData.get("expire_date") as string,
      cvv: formData.get("cvv") as string,
    });

    formAction({
      cardHash: cardHash,
      email: formData.get("email") as string,
    });
  };

  return (
    <form action={handleFormAction} className={className}>
      {state?.error && <ErrorMessage error={state.error} />}
      <input type="hidden" name="card_hash" />
      {children}
    </form>
  );
}
