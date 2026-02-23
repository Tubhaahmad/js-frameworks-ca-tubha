"use client";
// this component wraps the entire app and gives access to tanstack query//
// has to be a client component because of the useState hook//

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  // using useState to create a single instance of QueryClient that will be shared across the app//
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
