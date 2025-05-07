import React from "react";
import styled from "styled-components";
import { getPostData } from "../../pages/PostDetail";

const LikeBtn = ({ data, handlePostData }) => {
  // 좋아요 API 호출 함수를 부모 컴포넌트에서 가져와서 캡슐화
  const handleLikeClick = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/likes/${data?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const newPostData = await getPostData();
      if (newPostData) {
        handlePostData(newPostData);
        alert("좋아요가 생성되었습니다.");
      }
    } catch (error) {
      console.error("Error fetching like API:", error);
      alert("좋아요 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <LikeButton onClick={handleLikeClick}>
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
  border: 1px solid var(--line-brand);
  background: none;
  color: var(--icon-brand);
  width: fit-content;
  cursor: pointer;
  & > span {
    color: var(--text-brand);
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 150%;
  }
`;

const StyledIcon = styled("ion-icon")`
  font-size: 1.6rem;
  cursor: pointer;
`;
