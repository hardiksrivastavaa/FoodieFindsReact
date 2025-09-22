import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import UserContext from "../../../utils/contexts/UserContext";
import { useContext } from "react";

const RestaurantsCard = ({ restaurantsData }) => {

    const { loggedInUser } = useContext(UserContext);
    const { resPath, name, locality, avgRating, img } = restaurantsData;

    return (
        <div
            id="restaurant-card"
            className="card shadow-sm rounded-4 overflow-hidden w-100 h-100 d-flex flex-column"
        >
            <img
                src={img}
                alt={name}
                className="card-img-top img-fluid"
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column justify-content-between flex-grow-1">
                <div>
                    <h5 className="card-title fw-bold text-dark text-capitalize" >
                        {name}
                    </h5>
                    <p className="card-text text-muted mb-1">
                        <i className="bi bi-geo-alt-fill me-1 text-danger"></i>
                        {locality}
                    </p>
                </div>
                <p className="card-text text-muted mt-auto mb-0">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    {avgRating ? avgRating : "N/A"} / 5
                </p>

                <p className="mx-0 my-0">
                    <Link
                        className="btn btn-outline-primary mt-3"
                        to={`/restaurants${resPath}`}
                    >
                        View more
                    </Link>
                </p>
                <p className="card-text text-muted mb-1 mt-2">
                    <i className="bi bi-person-fill me-1 text-success"></i>
                    {loggedInUser}
                </p>

            </div>
        </div>
    );
};

export const withOfferValue = (RestaurantsCard) => {
    return (props) => {
        const { restaurantsData } = props;
        const { offerValue } = restaurantsData;

        return (
            <div className="position-relative">
                <RestaurantsCard {...props} />
                {offerValue && (
                    <span className="badge bg-success position-absolute top-0 end-0 m-2 p-2">
                        {offerValue}
                    </span>
                )}
            </div>
        );
    };
}

export default RestaurantsCard;
