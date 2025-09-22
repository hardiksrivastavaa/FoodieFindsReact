import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RESTAURANT_URL } from "../data/constants";

const useReview = () => {
    const [reviews, setReviews] = useState(null);
    const { city, restaurant } = useParams();

    useEffect(() => {
        if (city && restaurant) {

            const apiUrl = `${RESTAURANT_URL}/${city}/${restaurant}/reviews`;
            fetchRestaurant(apiUrl);
        }
    }, [city, restaurant]);

    const fetchRestaurant = async (apiUrl) => {
        try {
            const response = await fetch(apiUrl);
            const json = await response?.json();

            const reviewsObj = json?.entities?.REVIEWS || {};

            // Convert the object of reviews into an array
            const allReviews = Object.entries(reviewsObj).map(([reviewId, review]) => {
                return {
                    reviewId: review.reviewId || reviewId,
                    reviewText: review.reviewText || "No review text available",
                    reviewTime: review.timestamp,
                    reviewFor: review.ratingV2Text || "No rating available",
                    reviewRatingColor: review.newRatingColor,
                    reviewRating: review.ratingV2 || 0,
                    userName: review.userName,
                    userProfilePic: review.userProfilePic || review.userImagePlaceholder,
                    userFollowersCount: review.userFollowersCount,
                    userReviewsCount: review.userReviewsCount,
                };
            });

            setReviews(allReviews);


        } catch (error) {
            console.log("Failed to fetch restaurant data:", error);
        }
    };

    console.log("Review Data:", reviews);


    return reviews;
};

export default useReview;
