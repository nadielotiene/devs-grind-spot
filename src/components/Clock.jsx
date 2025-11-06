import { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
        const date = new Date();
        
        const currentTime = date.toLocaleTimeString([], { timeStyle:"short" });
        const noMeridiemTime = currentTime.replace("AM", "").replace("PM", "");

        const options = { weekday: "short", month: "short", day: "numeric" };
        const currentDate = date.toLocaleDateString("en-US", options);

        setTime(noMeridiemTime);
        setDate(currentDate)
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="time">
            <h1 id="clock">{time}</h1>
            <p id="date">{date}</p>
        </div>
    )
}
