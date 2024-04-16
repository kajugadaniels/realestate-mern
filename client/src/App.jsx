import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, ListPage, Login, ProfilePage, Register, SinglePage } from './routes'
import { Layout, RequireAuth } from "./routes/Layout/Layout";

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
          element:<SinglePage />
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
      ],
    },
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;