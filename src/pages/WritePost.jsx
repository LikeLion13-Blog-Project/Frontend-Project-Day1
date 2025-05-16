import styled from "styled-components";
import TitleSection from "../components/WritePost/TitleSection";
import ContentSection from "../components/WritePost/ContentSection";
import WriteButton from "../components/WritePost/WriteButton";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function WritePost() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingPostData = location.state?.post;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 수정하기 버튼으로 리디렉션 시 컴포넌트 마운트 시 전달된 state를 저장하는 기능 수행행
  useEffect(() => {
    if (editingPostData) {
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

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/articles${
          editingPostData ? `/${editingPostData.id}` : ""
        }`,
        {
          method: editingPostData ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      const parsedData = await response.json();

      if (!response.ok) {
        throw new Error(parsedData.message || "something went wrong");
      }

      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      alert(error.message);
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
      <TitleSection title={title} onChangeTitle={onChangeTitle} />
      <ContentSection content={content} onChangeContent={onChangeContent} />
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
