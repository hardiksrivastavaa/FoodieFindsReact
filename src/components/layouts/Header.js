import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../../utils/UserContext";

const Header = () => {

    const { city } = useParams();
    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        const navLinks = document.querySelectorAll(".nav-link");
        const bsCollapse = document.querySelector("#navbarNav");

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (bsCollapse.classList.contains("show")) {
                    // Collapse the navbar
                    new window.bootstrap.Collapse(bsCollapse, { toggle: true });
                }
            });
        });

        // Cleanup
        return () => {
            navLinks.forEach((link) => {
                link.removeEventListener("click", () => { });
            });
        };
    }, []);

    return (

        <header className="border-bottom shadow-sm">
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <p className="text-danger my-auto fs-1 fw-semibold mx-3">FoodieFinds</p>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to={city ? `/restaurants/${city}` : `/`}>Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/order">Order</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item mx-2 fw-bold">
                                <Link className="nav-link" to="/login">
                                    <i className="bi bi-person-fill me-2"></i>
                                    {loggedInUser}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    );
};

export default Header;
