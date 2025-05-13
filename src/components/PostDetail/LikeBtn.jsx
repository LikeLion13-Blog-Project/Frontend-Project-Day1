import React, { useState } from "react";
import styled from "styled-components";
import { getPostData } from "../../pages/PostDetail";

const LikeBtn = ({ data, handlePostData }) => {
  const [isLiked, setIsLiked] = useState(false);
  // 좋아요 API 호출 함수를 부모 컴포넌트에서 가져와서 캡슐화
  const handleLikeClick = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/likes/${data?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const parsedData = await response.json();
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const newPostData = await getPostData(data?.id);
      if (newPostData) {
        handlePostData(newPostData);
      }
      if (parsedData.message === "좋아요 생성 성공") {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error fetching like API:", error);
      alert("좋아요 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <LikeButton onClick={handleLikeClick} isLiked={isLiked}>
      <StyledIcon name="heart-outline" />
      <span>좋아요</span>
      <span> {data?.totalLike}</span>
    </LikeButton>
  );
};

export default LikeBtn;

const LikeButton = styled.button`
  display: flex;
  padding: 0.7rem 1.4rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.isLiked ? "var(--line-brand)" : "var(--line-primary)")};
  background: none;
  color: ${(props) =>
    props.isLiked ? "var(--icon-brand)" : "var(--icon-tertiary)"};
  width: fit-content;
  cursor: pointer;
  & > span {
    color: ${(props) =>
      props.isLiked ? "var(--text-brand)" : "var(--text-tertiary)"};
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 150%;
  }
`;

const StyledIcon = styled("ion-icon")`
  font-size: 1.6rem;
  cursor: pointer;
`;
