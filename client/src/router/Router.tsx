import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main/Main.tsx";
import Profile from "../pages/Profile/Profile.tsx";
import NotFoud from "../pages/NotFound/NotFoud.tsx";
import Auth from "../pages/Auth/Auth.tsx";
import Layout from "../Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoud />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/profile/:profileId",
        element: <Profile />,
        errorElement: <NotFoud />,
      },
      {
        path: "/auth",
        element: <Auth />,
        errorElement: <NotFoud />,
      },
    ],
  },
]);

export const MainRouterProvider = () => <RouterProvider router={router} />;
