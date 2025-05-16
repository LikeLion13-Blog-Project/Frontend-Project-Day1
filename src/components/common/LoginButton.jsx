import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export default function LoginButton() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // 로그인 상태 확인하는 상황들
    //1. 첫 렌더링
    //2. pathname, 즉 페이지 이동할때마다
    //3. 로그아웃 버튼을 클릭 -> 로그인 상태 변경 시
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다.");
    setIsLogin(false);
  };

  if (pathname === "/login" || pathname === "/write") {
    // 로그인 페이지나 글쓰기 페이지에서는 버튼을 보여주지 않음
    return null;
  }

  return (
    <>
      {isLogin ? (
        <Button onClick={() => handleLogout()}>로그아웃</Button>
      ) : (
        <Button onClick={() => navigate("/login")}>로그인</Button>
      )}
    </>
  );
}

const Button = styled.button`
  display: flex;
  padding: 0.7rem 1.4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  border: 0.1rem solid var(--line-secondary);
  background-color: transparent;
  cursor: pointer;

  //Text
  color: var(--text-brand);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.429; /* 2rem */
  letter-spacing: 0.0203rem;

  &:hover {
    background-color: var(--background-secondary);
  }
`;
