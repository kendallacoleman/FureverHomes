import { useState, useEffect } from "react";
import api from "../api";

export default function FavoriteButton({ petID }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const res = await api.get("/api/favorites/");
                const favorites = res.data;
                const favorited = favorites.some((f) => f.pet_id === petId);
                setIsFavorite(favorited);
            } catch (error) {
                console.error("Error checking favorites:", error);
            }
        };
        checkFavorite();
    }, [petID]);

    const toggleFavorite = async () => {
        try {
            if (!isFavorite) {
                await api.post("/api/favorites/add/", { pet_id: petId });
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            style={{
                backgroundColor: isFavorite ? "#ffcccb" : "#eee",
                border: "1px solid #999",
                padding: "8px 12px",
                borderRadius: "8px",
            }}
        >
            {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </button>
    );
}