import React from "react";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MyApp from "./MyApp";
import About from "./about";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyApp />,
  },
  {
    path: "about",
    element: <About />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
