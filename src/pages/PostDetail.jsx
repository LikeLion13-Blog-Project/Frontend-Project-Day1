import styled from "styled-components";
import PostContent from "../components/PostDetail/PostContent";
import PostWriteComment from "../components/PostDetail/PostWriteComment";
import PostCommentList from "../components/PostDetail/PostCommentList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// 가독성 + 함수 재활용을 위해 컴포넌트 밖으로 빼줌
export const getPostData = async (postId) => {
  console.log(localStorage.getItem("accessToken"));

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/articles/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("something went wrong");
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching article data:", error);
    return null;
  }
};

export default function PostDetail() {
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const newPostData = await getPostData(postId);
      if (newPostData) {
        setPostData(newPostData);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handlePostData = (newPostData) => {
    setPostData(newPostData);
  };

  // 코멘트 업데이트 위해 콜백 함수를 정의했습니다
  const refreshPostData = async () => {
    const updated = await getPostData(postId);
    if (updated) {
      setPostData(updated);
    }
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <PostDetailWrapper>
      <PostContent data={postData} handlePostData={handlePostData} />
      <PostWriteComment
        onCommentPosted={refreshPostData}
        commentList={postData?.comments}
      />
      <PostCommentList
        onCommentPosted={refreshPostData}
        commentList={postData?.comments}
      />
    </PostDetailWrapper>
  );
}

const PostDetailWrapper = styled.section`
  max-width: 74.4rem;
  min-width: 37.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2.4rem;
`;
