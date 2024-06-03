import { useQuery } from "@tanstack/react-query";
import { listTypes } from "@/queries/queries";
import { NamedAPIResource } from "pokenode-ts";
import { ChangeEvent, ReactNode } from "react";
import { IFilters } from "./Filters.interface";

import styles from "./Filters.module.scss";

const Filters = ({ value, onChangeFn }: IFilters): ReactNode => {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["filters"],
    queryFn: listTypes,
    select: (data) => data?.results,
  });

  return (
    <select
      name="filters"
      id="filters"
      className={`rounded-lg p-2 font-sans font-semibold ${styles.filters}`}
      onChange={(event: ChangeEvent<HTMLSelectElement>) =>
        onChangeFn(event?.target?.value)
      }
    >
      <option
        key={"no-option"}
        value={"no-option"}
        selected={!value}
        disabled={true}
      >
        {isLoading && "Loading"}
        {error ? "There was an error loading filters" : "Select an option"}
      </option>
      {data?.length &&
        data.map(
          ({ name }: NamedAPIResource): ReactNode => (
            <option key={name} value={name} selected={name === value}>
              {name}
            </option>
          ),
        )}
    </select>
  );
};

export default Filters;
