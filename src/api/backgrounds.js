import api from "./api";

// https://unsplash.com/documentation

const UNSPLASH_URL = "https://api.unsplash.com/photos/random";
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function getRandomBackground() {
    try {
        const res = await api.get(UNSPLASH_URL, {
            params: { query: "nature", orientation: "landscape" },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_KEY}`,
            },
        });

        console.log("Unsplash data:", res.data);

        const data = res.data;

        return {
            small: `${data.urls.raw}&w=400&q=60&fm=jpg`, // placeholder
            full: `${data.urls.raw}&w=1920&q=85&fm=jpg`,
            author: data.user?.name ||"",
            location: data.location?.name || "",
        };
    } catch (error) {
        console.log("Error fetching background:", error);
        throw error;
    }
}
