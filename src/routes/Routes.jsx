import Home from "../pages/Home/Home";
import AboutUs from "../pages/Home/AboutUs";
import ContactUs from "../pages/Home/ContactUs";
import AllTickets from "../pages/AllTickets/AllTickets";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddTicket from "../pages/Dashboard/Seller/AddTicket";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageTickets from "../pages/Dashboard/Admin/ManageTickets";
import AdvertiseTickets from "../pages/Dashboard/Admin/AdvertiseTickets";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyInventory from "../pages/Dashboard/Seller/MyInventory";
import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import { createBrowserRouter } from "react-router";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import SellerRequests from "../pages/Dashboard/Admin/SellerRequests";
import SellerRoute from "./SellerRoute";
import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/all-tickets",
        element: (
          <PrivateRoute>
            <AllTickets />
          </PrivateRoute>
        ),
      },
      {
        path: "/ticket/:id",
        element: <TicketDetails />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-ticket",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <AddTicket />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <MyInventory />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-tickets",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageTickets />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "advertise-tickets",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdvertiseTickets />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "seller-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SellerRequests></SellerRequests>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <CustomerRoute>
              <MyOrders />
            </CustomerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <ManageOrders />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
