import { useEffect, useState } from "react";
import styled from "styled-components";

export default function LoginButton({ isLogin }) {
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      console.log("로그인");
    } else {
      console.log("안로그인");
    }
  }, []);
  return <>{isLogin ? <Button>로그아웃</Button> : <Button>로그인</Button>}</>;
}

const Button = styled.button`
  display: flex;
  padding: 7px 14px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--line-secondary);
  background-color: transparent;
  cursor: pointer;

  //Text
  color: var(--text-brand);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 142.9%; /* 20.006px */
  letter-spacing: 0.203px;
`;
