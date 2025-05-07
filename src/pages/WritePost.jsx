import styled from "styled-components";
import TitleSection from "../components/WritePost/TitleSection";
import ContentSection from "../components/WritePost/ContentSection";
import WriteButton from "../components/WritePost/WriteButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ TODO
// 1. 로그인 가드 추가/ 로그인 안된 상태에서 접근시 로그인 페이지로 이동

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ✅ 일다 여기 토큰 네임 임시
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      await response.json();
      //console.log("Post created:", data);

      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (title && content) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title, content]);

  return (
    <WritePostContainer onSubmit={onSubmit}>
      <div>
        <TitleSection title={title} onChangeTitle={onChangeTitle} />
        <ContentSection content={content} onChangeContent={onChangeContent} />
        <WriteButton disabled={disabled} />
      </div>
    </WritePostContainer>
  );
}

const WritePostContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2.4rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
    width: 100%;
    max-width: 74.4rem;
    padding: 2rem;
  }
`;
