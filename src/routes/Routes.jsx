import FindTutorsCategory from "@/components/FindTutorsCategory";
import MainLayout from "@/layouts/MainLayout";
import Homepage from "@/pages/Homepage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import PrivateRoute from "./PrivateRoute";
import AddTutorials from "@/pages/AddTutorials";
import FindTutors from "@/pages/FindTutors";
import TutorDetails from "@/pages/TutorDetails";
import MyTutorials from "@/pages/MyTutorials";
import MyBookedTutors from "@/pages/MyBookedTutors";
import UpdateTutorial from "@/pages/UpdateTutorial";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/find-tutors",
        element: <FindTutors />,
      },
      {
        path: "/add-tutorials",
        element: (
          <PrivateRoute>
            <AddTutorials />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-tutorials",
        element: (
          <PrivateRoute>
            <MyTutorials />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-tutorial/:id",
        element: (
          <PrivateRoute>
            <UpdateTutorial />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-booked-tutors",
        element: (
          <PrivateRoute>
            <MyBookedTutors />
          </PrivateRoute>
        ),
      },
      {
        path: "/tutor/:details",
        element: (
          <PrivateRoute>
            <TutorDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/find-tutors/:category",
        element: <FindTutorsCategory />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
