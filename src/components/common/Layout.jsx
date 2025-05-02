import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function HeaderLayout() {
  return (
    <div>
      <Header />
      {/* {children} */}
      {/* createBrowserRouter를 사용할 땐 children 대신 Outlet 컴포넌트를 사용합니다 */}
      <Outlet />
    </div>
  );
}
