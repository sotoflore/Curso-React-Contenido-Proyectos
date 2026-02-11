import { useCallback, useEffect, useState } from "react";
import { pokemonService } from "../services/pokemon.service";
import type { Pokemon } from "../interfaces/pokemon.interface";

export const GAME_STATE = {
    playing: "playing",
    correct: "correct",
    wrong: "wrong"
} as const;

export type GameState = typeof GAME_STATE[keyof typeof GAME_STATE];

export const useGameManager = () => {

    const [pokemon, setPokemon] = useState<Pokemon| null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [gameState, setGameState] = useState<GameState>(GAME_STATE.playing);

    const handlePokemonNameSubmit = useCallback((userInput: string) => {
        if(!pokemon) return;

        const isCorrect = pokemonService.isPokemonNameCorrect(userInput, pokemon.name);
        setGameState(isCorrect ? GAME_STATE.correct : GAME_STATE.wrong);
    },[pokemon])
    

    const loadNewPokemon = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGameState(GAME_STATE.playing);

        try {
            const randomPokemon = await pokemonService.getRandomPokemon();
            setPokemon(randomPokemon);
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        loadNewPokemon();
    }, [loadNewPokemon])
    
    return {
        pokemon,
        isLoading,
        error,
        loadNewPokemon,
        handlePokemonNameSubmit,
        gameState
    }

}