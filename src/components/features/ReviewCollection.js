import useReview from "../../../utils/useReview";
import Shimmer from "../layouts/Shimmer";

const ReviewsCollection = () => {

    const reviews = useReview();

    if (!reviews) {
        return <Shimmer len={1} />;
    }

    return (
        <div className="container my-2">
            <div className="row col-12">
                {reviews && reviews.map((review) => (
                    <div className="col-12 col-lg-6" key={review.reviewId}>
                        <ReviewCard reviewsData={review} />
                    </div>
                ))}
            </div>
        </div>
    )
};

export const ReviewCard = ({ reviewsData }) => {

    const {
        reviewText,
        reviewFor,
        reviewTime,
        reviewRating,
        userName,
        userProfilePic,
        userFollowersCount,
        userReviewsCount
    } = reviewsData;

    return (
        <div className="card mt-3 shadow-sm border rounded-4">
            {/* Card Header */}
            <div className="card-header bg-primary text-white rounded-top-4">
                <h5 className="mb-0 fw-bold">Review By {userName}</h5>
            </div>

            {/* Card Body */}
            <div className="card-body">
                {/* User Info */}
                <div className="d-flex align-items-center mb-3">
                    <img
                        src={userProfilePic}
                        alt={userName}
                        className="rounded-circle me-3"
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <div>
                        <h5 className="mb-1 fw-semibold">{userName}</h5>
                        <p className="mb-0 text-muted">
                            Followers: <span className="fw-semibold">{userFollowersCount}</span> | Reviews: <span className="fw-semibold">{userReviewsCount}</span>
                        </p>
                    </div>
                </div>

                {/* Review Rating */}
                <div className="mb-3">
                    <span className="badge fs-6 mt-2" style={{ backgroundColor: reviewRating > 3 ? "green" : "red" }} >
                        {reviewFor} &nbsp;|&nbsp; {reviewRating} ★
                    </span>
                </div>

                <p
                    className="card-text"
                    dangerouslySetInnerHTML={{ __html: reviewText }}
                ></p>


                {/* Time */}
                {reviewTime && (
                    <p className="text-muted small mt-3">
                        <i className="bi bi-clock"></i> {reviewTime}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ReviewsCollection;