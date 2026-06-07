import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Posts from "@/pages/Posts";
import Authors from "@/pages/Authors";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
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
        path: "authors",
        element: <Authors/>
      }
    ],
  },
]);
