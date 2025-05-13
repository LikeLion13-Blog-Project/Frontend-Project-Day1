import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginGuard = (_WrappedComponent) => {
  const WrappedComponent = _WrappedComponent;
  return function Guard(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login", { replace: true });
      }
    }, []);

    const token = localStorage.getItem("access_token");
    if (!token) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default LoginGuard;
