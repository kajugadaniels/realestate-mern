import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, ListPage, Login, NewPostPage, ProfilePage, ProfileUpdatePage, Register, SinglePage } from './routes'
import { Layout, RequireAuth } from "./routes/Layout/Layout";
import { singlePageLoader } from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage />
        },
        {
          path:"/list",
          element:<ListPage />
        },
        {
          path:"/:id",
          element:<SinglePage />,
          loader: singlePageLoader,
        },
        {
          path:"/login",
          element:<Login />
        },
        {
          path:"/register",
          element:<Register />
        }
      ]
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path:"/profile",
          element:<ProfilePage />
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage />
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;