import styled from "styled-components";
import Logo from "../../../public/Logo.svg?react";
import LoginButton from "./LoginButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {}, []);
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo onClick={() => navigate("/")} />
        <LoginButton isLogin={isLogin} />
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 74.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.6rem 1.2rem 2rem;

  > svg {
    cursor: pointer;
  }
`;
