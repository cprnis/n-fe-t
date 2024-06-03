import { NamedAPIResource } from "pokenode-ts";
import Link from "next/link";
import ListItem from "./ListItem";
import { ReactNode } from "react";

import { IList } from "./List.interface";

const List = ({ displayList }: IList): ReactNode => {
  return (
    <ul className="w-full lg:w-2/4">
      {displayList?.map((el: NamedAPIResource) => (
        <li key={el?.name}>
          <Link href={`./pokemon/${el?.name}`}>
            <ListItem {...el} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
