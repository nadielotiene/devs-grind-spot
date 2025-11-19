import { useEffect, useState } from "react";

export default function Weather() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=5f4736e720bda76fd43cf92d8c48f9d9`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Weather data not available")
                }
                return res.json()
            })
            .then(data => {
                setWeather(data)
            })
            .catch(err => console.error(err))
        })
    }, [])

    if (!weather) return <p>Loading weather...</p>

    return (
        <section className="weather--div">
            <span className="temp--span">
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                <h2>{Math.round(weather.main.temp)}°</h2>
            </span>
            <p>{weather.name}</p>
        </section>
    )
}