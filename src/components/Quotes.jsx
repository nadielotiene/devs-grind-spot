import { useEffect, useState } from "react";
import { getRandomQuote } from "../api/quotes";

export default function Quotes() {
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchQuote() {
            try {
                const q = await getRandomQuote();
                setQuote(q);
            } catch (err) {
                console.error(err);
                setError("No quotes available at the moment");
            }
        }
        fetchQuote();
    }, [])

    if (error) return <p>{error}</p>;
    if (!quote) return <p>Loading...</p>;

    return (
        <section className="quotes--section">
            <p className="quote__text">"{quote.text}"</p>
            <p className="quote__author">- {quote.author}</p>
        </section>
    )
}
