import { IListItem } from "@/components/List/List.interface";
import { ReactNode } from "react";

const ListItem = ({ name }: IListItem): ReactNode => {
  return (
    <div
      className="flex w-full font-sans mb-5 rounded-lg"
      style={{ backgroundColor: "#ffffff", overflow: "hidden" }}
    >
      <div className="flex-none w-48 relative">
        <img
          src="https://pokenode-ts.vercel.app/siteLogo.svg"
          alt="Pokemon generic image"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-lg font-semibold text-slate-900 capitalize text-center">
            {name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
