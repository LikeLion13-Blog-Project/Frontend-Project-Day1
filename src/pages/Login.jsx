import { useState } from "react";

import styled from "styled-components";

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    // ✅ submit 시 리로드되는 것을 방지하기 위해 preventDefault를 사용해준다.
    e.preventDefault();

    // ✅ 아이디나 비밀번호가 비어있으면 제출을 막아야 한다.

    // ✅ response 변수를 완성하고 로그인 API를 사용해 봅시다.
    try {
      const response = [];

      if (!response.ok) {
        // ✅ 로그인 실패 시 아이디 또는 비밀번호가 잘못되었다는 경고창을 띄워봅시다.

        throw new Error("something went wrong");
      }

      // ✅ 로그인 성공 시, accessToken을 localStorage에 저장하고 메인 페이지로 이동
      const result = await response.json();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <LoginForm>
      <h1>로그인</h1>
      <label htmlFor="id">
        <span>아이디</span>
        <input id="id" type="text" placeholder="아이디를 입력하세요" />
      </label>
      <label htmlFor="password">
        <span>비밀번호</span>
        <input
          id="password"
          type={isPasswordVisible ? "text" : "password"}
          placeholder="비밀번호를 입력하세요"
        />
        <StyledIcon
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
        />
      </label>
      <button type="submit">로그인</button>
    </LoginForm>
  );
}

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--text-primary);
    text-align: center;
    margin-bottom: 2.4rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    position: relative;
    span {
      font-size: 1.6rem;
      font-weight: 500;
      color: var(--text-secondary);
    }

    input {
      padding: 1.2rem;
      border-radius: 0.8rem;
      border: 1px solid var(--line-secondary);
      background-color: transparent;
      font-size: 1.6rem;
      color: var(--text-primary);
    }
  }

  button {
    padding: 1.2rem;
    border-radius: 0.8rem;
    border: none;
    background-color: var(--button-primary);
    color: #fff;
    font-size: 1.6rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

const StyledIcon = styled("ion-icon")`
  font-size: 2rem;
  color: var(--icon-tertiary);
  cursor: pointer;
  position: absolute;
  right: 1.6rem;
  top: 50%;
`;
