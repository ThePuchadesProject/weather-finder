# Weather Finder

[English](#english) | [Español](#español)

---

## English

A clean and responsive weather consultation application built with React 19, TypeScript, and CSS Modules. It fetches real-time weather data from the OpenWeatherMap API based on city and country searches.

### Live Demo
- [weatherfinder.thepuchadesproject.com](https://weatherfinder.thepuchadesproject.com)

### What the project does
- Allows users to search the current weather for cities across different countries.
- Validates search forms to prevent empty or invalid queries.
- Manages asynchronous API calls and handles loading states with a custom spinner.
- Displays friendly error alerts when a city is not found or when external API / rate limit errors occur.
- Demonstrates safe handling and validation of external API responses using TypeScript, type guards, and schema validation libraries (Zod and Valibot).
- Supports hybrid deployment: direct client requests for local development and secure server-side reverse proxying with caching for production.

### Tech Stack
- **React 19**: Modern component-based UI development.
- **TypeScript**: Strict static typing for components, hooks, and API data.
- **CSS Modules**: Scoped and maintainable component styling without class collisions.
- **React Hook Form**: Performant form state management and input validation.
- **Axios**: Promise-based HTTP client for external API requests.
- **Zod & Valibot**: Schema validation libraries to guarantee runtime type safety for API responses.
- **Vite**: Fast development build tool and local server.
- **Nginx (Alpine Slim)**: Lightweight web server, reverse proxy, and response caching for production deployment.
- **OpenWeatherMap API**: External weather and geocoding services.

### Roadmap
- [x] Project setup with React 19, TypeScript, and Vite.
- [x] Layout and design using CSS Modules.
- [x] Search form with controlled inputs and validation for city and country.
- [x] Custom hook `useWeather` for fetching and managing weather data.
- [x] Environment variables configuration for API key security (`VITE_API_KEY`).
- [x] Asynchronous API requests for geocoding and weather data.
- [x] API response typing: comparison between Type Guards, Zod, and Valibot.
- [x] UI states: loading spinner, not found handling, rate-limit/network error alerts, and search reset.
- [x] Post-project challenge: refactor form handling using React Hook Form.
- [x] Production architecture: Nginx reverse proxy with server-side API Key injection and `proxy_cache` caching (24h for geocoding, 15m for weather).

### Local Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Puchades/weather-finder.git
   cd weather-finder
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   ```env
   VITE_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Production Deployment & Security (Docker & Nginx)
In production, client-side exposure of the API key is completely avoided:
- Running `npm run build` uses `.env.production` (where `VITE_API_KEY` is empty), generating a bundle that routes requests through `/api/geo` and `/api/weather`.
- An ultralight Nginx container (`nginx:alpine-slim`) acts as a reverse proxy, appending `&appid=${OPENWEATHER_API_KEY}` on the server side so credentials never reach the browser's Network tab.
- **Caching (`proxy_cache`)**: Geocoding responses are cached for 24 hours, and weather reports for 15 minutes, safeguarding API rate limits and preventing service disruption.

---

## Español

Una aplicación meteorológica clara y adaptable creada con React 19, TypeScript y CSS Modules. Consulta datos del clima en tiempo real desde la API de OpenWeatherMap a partir de búsquedas por ciudad y país.

### Demo en vivo
- [weatherfinder.thepuchadesproject.com](https://weatherfinder.thepuchadesproject.com)

### Qué hace el proyecto
- Permite buscar el clima actual de ciudades en distintos países.
- Valida los formularios de búsqueda para evitar consultas vacías o incompletas.
- Gestiona peticiones asíncronas a la API y muestra estados de carga con un spinner visual.
- Controla errores y muestra avisos claros cuando no se encuentra una ciudad o cuando ocurre un fallo de red / límite de cuota.
- Muestra cómo tipar y validar respuestas de APIs externas de forma segura mediante TypeScript, Type Guards y validación de esquemas (Zod y Valibot).
- Soporta arquitectura híbrida: llamadas directas para desarrollo local y proxy inverso seguro con caché en servidor para producción.

### Stack Tecnológico
- **React 19**: Construcción de interfaces con componentes modernos.
- **TypeScript**: Tipado estático estricto para componentes, hooks y respuestas de API.
- **CSS Modules**: Estilos locales y modulares por componente para evitar conflictos.
- **React Hook Form**: Gestión eficiente del estado de formularios y validaciones.
- **Axios**: Cliente HTTP basado en promesas para consultas a la API externa.
- **Zod y Valibot**: Librerías de validación de esquemas para asegurar el tipado de respuestas de API en tiempo de ejecución.
- **Vite**: Entorno de desarrollo rápido y servidor local.
- **Nginx (Alpine Slim)**: Servidor web ultraligero, proxy inverso y caché de respuestas para despliegue en producción.
- **OpenWeatherMap API**: Servicio externo para datos climáticos y geolocalización.

### Hoja de ruta (Roadmap)
- [x] Inicialización del proyecto con React 19, TypeScript y Vite.
- [x] Estructuración y maquetación visual con CSS Modules.
- [x] Formulario de búsqueda con campos controlados y validación para ciudad y país.
- [x] Custom Hook `useWeather` para centralizar la lógica de consulta.
- [x] Configuración de variables de entorno para proteger la API key (`VITE_API_KEY`).
- [x] Peticiones asíncronas hacia los endpoints de geocodificación y clima.
- [x] Tipado de respuestas de API: comparativa entre Type Guards, Zod y Valibot.
- [x] Estados de la interfaz: spinner de carga, ciudad no encontrada, alertas de fallo de red/cuota y reseteo de búsquedas.
- [x] Reto post-proyecto: refactorizar la gestión del formulario con React Hook Form.
- [x] Arquitectura de producción: Proxy inverso con Nginx, inyección de clave en servidor y caché `proxy_cache` (24h en geocodificación, 15m en clima).

### Instalación local
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Puchades/weather-finder.git
   cd weather-finder
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env.local` en la raíz del proyecto con tu clave de OpenWeatherMap:
   ```env
   VITE_API_KEY=tu_api_key_aqui
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Despliegue en Producción y Seguridad (Docker y Nginx)
Para producción se evita exponer la clave de la API en el cliente:
- Al ejecutar `npm run build`, se toma la configuración de `.env.production` (donde `VITE_API_KEY` está vacía), compilando un bundle que realiza las peticiones a `/api/geo` y `/api/weather`.
- Un contenedor ultraligero de Nginx (`nginx:alpine-slim`) actúa como proxy inverso e inyecta `&appid=${OPENWEATHER_API_KEY}` en el servidor, de modo que la clave jamás llega a la pestaña Red del navegador.
- **Caché (`proxy_cache`)**: Las coordenadas de geocodificación se cachean durante 24 horas y el clima durante 15 minutos, blindando la cuota gratuita de la API y garantizando alto rendimiento con consumo mínimo de RAM.
