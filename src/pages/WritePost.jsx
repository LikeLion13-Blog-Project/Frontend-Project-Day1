import styled from "styled-components";
import TitleSection from "../components/WritePost/TitleSection";
import ContentSection from "../components/WritePost/ContentSection";
import WriteButton from "../components/WritePost/WriteButton";
import { useEffect, useState } from "react";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState(true);

  const onChangeTitle = (e) => {
    setTitle(e.target.value.trim());
  };

  const onChangeContent = (e) => {
    setContent(e.target.value.trim());
  };

  const onSubmit = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Post created:", data);
        setTitle("");
        setContent("");
        // ✅ 여기서 redirect를 해줘야 함
        // 글 리스트로 이동
        // 뒤로 가기 막기
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
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
      <WriteButton disabled={disabled} />
    </WritePostContainer>
  );
}

const WritePostContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2.4rem;
`;
