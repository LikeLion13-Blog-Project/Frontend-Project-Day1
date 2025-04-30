import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import WritePost from "./pages/WritePost";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "post/:postId",
        element: <PostDetail />,
      },
      {
        path: "write",
        element: <WritePost />,
      },
    ],
  },
]);

export default router;
