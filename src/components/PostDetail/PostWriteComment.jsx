import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PostWriteComment = ({ commentList }) => {
  const { postId } = useParams();

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
      if (!response.ok) {
        throw new Error("댓글 작성 실패");
      }

      // 성공 처리 예시: 입력 초기화
      setAuthor("");
      setPassword("");
      setContent("");
      alert("댓글이 등록되었습니다!");
    } catch (error) {
      console.error("Error creating comment:", error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <h1>댓글 {commentList?.length ?? 0}</h1>
      <div>
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
        <textarea
          placeholder="댓글을 남겨주세요"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={postComment}>댓글 남기기</button>
      </div>
    </Wrapper>
  );
};

export default PostWriteComment;

const Wrapper = styled.div`
  /* 스타일은 필요에 따라 추가 */
`;
