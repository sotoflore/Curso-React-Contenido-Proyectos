import { Suspense, use, useRef, useState } from "react";
//import { Weather } from "./types/weather";

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
        weatherPromise: Promise<any>; //Weather
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