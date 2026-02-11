import type { GameState } from "../hooks/use-game-manager";

interface PokemonResultProps {
    loadNewPokemon: () => Promise<void>;
    gameState: GameState;
}

export const PokemonResult = ({ loadNewPokemon, gameState }: PokemonResultProps) => {

    if (gameState === "playing") return null;
   
    return (
        <div
            className={`alert alert-${gameState === "correct" ? "success" : "danger"} text-center`}
            role="alert"
        >
            {gameState === "correct" ?
                <h2>¡Correcto! Has adivinado el Pokémon. <i className="bi bi-check-circle-fill text-success"></i></h2>
                : <h2>Incorrecto. Inténtalo de nuevo. <i className="bi bi-x-circle-fill text-danger"></i></h2>}

            <button
                onClick={loadNewPokemon}
                className="btn btn-dark mt-3"
            >Volver a jugar</button>
        </div>
    )
}
