import React from "react";
import styled from "styled-components";

const LikeBtn = ({ data, handleLikeClick }) => {
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
`;
