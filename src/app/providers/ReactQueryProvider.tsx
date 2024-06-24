import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

type ReactQueryProviderProps = { children: React.ReactNode };

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
