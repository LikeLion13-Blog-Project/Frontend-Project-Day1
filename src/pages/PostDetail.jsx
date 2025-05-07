import styled from "styled-components";
import PostContent from "../components/PostDetail/PostContent";
import PostWriteComment from "../components/PostDetail/PostWriteComment";
import PostCommentList from "../components/PostDetail/PostCommentList";
import mockData from "../components/PostDetail/mockData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// 가독성 + 함수 재활용을 위해 컴포넌트 밖으로 빼줌
export const getPostData = async (postId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/articles/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("something went wrong");
    }
    const data = await response.json();
    // console.log(data);

    return data.data;
  } catch (error) {
    console.error("Error fetching article data:", error);
    return null;
  }
};

export default function PostDetail() {
  // API 연동 후 빈 배열로 바꾸자자
  const [postData, setPostData] = useState(mockData.data);
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const newPostData = await getPostData(postId);
      if (newPostData) {
        setPostData(newPostData);
      }
    };
    fetchData();
  }, []);

  const handlePostData = (data) => {
    setPostData(data);
  };

  return (
    <PostDetailWrapper>
      <PostContent data={postData} handlePostData={handlePostData} />
      <PostWriteComment commentList={postData?.comments} />
      <PostCommentList commentList={postData?.comments} />
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
