import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import AboutUs from "./components/pages/About";
import Error from "./components/layouts/Error";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Loading from "./components/layouts/Loading";
import User from "./components/pages/User";
import UserContext from "../utils/UserContext";
import appStore from "../utils/AppStore";

// Lazy loading the Cart component to improve performance
const Cart = lazy(() => import("./components/pages/Cart"));
const Contact = lazy(() => import("./components/pages/Contact"));
const Body = lazy(() => import("./components/features/Body"));
const Restaurant = lazy(() => import("./components/features/RestaurantCard"));
// This will split the code into separate chunks, loading Cart only when needed

const AppLayout = () => {
    const [userName, setUserName] = useState();

    useEffect(() => {
        const data = {
            name: "Hardik Srivastava",
        };
        setUserName(data.name);
    }, []);

    return (
        <>
            {/* <Provider store={appStore}> */}
            <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
                <Header />
                <Outlet />
                <Footer />
            </UserContext.Provider>
            {/* </Provider> */}
        </>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/restaurants/lucknow" />,
            },
            {
                path: "/restaurants/:city",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Body />
                    </Suspense>
                ),
            },
            {
                path: "/restaurants/:city/:restaurant",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Restaurant />
                    </Suspense>
                ),
            },
            {
                path: "/cart",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Cart />
                    </Suspense>
                ),
            },
            {
                path: "/about",
                element: <AboutUs />,
            },
            {
                path: "/contact",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Contact />
                    </Suspense>
                ),
            },
            {
                path: "/login",
                element: <User />,
            },
        ],
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
