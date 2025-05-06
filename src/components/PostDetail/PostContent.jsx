import React from "react";
import styled from "styled-components";

const PostContent = () => {
  return (
    <PostContentWrapper>
      <PostTitle>오늘 날씨는 18도래요 덥겠다</PostTitle>
    </PostContentWrapper>
  );
};

export default PostContent;

const PostContentWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const PostHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const PostTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--text-primary);
`;
