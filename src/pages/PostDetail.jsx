import styled from "styled-components";
import PostContent from "../components/PostDetail/PostContent";
import PostWriteComment from "../components/PostDetail/PostWriteComment";
import PostCommentList from "../components/PostDetail/PostCommentList";
import mockData from "../components/PostDetail/mockData";

export default function PostDetail() {
  return (
    <PostDetailWrapper>
      <PostContent data={mockData.data} />
      <PostWriteComment />
      <PostCommentList />
    </PostDetailWrapper>
  );
}

const PostDetailWrapper = styled.section`
  width: 74.4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2.4rem;
`;
