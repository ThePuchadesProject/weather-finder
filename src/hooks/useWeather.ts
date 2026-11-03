import axios from "axios";
import { z } from "zod";
// import { object, string, number, type InferOutput, parse } from "valibot";
import type { SearchType } from "../types";
import { useMemo, useState } from "react";

// TYPE GUARD O ASSERTION
// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_min === "number" &&
//     typeof (weather as Weather).main.temp_max === "number"
//   );
// }

// Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_min: number(),
//     temp_max: number(),
//   }),
// });

// type Weather = InferOutput<typeof WeatherSchema>;

// Zod
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  }),
});

export type Weather = z.infer<typeof Weather>;

const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_min: 0,
    temp_max: 0,
  },
};

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    setWeather(initialState);
    setNotFound(false);
    setHasError(false);
    setLoading(true);

    try {
      const city = encodeURIComponent(search.city);
      const geoUrl = appId
        ? `https://api.openweathermap.org/geo/1.0/direct?q=${city},${search.country}&appid=${appId}`
        : `/api/geo?q=${city},${search.country}`;

      const { data } = await axios.get(geoUrl);

      // Comprobar si existe
      if (!data[0]) {
        setNotFound(true);
        return;
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = appId
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
        : `/api/weather?lat=${lat}&lon=${lon}`;

      // Castear el type
      // const { data: weatherResult } = await axios.get<Weather>(weatherUrl);
      // console.log(weatherResult.main.temp);
      // console.log(weatherResult.name);

      // Type Guards
      // const { data: weatherResult } = await axios(weatherUrl);
      // const result = isWeatherResponse(weatherResult);
      // if (result) {
      //   console.log(weatherResult.main.temp);
      //   console.log(weatherResult.name);
      // } else {
      //   console.log("Malformed response");
      // }

      // Valibot
      // const { data: weatherResult } = await axios.get(weatherUrl);
      // const result = parse(WeatherSchema, weatherResult);
      // if (result) {
      //   console.log(result.main.temp);
      //   console.log(result.name);
      // }

      // Zod
      const { data: weatherResult } = await axios.get(weatherUrl);
      const result = Weather.safeParse(weatherResult);
      if (result.success) {
        setWeather(result.data);
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.log("Error trying fetchWeather", error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);
  return {
    weather,
    loading,
    notFound,
    hasError,
    fetchWeather,
    hasWeatherData,
  };
}
