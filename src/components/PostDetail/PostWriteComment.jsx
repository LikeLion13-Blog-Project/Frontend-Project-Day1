import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PostWriteComment = ({ commentList, onCommentPosted }) => {
  const { postId } = useParams();

  const [disabled, setDisabled] = useState(true);
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  const postComment = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            author,
            password,
            content,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "댓글 등록에 실패했습니다.");
      }

      setAuthor("");
      setPassword("");
      setContent("");
      // alert("댓글이 등록되었습니다!");
    } catch (error) {
      console.error("Error creating comment:", error);
      alert(error.message);
    } finally {
      onCommentPosted();
    }
  };

  useEffect(() => {
    if (content.length > 0 && author.length && password.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [author, password, content]);

  return (
    <WriteWrapper>
      <h1>댓글 {commentList?.length ?? 0}</h1>
      <AuthorPassword>
        <input
          type="text"
          id="author"
          placeholder="작성자"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </AuthorPassword>
      <Textarea
        placeholder="댓글을 남겨주세요"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <WriteFooter $disabled={disabled}>
        <button disabled={disabled} onClick={postComment}>
          댓글 남기기
        </button>
      </WriteFooter>
    </WriteWrapper>
  );
};

export default PostWriteComment;

const WriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  > h1 {
    color: var(--text-tertiary);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 142.9%; /* 20.006px */
    letter-spacing: 0.203px;
  }
`;

const AuthorPassword = styled.div`
  display: flex;
  gap: 1rem;

  input {
    width: 30%;
    height: 3.2rem;
    padding: 0.8rem;
    border-radius: 1rem;
    border: 1px solid var(--line-primary);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 7rem;
  padding: 1.2rem 1.6rem;
  border-radius: 1rem;
  border: 1px solid var(--line-primary);
  resize: none;
`;

const WriteFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  > button {
    display: flex;
    padding: 7px 14px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: ${({ $disabled }) =>
      $disabled ? "var(--button-disable)" : "var(--button-primary)"};
    border: none;
    transition: all 0.2s ease-in-out;
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

    //text
    color: ${({ $disabled }) =>
      $disabled ? "var(--icon-quaternary)" : "var(--text-brand-invert)"};
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 142.9%; /* 20.006px */
    letter-spacing: 0.203px;
  }
`;
