import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !password) {
      alert("아이디와 비밀번호를 모두 입력하세요.");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: id,
            password,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("something went wrong");
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      } else {
        const result = await response.json();
        localStorage.setItem("accessToken", result.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h1>로그인</h1>
      <label htmlFor="id">
        <span>아이디</span>
        <input
          id="id"
          type="text"
          placeholder="아이디를 입력하세요"
          onChange={(e) => setId(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        <span>비밀번호</span>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
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
  max-width: 400px;
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

    span {
      font-size: 1.6rem;
      font-weight: 500;
      color: var(--text-secondary);
    }

    input {
      padding: 1.2rem;
      border-radius: 8px;
      border: 1px solid var(--line-secondary);
      background-color: transparent;
      font-size: 1.6rem;
      color: var(--text-primary);
    }
  }

  button {
    padding: 1.2rem;
    border-radius: 8px;
    border: none;
    background-color: var(--button-primary);
    color: #fff;
    font-size: 1.6rem;
    font-weight: bold;
    cursor: pointer;
  }
`;
