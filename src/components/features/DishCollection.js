import { dishes } from "../../../utils/dishes";

const DishesCollection = () => (
  <div className="container my-2">
    <div className="row gy-4">
      {dishes.map((dish) => (
        <div className="col-12 col-md-6 col-lg-4" key={dish.id}>
          <DishCard dish={dish} />
        </div>
      ))}
    </div>
  </div>
);

export const DishCard = ({ dish }) => {
    return (
        <div className="card h-100 shadow-sm border-1 rounded-4">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{dish.name}</h5>
                <p className="card-text text-muted flex-grow-1">
                    {dish.description}
                </p>
                <h6 className="fw-semibold text-danger">{dish.price}</h6>

                <button className="btn btn-success mt-3 w-100">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default DishesCollection;
