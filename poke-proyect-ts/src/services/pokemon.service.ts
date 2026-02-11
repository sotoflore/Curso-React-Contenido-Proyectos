import type { Pokemon } from "../interfaces/pokemon.interface";
import { getRandomNumber } from "../utils/random-number";

export const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';
export const MAX_POKEMON_COUNT = 151;

export const getRandomPokemon = async (): Promise<Pokemon> => {
    
    const randomId = getRandomNumber(1, MAX_POKEMON_COUNT);
    const response = await fetch(`${POKEMON_API_URL}/${randomId}`);

    if(!response.ok) {
        throw new Error(`Error fetching Pokemon with ID ${randomId}: ${response.statusText}`);
    }

    const data = await response.json();     

    return {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default
    }

}

const normalizePokemonName = (name: string): string => {
    return name
        .toLowerCase()
        .trim()
        .normalize("NFD") // Normaliza los caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
        .replace(/[^a-z0-9]+/g, ""); // Elimina caracteres especiales y espacios
}

const isPokemonNameCorrect = (pokemonName: string, correctName: string): boolean => {
    return normalizePokemonName(pokemonName) === normalizePokemonName(correctName);
}

export const pokemonService = {
    getRandomPokemon,
    isPokemonNameCorrect
}