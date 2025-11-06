import api from "./api";

export async function getRandomQuote() {
    try {
        const res = await api.get("http://localhost:8000/api/quote");
        return {
            text: res.data.content,
            author: res.data.author,
        };
    } catch (error) {
        console.error("Error fetching quote: ", error);
        throw error;
    }
}
