import { Inter } from "next/font/google";
import { createContext, useContext, useEffect, useState } from "react";
import { MainClient, NamedAPIResource, TypePokemon } from "pokenode-ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Search from "@/components/Search";
import Filters from "@/components/Filters";
import { getTypeByName, listPokemons } from "@/queries/queries";
import { AppContext } from "@/pages/_app";
import List from "@/components/List";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { searchValue, setSearchValue, filter, setFilter } =
    useContext(AppContext);
  const [list, setList] = useState<NamedAPIResource[] | []>([]);
  const [filterList, setFilterList] = useState<NamedAPIResource[] | []>([]);
  const [displayList, setDisplayList] = useState<NamedAPIResource[] | []>([]);

  // Queries
  const { isLoading, error, data } = useQuery({
    queryKey: ["pokemons"],
    queryFn: listPokemons,
    select: (data) => data?.results,
  });

  const {
    isLoading: isLoadingFilter,
    error: errorFilter,
    data: dataFilter,
  } = useQuery({
    queryKey: ["pokemonsByType", filter],
    queryFn: () => getTypeByName(filter),
    select: (data) =>
      data?.pokemon?.map((el: TypePokemon): NamedAPIResource => el?.pokemon),
  });

  useEffect(() => {
    if (!searchValue) {
      return setDisplayList([]);
    }

    if (dataFilter?.length) {
      return setDisplayList(
        dataFilter?.filter((el: NamedAPIResource) =>
          el?.name?.includes(searchValue),
        ),
      );
    }

    if (data?.length) {
      return setDisplayList(
        data?.filter((el: NamedAPIResource) => el?.name?.includes(searchValue)),
      );
    }
  }, [error, data, errorFilter, dataFilter, searchValue]);

  /**
   * Handlers
   */

  const searchHandler = (value: string): void => {
    setSearchValue(value);
  };

  const filtersHandler = (value: string): void => {
    setFilter(value);
  };

  /**
   * Render
   */

  if (isLoading) {
    return <div>{"Loading..."}</div>;
  }

  if (error) {
    return <div>{"Error"}</div>;
  }

  return (
    <main className={`flex flex-col items-center p-5 ${inter.className}`}>
      <h1 className="w-full mb-10 font-sans font-bold italic text-4xl">Pokedex</h1>
      <div className="flex flex-col w-full md:flex-row lg:w-2/4 mb-10">
        <Search value={searchValue} onChangeFn={searchHandler} />
        <Filters value={filter} onChangeFn={filtersHandler} />
      </div>
      <List displayList={displayList} />
    </main>
  );
}
