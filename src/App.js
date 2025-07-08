import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";

import AboutUs from "./components/pages/About";
import ContactUs from "./components/pages/Contact";
import Error from "./components/layouts/Error";
import Body from "./components/features/Body";
import Restaurant from "./components/features/RestaurantCard";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

// Lazy loading the Order component to improve performance
const Order = lazy(() => import("./components/pages/Order"));
// This will split the code into separate chunks, loading Order only when needed

const AppLayout = () => (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
);

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
                element: <Body />,
            },
            {
                path: "/restaurants/:city/:restaurant",
                element: <Restaurant />,
            },
            {
                path: "/order",
                element: (
                    <Suspense fallback={<h1>Loading........</h1>}>
                        <Order />
                    </Suspense>
                ),
            },
            {
                path: "/about",
                element: <AboutUs />,
            },
            {
                path: "/contact",
                element: <ContactUs />,
            },
        ],
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
