import type { GameState } from "../hooks/use-game-manager";
import type { Pokemon } from "../interfaces/pokemon.interface";
import { Spinner } from "./Spinner";

interface PokemonDisplayProps {
    pokemon: Pokemon;
    isLoading: boolean;
    gameState: GameState;
}

export const PokemonDisplay = ({ pokemon, isLoading, gameState }: PokemonDisplayProps) => {

    const showAnser = gameState !== "playing";
    const name = pokemon?.name;
    const image = pokemon?.image;

  return (
      <div className="card">
          <div className="card-header">
              <h1 className="text-center">
                  {showAnser ? name?.toUpperCase() : "Quien es ese Pokemon?"}
              </h1>
          </div>
          <div className="card-body">  
              {isLoading ? (
                  <Spinner/>
              ) : (
                      <img
                          src={image}
                          alt="pokemon"
                          className="img-fluid mx-auto d-block"
                          style={{
                              maxHeight: "300px",
                              filter: showAnser ? "none" : "brightness(0)",
                              transition: "filter 0.3s ease-in-out",
                          }}
                      /> 
              )}
          </div>
    </div>
  )
}
