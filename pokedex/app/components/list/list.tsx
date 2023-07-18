"use client"
import './list.css';
import Card from '../card/card';
import React, { useEffect, useState } from 'react';
import { getPokemons, Pokemon } from '../../pokeapi/pokeapi';
import { getemail } from '../../utilis/getuser';

export default function List() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonsFavs,setPokemonsFavs] = useState <number[]>([]);

  const ema = getemail()

  const updateFav = async (id: number, isFavorite: boolean) => {
    if (isFavorite) {
      setPokemonsFavs((prevFavs) => [...prevFavs, id]);
      await saveFavorites(ema, id);
    } else {
      setPokemonsFavs((prevFavs) => prevFavs.filter((favId) => favId !== id));
      await removeFavorites(ema, id);
    }
  };

  const saveFavorites = async (ema: string, id: number) => {
    try {
      await fetch(`http://localhost:3000/api/favoritos/adicionar/`, {
        method:"POST", 
        body: JSON.stringify({ userEmail: ema, pokeid: id })
      });

      // await fetch(`http://localhost:3000/api/favoritos/pegar/`, {
      //   method: "POST",
      //   body: JSON.stringify({ email: ema })
      // });
    } catch (error) {
    }
  };

  const removeFavorites = async (ema: string, id: number) => {
    try {
      await fetch(`http://localhost:3000/api/favoritos/remover/`, {
        method:"POST", 
        body: JSON.stringify({ email: ema, pokeid: id })
      });

      // await fetch(`http://localhost:3000/api/favoritos/pegar/`, {
      //   method: "POST",
      //   body: JSON.stringify({ email: ema })
      // });
    } catch (error) {
    }
  };
  
  // Função para testar o array de pokemons favoritos
  useEffect(() => {
    async function fetchPokemons() {
      try {
        const pokemonsData = await getPokemons();
        setPokemons(pokemonsData);
      } catch (error) {
        console.error('Erro ao obter dados dos Pokémon:', error);
      }
    }

    fetchPokemons();
  }, []);

  return (
    <div className="list">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} id={pokemon.id} nome={pokemon.name} types={pokemon.types} imageUrl={pokemon.imageUrl} updateFav={updateFav} isFavorite={pokemonsFavs.includes(pokemon.id)} />
      ))}
    </div>
  );
}
