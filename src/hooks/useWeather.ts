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

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>({
    name: "",
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
    },
  });

  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    try {
      const city = encodeURIComponent(search.city);
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${search.country}&appid=${appId}`;

      const { data } = await axios.get(geoUrl);

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

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
      }
    } catch (error) {
      console.log("Error trying fetchWeather");
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);
  return {
    weather,
    fetchWeather,
    hasWeatherData,
  };
}
