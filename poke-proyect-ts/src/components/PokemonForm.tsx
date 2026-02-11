import { useState, type SubmitEvent } from "react";
import type { GameState } from "../hooks/use-game-manager";

interface PokemonFormProps {
    handlePokemonNameSubmit: (userInput: string) => void;
    gameState: GameState;
}

export const PokemonForm = ({ handlePokemonNameSubmit, gameState}: PokemonFormProps) => {

    const [inputValue, setInputValue] = useState<string>("");

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        
        handlePokemonNameSubmit(inputValue.trim().toLowerCase());
        setInputValue("");
    }

  return (
      <form className="input-group my-4" onSubmit={handleSubmit}>
          <input
              type="text"
              className="form-control"
              placeholder="quien es ese pokemon?"
              aria-label="quien es ese pokemon?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
             disabled={gameState !== "playing"}
          />
          <button
              type="submit"
              className="btn btn-outline-dark"
              disabled={!inputValue.trim() || gameState !== "playing"}
          >
              Jugar
          </button>
    </form>
  )
}
