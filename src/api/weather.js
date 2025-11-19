import api from "./api";

// https://openweathermap.org/current

const KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export async function Weather(lat, lon, units = "imperial") {
    if (!KEY) throw new Error("Missing OpenWeather API key (VITE_OPENWEATHER_KEY)");

    try {
        const res = await api.get("http://localhost:8000/api/weather", {
            params: {
                lat,
                lon,
                units,
                appid: KEY,
            },
        });

        const data = res.data;

        return {
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            condition: data.weather?.[0]?.main || "",
            description: data.weather?.[0]?.description || "",
            iconUrl: `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`,
            city: data.name,
            humidity: data.main.humidity,
            windSpeed: data.wind?.speed,
            raw: data,
        };
    } catch (err) {
        console.log("Error fetching weather:", err);
        throw err;
    }
}
