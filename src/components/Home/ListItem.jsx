import React from "react";
import styled from "styled-components";
import Likes from "../../../assets/icons/Home/heart.svg?react";
import ChatBubble from "../../../assets/icons/Home/chatbubble.svg?react";

export default function ListItem({
  title,
  author,
  createdAt,
  totalLikes,
  totalComments,
}) {
  return (
    <ListItemWrapper>
      <ListItemTitle>{title}</ListItemTitle>
      <div className="info">
        <ListItemAuthor>{author}</ListItemAuthor>
        <span>·</span>
        <ListItemDate>{createdAt}</ListItemDate>
      </div>
      <div className="info">
        <Likes />
        <span>{totalLikes}</span>
        <span>·</span>
        <ChatBubble />
        <span>{totalComments}</span>
      </div>
    </ListItemWrapper>
  );
}

const ListItemWrapper = styled.li`
  padding-block: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  .info {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    align-self: stretch;

    color: var(--text-tertiary, #878a93);

    /* label/small */
    font-family: Pretendard;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 500;
    line-height: 138.5%; /* 1.8005rem */
    letter-spacing: 0.0252rem;
  }
`;
const ListItemTitle = styled.div`
  overflow: hidden;
  color: var(--text-primary, #171719);
  text-overflow: ellipsis;

  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: 0.0091rem;
`;
const ListItemAuthor = styled.div``;
const ListItemDate = styled.div``;
const ListItemLike = styled.div`
  display: flex;
  align-items: center;
`;
const ListItemComment = styled.div`
  display: flex;
  align-items: center;
`;
