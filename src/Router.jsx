import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import WritePost from "./pages/WritePost";
import HeaderLayout from "./components/common/Layout";
import LoginGuard from "./components/common/LoginGuard";
import Login from "./pages/Login";

const ProtectedWritePost = LoginGuard(WritePost);
const ProtectedPostDetail = LoginGuard(PostDetail);

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
        element: <ProtectedPostDetail />,
      },
      {
        path: "write",
        element: <ProtectedWritePost />,
      },
    ],
  },
]);

export default router;
