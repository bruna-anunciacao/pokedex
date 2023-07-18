export interface PokemonResult {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

export async function getPokemons(): Promise<Pokemon[]> {
  const limitPokemon = 30;
  const api = '/api/v2/pokemon';

  const res = await fetch(`${api}/?limit=${limitPokemon}`);
  const data = await res.json();

  const pokemons: Pokemon[] = await Promise.all(
      data.results.map(async (item: PokemonResult, index: number) => {
        const resPokemon = await fetch(item.url);
        const dataPokemon = await resPokemon.json();
  
        return {
          id: index + 1,
          name: item.name,
          imageUrl: dataPokemon.sprites.front_default,
          types: dataPokemon.types.map((type: any) => type.type.name),
        };
      })
    );
  
    return pokemons;
  }