import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatKoreanDate } from "../../utils/dateFormat";

export default function ListItem({
  postId,
  title,
  author,
  createdAt,
  totalComments,
  totalLike,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <ListItemWrapper onClick={handleClick}>
      <ListItemTitle>{}</ListItemTitle>
      <div className="info">
        <ListItemAuthor>{}</ListItemAuthor>
        <span>·</span>
        <ListItemDate>{formatKoreanDate()}</ListItemDate>
      </div>
      <div className="info">
        <ion-icon name="heart-outline" />
        <span>{}</span>
        <span>·</span>
        <ion-icon name="chatbubble-outline" />
        <span>{}</span>
      </div>
    </ListItemWrapper>
  );
}

const ListItemWrapper = styled.li`
  padding-block: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--background-secondary, #f8f9fa);
  }

  .info {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    align-self: stretch;
    color: var(--text-tertiary, #878a93);

    /* label/small */

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

  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: 0.0091rem;
`;
const ListItemAuthor = styled.div``;
const ListItemDate = styled.div``;
