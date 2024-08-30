import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Main from "../pages/main/Main.tsx";
import Profile from "../pages/profile/Profile.tsx";
import Auth from "../pages/auth/Auth.tsx";
import Layout from "../Layout.tsx";
import Chat from "../pages/Chat/Chat.tsx";
import MessagePage from "../pages/Chat/MessagePage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Main/>,
            },
            {
                path: "/auth",
                element: <Auth/>,
                // errorElement: <NotFoud />,
            },
            {
                path: "/profile/:username",
                element: <Profile/>,
                // errorElement: <NotFoud />,
            },
            {
                path: "/chat",
                element: <Chat />,
            },
            {
                path: "/chat/:userId",
                element: <MessagePage />
            }
        ],
    },
]);

export const MainRouterProvider = () => <RouterProvider router={router}/>;
