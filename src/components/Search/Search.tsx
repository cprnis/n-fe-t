import { ChangeEvent, ReactNode } from "react";
import { ISearch } from "./Search.interface";

import styles from "./Search.module.scss";

const Search = ({ value, onChangeFn }: ISearch): ReactNode => {
  return (
    <input
      type="text"
      value={value}
      placeholder="Search for a pokemon"
      className={`flex flex-auto rounded-lg mb-5 md:mb-0 md:mr-5 p-2 font-sans font-semibold ${styles.search}`}
      onChange={(event: ChangeEvent<HTMLInputElement>): void => {
        // Add debounce
        onChangeFn(event?.target?.value);
      }}
    />
  );
};

export default Search;
