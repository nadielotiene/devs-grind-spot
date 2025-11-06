import { useEffect, useState, useRef } from "react";
import { getRandomBackground } from "../api/backgrounds";

export default function Background() {
    const [backgroundUrl, setBackgroundUrl] = useState(null);
    const [imageData, setImageData] = useState({ location: "", author: "" });
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        async function fetchBackground() {
            try {
                const { small, full, location, author } = await getRandomBackground();

                setImageData({ location, author })
                setBackgroundUrl(small);

                const img = new Image();
                img.src = full;
                img.onload = () => {
                    setBackgroundUrl(full);
                    setIsLoaded(true);
                };
            } catch (err) {
                console.log("Background fetch error:", err);
                setError("Sorry, no backgrounds available at the moment");
            }
        }
        fetchBackground();
    }, []);
    
    if (error)return <p>{error}</p>;
    if (!backgroundUrl) return <p>Loading...</p>;
    
    return (
        <section 
            className={`background__img ${isLoaded ? "fade-in" : ""}`}
            style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
            <div className="img__info">
                {imageData?.location ? (
                    <div className="info--div location-info">
                        <p className="img__location">
                            Location: {imageData.location}
                        </p>
                    </div>
                ) : null}

                {imageData?.author ? (
                    <div className="info--div author-info">
                        <p className="img__author">
                            Photo by: {imageData.author}
                        </p>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
