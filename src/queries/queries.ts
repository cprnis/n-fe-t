import { MainClient } from "pokenode-ts";

export const listTypes = async () => {
  const api = new MainClient();

  return await api.pokemon
    .listTypes()
    .then((data) => data)
    .catch((error) => {
      throw new Error(error);
    });
};

export const getTypeByName = async (typeName: string) => {
  const api = new MainClient();

  if (!typeName || typeName === "unknown") {
    throw new Error("getTypeByName param name");
  }

  return await api.pokemon
    .getTypeByName(typeName)
    .then((data) => data)
    .catch((error) => {
      throw new Error(error);
    });
};

export const listPokemons = async () => {
  const api = new MainClient();

  return await api.pokemon
    .listPokemons(20, 9999)
    .then((data) => data)
    .catch((error) => {
      throw new Error(error);
    });
};

export const getPokemonByName = async (name: string) => {
  const api = new MainClient();

  return await api.pokemon
    .getPokemonByName(name)
    .then((data) => data)
    .catch((error) => {
      throw new Error(error);
    });
};
