import { useForm } from "react-hook-form";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import type { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
  loading?: boolean;
};

export default function Form({ fetchWeather, loading = false }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchType>();

  const onSubmit = (data: SearchType) => {
    fetchWeather(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {errors.country && <Alert>{errors.country.message}</Alert>}
      {errors.city && <Alert>{errors.city.message}</Alert>}

      <div className={styles.field}>
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          {...register("country", {
            required: "Country is mandatory",
          })}
        >
          <option value="">-- Select a Country --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="city">City:</label>
        <input
          id="city"
          type="text"
          placeholder="City"
          {...register("city", {
            required: "City is mandatory",
          })}
        />
      </div>

      <input
        type="submit"
        className={styles.submit}
        value={loading ? "Searching..." : "Check Weather"}
        disabled={loading}
      />
    </form>
  );
}
