export default function Weather() {
    navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=5f4736e720bda76fd43cf92d8c48f9d9`)
        .then(res => {
        if (!res.ok) {
            throw Error("Weather data not available")
        }
        return res.json()
        })
        .then(data => {
        const iconUrl = `
        https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png
        `
        document.getElementById("weather--div").innerHTML = `
            <img src=${iconUrl} />
            <h2>${Math.round(data.main.temp)}°</h2>
            <p>${data.name}</p>
        `
        console.log(data)
        })
        .catch(err => console.error(err))
    })
}