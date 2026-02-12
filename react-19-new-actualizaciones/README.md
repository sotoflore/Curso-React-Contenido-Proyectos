# React 19 actualizaciones

link https://react.dev/blog/2024/12/05/react-19

## UseTransition

Es un hook que permite retrasar la renderización de un componente hasta que se cumplan ciertas condiciones. Esto es útil para evitar que la interfaz de usuario se bloquee mientras se realizan tareas pesadas, como la carga de datos o la animación de elementos.

```tsx
import { useState, useTransition } from "react";

const fetchData = async (city: string) => {
  try {
    const BASE_URL = "https://api.weatherapi.com/v1/current.json";
    const API_KEY = import.meta.env.VITE_API_KEY;
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}`);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return "Error fetching data catch example";
  }
};

const App = () => {
  const [city, setCity] = useState("");
  const [isPending, startTransition] = useTransition();

  const [weather, setWeather] = useState(null);

  const handleSubmit = () => {
    startTransition(async () => {
      const data = await fetchData(city);
      setWeather(data);
    });
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSubmit}>Search</button>

      {isPending && <div>Loading...</div>}
      {weather && <pre>{JSON.stringify(weather, null, 2)}</pre>}
    </div>
  );
};

export default App;
```

## UseActionState

Es un hook que permite manejar el estado de una acción de forma más sencilla. Se puede usar para manejar el estado de una acción asíncrona, como una petición HTTP, y mostrar un mensaje de error o éxito al usuario.

```tsx 
import { useActionState } from "react";

const fetchDataActionState = async (_: unknown, formData: FormData) => {
  // console.log({ previousState, formData: formData.get("city") });
  // return formData.get("city");
  try {
    const BASE_URL = "https://api.weatherapi.com/v1/current.json";
    const API_KEY = import.meta.env.VITE_API_KEY;
    const city = formData.get("city");
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}`);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return "Error fetching data catch example";
  }
};

const App = () => {
  const [state, formAction, isPending] = useActionState(
    fetchDataActionState,
    null
  );

  return (
    <div>
      <h1>Weather App</h1>
      <form action={formAction}>
        <input
          type="text"
          name="city"
        />
        <button>Search</button>
      </form>

      {isPending && <div>Loading...</div>}
      {state && <pre>{JSON.stringify(state, null, 2)}</pre>}
    </div>
  );
};

export default App;
```

## use
use es una API de React que te permite leer el valor de un recurso como una Promesa o context.

```tsx
import { Suspense, use, useRef, useState } from "react";
import { Weather } from "./types/weather";

const fetchData = async (city: string) => {
  try {
    const BASE_URL = "https://api.weatherapi.com/v1/current.json";
    const API_KEY = import.meta.env.VITE_API_KEY;
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}`);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return "Error fetching data catch example";
  }
};

const WeatherDisplay = ({
  weatherPromise,
}: {
  weatherPromise: Promise<Weather>;
}) => {
  const weather = use(weatherPromise);
  return <pre>{JSON.stringify(weather, null, 2)}</pre>;
};

const App = () => {
  const [city, setCity] = useState("Santiago, Chile");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      setCity(inputRef.current.value);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          ref={inputRef}
        />
        <button type="submit">Search</button>
      </form>

      <Suspense fallback={<div>Loading...</div>}>
        <WeatherDisplay weatherPromise={fetchData(city)} />
      </Suspense>
    </div>
  );
};

export default App;
```