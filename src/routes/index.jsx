import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Posts from "@/pages/Posts";
import Authors from "@/pages/Authors";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Error from "../pages/Error";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // public routes
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "posts",
        element: <Posts/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "error",
        element: <Error/>
      },
      //protected routes
      {
        element: <ProtectedRoute/>,
        children: [
          {
            path: "profile",
            element: <Profile/>
          }
        ]
      },

      {
        element: <ProtectedRoute allowedRoles={["admin"]}/>,
        children: [{
          path: "authors",
          element: <Authors/>
        }]
      },
    ],
  },
]);
