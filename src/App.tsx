import styles from "./App.module.css";
import Alert from "./components/Alert/Alert";
import Form from "./components/Form/Form";
import Spinner from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";
export default function App() {
  const {
    weather,
    loading,
    notFound,
    hasError,
    fetchWeather,
    hasWeatherData,
  } = useWeather();

  return (
    <>
      <h1 className={styles.title}>Weather Finder</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} loading={loading} />
        {loading && <Spinner />}
        {hasWeatherData && !loading && <WeatherDetail weather={weather} />}
        {notFound && !loading && <Alert>City Not Found</Alert>}
        {hasError && !loading && (
          <Alert>Unable to fetch weather data. Please try again later.</Alert>
        )}
      </div>
    </>
  );
}
