import "bootstrap-icons/font/bootstrap-icons.css";
import Shimmer from "../layouts/Shimmer.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useRestaurant from "../../../utils/hooks/useRestaurant.js";
import ReviewsCollection from "./ReviewCollection.js";
import DishesCollection from "./DishCollection.js";

const RestaurantCard = () => {
    const restaurant = useRestaurant();
    const { city } = useParams();

    if (restaurant === null) {
        return <Shimmer len={1} />;
    }

    const {
        resImg,
        name,
        resAddress,
        resOpenStatus,
        resPhoneNumber,
        resTiming,
        resZipCode,
        rating,
        ratingText,
        cuisine,
    } = restaurant;

    return (
        <div className="container my-5">

            <div className="row justify-content-center m-1">
                <div className="card shadow-sm border rounded-4 overflow-hidden p-0">
                    <div className="row g-0">
                        <div className="col-12 col-lg-5">
                            <img
                                src={resImg}
                                alt={name}
                                className="w-100 h-100"
                                style={{ objectFit: "cover", height: "100%", maxHeight: "400px" }}
                            />
                        </div>
                        <div className="col-12 col-lg-7">
                            <div className="card-body">
                                <h2 className="fw-bold mb-3">{name}</h2>

                                <p className="mb-2 text-muted">
                                    <i className="bi bi-geo-alt-fill text-danger me-2 fs-5"></i>
                                    <strong>Address:</strong> {resAddress}, {resZipCode}
                                </p>

                                <p className="mb-2 text-muted">
                                    <i className="bi bi-telephone-fill text-primary me-2 fs-5"></i>
                                    <strong>Contact:</strong> {resPhoneNumber}
                                </p>

                                <p className="mb-2 text-muted">
                                    <i className="bi bi-clock-fill text-info me-2 fs-5"></i>
                                    <strong>Timing:</strong> {resTiming}
                                </p>

                                <p className="mb-2 text-muted">
                                    <i className="bi bi-bookmark-star-fill text-success me-2 fs-5"></i>
                                    <strong>Cuisine:</strong> {cuisine}
                                </p>

                                <p className="mb-3">
                                    <i className="bi bi-star-fill text-warning me-2 fs-5"></i>
                                    <strong>Rating:</strong> {rating} ({ratingText})
                                </p>

                                <span
                                    className={`badge fs-6 px-3 py-2 rounded-pill ${resOpenStatus.toLowerCase().includes("open")
                                            ? "bg-success"
                                            : "bg-danger"
                                        }`}
                                >
                                    {resOpenStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-4">
                <Link to={`/restaurants/${city}`}>
                    <button className="btn btn-outline-danger px-4 py-2 rounded-pill">
                        <i className="bi bi-arrow-left-circle me-2"></i>Back to Home
                    </button>
                </Link>
            </div>

            <div className="container my-5">
                <div className="p-4 border rounded-4 shadow-sm bg-white">
                    <h1 className="fw-bold text-danger text-center">Our Delicious Dishes</h1>
                    <hr className="my-4 border-2 border-danger opacity-75" />
                    <DishesCollection />
                </div>
            </div>

            <div className="container my-5">
                <div className="p-4 border rounded-4 shadow-sm bg-white">
                    <h1 className="fw-bold text-danger text-center">User Reviews</h1>
                    <hr className="border-2 border-danger opacity-75" />
                    <ReviewsCollection />
                </div>
            </div>

        </div>

    );
};

export default RestaurantCard;
