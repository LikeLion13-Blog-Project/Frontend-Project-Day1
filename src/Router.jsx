import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import WritePost from "./pages/WritePost";
import HeaderLayout from "./components/common/Layout";
import LoginGuard from "./components/common/LoginGuard";

const ProtectedWritePost = LoginGuard(WritePost);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderLayout />,
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
        element: <ProtectedWritePost />,
      },
    ],
  },
]);

export default router;
