import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, useState } from "react";

const queryClient = new QueryClient();

export const AppContext = createContext({
  searchValue: "",
  setSearchValue: (arg: string): void => {},
  filter: "",
  setFilter: (arg: string): void => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [filter, setFilter] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <AppContext.Provider
      value={{ searchValue, setSearchValue, filter, setFilter }}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppContext.Provider>
  );
}
