import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import OurServices from "../pages/ourServices/OurServices";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Appointment from "../pages/appointment/Appointment";
import ShortProfile from "../pages/profile/ShortProfile";
import Login from "../pages/authentication/Login";
import Registration from "../pages/authentication/Registration";
import PrivetRoute from "./PrivetRoute";
import Dashboard from "../layout/Dashboard";
import MyAppointment from "../pages/dashboard/MyAppointment";
import AllUser from "../pages/dashboard/AllUser";
import ManageAppointment from "../pages/dashboard/ManageAppointment";
import AddProvider from "../pages/dashboard/AddProvider";
import ManageProviders from "../pages/dashboard/ManageProviders";
import AdminRoute from "./AdminRoute";
import FullProfile from "../pages/profile/FullProfile";
import ManageReviews from "../pages/dashboard/ManageReviews";
import Checkout from "../pages/dashboard/Checkout";
import Success from "../pages/payment/Success";
import Cancel from "../pages/payment/Cancel";
import MyServices from "../pages/dashboard/MyServices";
import AdminProfile from "../pages/dashboard/profile/AdminProfile";
import ProviderProfile from "../pages/dashboard/profile/ProviderProfile";
import UserProfile from "../pages/dashboard/profile/UserProfile";
import AssignProvider from "../components/AssignProvider";
import Room from "../pages/dashboard/Room";
import AppointmentHistory from "../pages/dashboard/AppointmentHistory";
import MyReviews from "../pages/dashboard/MyReviews";
import ErrorPage from "../pages/shared/errorPage/ErrorPage";
import Blogs from "../pages/blogs/Blogs";
import BlogDetails from "../pages/blogs/BlogDetails";
import MyBlogs from "../pages/blogs/MyBlogs";
import WriteBlogs from "../pages/blogs/WriteBlogs";
import ProviderRout from "./ProviderRoute";
import MyBlogDetails from "../pages/blogs/MyBlogDetails";
import MyAppointmentHistory from "../pages/dashboard/MyAppointmentHistory";
import UserContact from "../pages/dashboard/contacts/UserContact";
import ManageContact from "../pages/dashboard/contacts/ManageContact";
import UpdateProviderProfile from "../pages/dashboard/profile/UpdateProviderProfile";
import CompleteAppointmentHistory from "../pages/dashboard/CompleteAppointmentHistory";
import AddCategory from "../pages/dashboard/AddCategory";
import TermsOfUse from "../pages/legal/TermsOfUse";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import CookiePolicy from "../pages/legal/CookiePolicy";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ourServices",
        element: <OurServices />,
      },
      {
        path: "/ourServices/:category",
        element: <OurServices />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: (
          <PrivetRoute>
            <Contact />
          </PrivetRoute>
        ),
      },
      {
        path: "/appointment",
        element: (
          <PrivetRoute>
            <Appointment />
          </PrivetRoute>
        ),
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blog/:_id",
        element: <BlogDetails />,
      },
      {
        path: "/shortProfile/:_id",
        element: <ShortProfile />,
      },
      {
        path: "/fullProfile/:_id",
        element: <FullProfile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/fail",
        element: <Cancel />,
      },
      {
        path: "/room/:roomId",
        element: <Room />,
      },
      {
        path: "/terms",
        element: <TermsOfUse />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/cookies",
        element: <CookiePolicy />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <Dashboard />
      </PrivetRoute>
    ),
    children: [
      {
        path: "myAppointment",
        element: <MyAppointment />,
      },
      {
        path: "appointmentHistory",
        element: <AppointmentHistory />,
      },
      {
        path: "reviews",
        element: <MyReviews />,
      },
      {
        path: "userProfile",
        element: (
          <PrivetRoute>
            <UserProfile />
          </PrivetRoute>
        ),
      },
      {
        path: "userContact",
        element: (
          <PrivetRoute>
            <UserContact />
          </PrivetRoute>
        ),
      },
      // provider routs
      {
        path: "providerHome",
        element: (
          <ProviderRout>
            <ProviderProfile />
          </ProviderRout>
        ),
      },
      {
        path: "updateProviderProfile/:email",
        element: (
          <ProviderRout>
            <UpdateProviderProfile />
          </ProviderRout>
        ),
      },

      {
        path: "myServices",
        element: (
          <ProviderRout>
            <MyServices />
          </ProviderRout>
        ),
      },
      {
        path: "myAppointmentHistory",
        element: (
          <ProviderRout>
            <MyAppointmentHistory />
          </ProviderRout>
        ),
      },
      {
        path: "myBlogs",
        element: (
          <ProviderRout>
            <MyBlogs />
          </ProviderRout>
        ),
      },
      {
        path: "myBlogDetails/:_id",
        element: (
          <ProviderRout>
            <MyBlogDetails />
          </ProviderRout>
        ),
      },
      {
        path: "writeBlogs",
        element: (
          <ProviderRout>
            <WriteBlogs />
          </ProviderRout>
        ),
      },

      // admin routs
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },
      {
        path: "assignProvider/:_id",
        element: (
          <AdminRoute>
            <AssignProvider />
          </AdminRoute>
        ),
      },
      {
        path: "manageProviders",
        element: (
          <AdminRoute>
            <ManageProviders />
          </AdminRoute>
        ),
      },
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },

      {
        path: "addProviders",
        element: (
          <AdminRoute>
            <AddProvider />
          </AdminRoute>
        ),
      },
      {
        path: "addCategory",
        element: (
          <AdminRoute>
            <AddCategory />
          </AdminRoute>
        ),
      },
      {
        path: "manageAppointments",
        element: (
          <AdminRoute>
            <ManageAppointment />
          </AdminRoute>
        ),
      },
      {
        path: "completeAppointmentHistory",
        element: (
          <AdminRoute>
            <CompleteAppointmentHistory />
          </AdminRoute>
        ),
      },
      {
        path: "manageContact",
        element: (
          <AdminRoute>
            <ManageContact />
          </AdminRoute>
        ),
      },
      {
        path: "manageReviews",
        element: (
          <AdminRoute>
            <ManageReviews />
          </AdminRoute>
        ),
      },
    ],
  },
]);
