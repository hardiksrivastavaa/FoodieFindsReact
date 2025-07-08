import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PROXY_URL } from "./contstants";

const useRestaurants = () => {

    let [restaurants, setRestaurants] = useState([]);
    const { city } = useParams();
    let [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (city) {
            fetchRestaurants();
        }
    }, [city]);

    const fetchRestaurants = async () => {
        try {
            const url = `${PROXY_URL}https://www.zomato.com/webroutes/getPage?page_url=/${city
                .toLowerCase()
                .trim()}/trending-this-week&location=&isMobile=1`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("City not found");
            }

            const json = await response?.json();
            const cards = json?.page_data?.sections?.SECTION_ENTITIES_DATA;
            const fetchedRestaurants = [];

            if (!cards || !cards.length) {
                throw new Error("No restaurants found in this city");
            }

            for (let i = 0; i < cards?.length; i++) {
                const info = cards?.[i];
                const pathname = new URL(info?.url).pathname;
                fetchedRestaurants.push({
                    resPath: pathname,
                    name: info?.name,
                    offerValue: info?.proOfferText,
                    locality: info?.subtitleData?.locality?.text,
                    avgRating: info?.rating?.aggregate_rating,
                    img: info?.imageUrl,
                });
            }

            setRestaurants(fetchedRestaurants);
            setErrorMsg("");
        } catch (error) {
            setErrorMsg(error.message || "Something went wrong");
            setRestaurants([]);
        }
    };

    return { restaurants, errorMsg, setErrorMsg };
};

export default useRestaurants;
