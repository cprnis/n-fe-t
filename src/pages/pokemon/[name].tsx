import { useRouter } from "next/router";
import { getPokemonByName } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Inter } from "next/font/google";
import { PokemonMove, PokemonStat } from "pokenode-ts";

const inter = Inter({ subsets: ["latin"] });

export default function About() {
  const {
    query: { name = "" },
  } = useRouter();

  const { isLoading, error, data } = useQuery({
    queryKey: [`pokemon-${name}`],
    queryFn: () => getPokemonByName(Array.isArray(name) ? name[0] : name),
  });

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
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-5 ${inter.className}`}
    >
      <div className="w-full md:flex-row lg:w-2/4">
        <h1 className="w-full mb-10 font-sans font-bold italic text-4xl capitalize">
          {data?.name}
        </h1>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center br-5">
          <ul className="w-full md:w-auto">
            <li className="mb-10 font-sans font-bold">Stats:</li>
            {data?.stats?.map((el: PokemonStat) => (
              <li key={el?.stat?.name} className="capitalize mb-5">
                {el?.stat?.name}: {el?.base_stat}
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <Image
              src={
                data?.sprites?.other?.["official-artwork"]?.front_default || ""
              }
              width={250}
              height={250}
              alt={`Pokemon ${data?.name} image`}
              className="flex-initial border-4 rounded-full border-slate-600"
            />
          </div>
        </div>
        <div>
          <h3 className="mt-10 mb-10 font-sans font-bold">Moves:</h3>
          <ul className="flex flex-wrap">
            {data?.moves?.map((el: PokemonMove) => (
              <li key={el?.move?.name} className="capitalize mb-5 mr-5">
                {el?.move?.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
