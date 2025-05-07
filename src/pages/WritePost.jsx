import styled from "styled-components";
import TitleSection from "../components/WritePost/TitleSection";
import ContentSection from "../components/WritePost/ContentSection";
import WriteButton from "../components/WritePost/WriteButton";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WriterSection from "../components/WritePost/WriterSection";

// ✅ TODO
// 1. author, password 추가

export default function WritePost() {
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const editingPostData = location.state?.post;

  // 수정하기 버튼으로 리디렉션 시 컴포넌트 마운트 시 전달된 state를 저장하는 기능 수행행
  useEffect(() => {
    if (editingPostData) {
      setAuthor(editingPostData.author);
      setTitle(editingPostData.title);
      setContent(editingPostData.content);
    }
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeAuthor = (e) => {
    setAuthor(e.target.value.trim());
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value.trim());
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
          author,
          password,
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
    if (title && content && author && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title, content, author, password]);

  return (
    <WritePostContainer onSubmit={onSubmit}>
      <WriterSection
        author={author}
        onChangeAuthor={onChangeAuthor}
        password={password}
        onChangePassword={onChangePassword}
      />
      <TitleSection title={title} onChangeTitle={onChangeTitle} />
      <ContentSection content={content} onChangeContent={onChangeContent} />
      <WriteButton disabled={disabled} />
      <WriteButton disabled={disabled} isEdit={editingPostData} />
    </WritePostContainer>
  );
}

const WritePostContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

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
