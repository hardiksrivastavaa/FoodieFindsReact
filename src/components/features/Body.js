import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useRestaurants from "../../../utils/useRestaurants.js";
import useOnlineStatus from "../../../utils/useOnlineStatus.js";
import Restaurants from "./RestaurantsCard.js";
import Shimmer from "../layouts/Shimmer.js";

const Body = () => {

  const { restaurants, errorMsg, setErrorMsg } = useRestaurants();
  const onlineStatus = useOnlineStatus();
  const navigate = useNavigate();

  let [filteredRestaurants, setFilteredRestaurants] = useState([]);
  let [inputRestaurant, setInputRestaurant] = useState("");
  let [istopRated, setIsTopRated] = useState(false);
  let [inputCity, setInputCity] = useState("");
  let [loading, setLoading] = useState(true);


  useEffect(() => {
    if (restaurants && restaurants.length > 0) {
      setFilteredRestaurants(restaurants);
      setLoading(false);
    }
  }, [restaurants]);

  const topRatedRestaurants = () => {
    setErrorMsg("");
    if (!istopRated) {
      const topRated = restaurants.filter(
        (restaurant) => restaurant.avgRating >= 4.5
      );
      setFilteredRestaurants(topRated);
    } else {
      setFilteredRestaurants(restaurants);
    }
    setIsTopRated(!istopRated);
  };

  const handleCityClick = () => {
    if (inputCity.trim() === "") {
      setErrorMsg("Please enter a city name.");
    } else {
      setErrorMsg("");
      setIsTopRated(false);
      navigate(`/restaurants/${inputCity.trim().toLowerCase()}`);
      setInputCity("");
    }
  };

  const handleRestaurantClick = () => {
    if (inputRestaurant.trim() === "") {
      setErrorMsg("Please enter a restaurant name.");
      return;
    } else {
      setErrorMsg("");
      setIsTopRated(false);
      let searchedRestaurant = restaurants.filter((restaurant) =>
        restaurant?.name?.toLowerCase().includes(inputRestaurant.toLowerCase())
      );

      if (searchedRestaurant.length === 0) {
        setErrorMsg("No restaurants found with that name.");
      } else {
        setErrorMsg("");
        setFilteredRestaurants(searchedRestaurant);
        setInputRestaurant("");
      }

    }
  };

  if (!onlineStatus) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center" role="alert">
          <h1 className="display-4 fw-bold mb-3">Oops!</h1>
          <p className="lead">Looks like you are <strong>offline</strong>!</p>
          <p className="mb-0">Check your internet connection and try again.</p>
        </div>
      </div>
    );
  }

  if (loading || restaurants === null) {
    return (
      <Shimmer />
    );
  }

  return (

    <main className="py-4">
      <div className="container">

        {/* Search Section */}

        <div id="search" className="row justify-content-center align-items-center g-3 mb-4">

          {/* Top Rated Button */}
          <div className="col-12 col-md-auto text-center">
            <button type="button" className="btn btn-outline-success w-100" onClick={topRatedRestaurants}>Top Rated Restaurants</button>
          </div>

          {/* City Search */}
          <div className="col-12 col-md-4">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search City" onChange={(e) => { setInputCity(e.target.value); setErrorMsg("") }} value={inputCity} />
              <button className="btn btn-outline-success" onClick={handleCityClick}>Search</button>
            </div>
          </div>

          {/* Restaurant Search */}
          <div className="col-12 col-md-4">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search Restaurant" onChange={(e) => { setInputRestaurant(e.target.value); setErrorMsg("") }} value={inputRestaurant} />
              <button className="btn btn-outline-success" onClick={handleRestaurantClick}>Search</button>
            </div>
          </div>

        </div>

        {/* Error Message */}
        {errorMsg && (<div className="alert alert-danger alert-dismissible fade show" role="alert">{errorMsg}</div>)}

        {/* Restaurant Grid */}
        <div id="restaurant-container" className="row g-4 align-items-stretch">
          {filteredRestaurants.map((restaurant, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex" key={index}>
              <Restaurants restaurantsData={restaurant} />
            </div>
          ))}
        </div>

      </div>

    </main>

  );
};

export default Body;
