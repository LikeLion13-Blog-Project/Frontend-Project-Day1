import styled from "styled-components";
import PostContent from "../components/PostDetail/PostContent";
import PostWriteComment from "../components/PostDetail/PostWriteComment";
import PostCommentList from "../components/PostDetail/PostCommentList";
import mockData from "../components/PostDetail/mockData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// 가독성 + 함수 재활용을 위해 컴포넌트 밖으로 빼줌
const getPostData = async (postId) => {
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
    console.log(data);

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

  const handleLikeClick = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/likes/${postData?.id}`,
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
        setPostData(newPostData);
        alert("좋아요가 생성되었습니다.");
      }
    } catch (error) {
      console.error("Error fetching like API:", error);
      alert("좋아요 생성 중 오류가 발생했습니다.");
    }
  };

  // 코멘트 업데이트 위해 콜백 함수를 정의했습니다
  const refreshPostData = async () => {
    const updated = await getPostData(postId);
    if (updated) {
      setPostData(updated);
    }
  };

  return (
    <PostDetailWrapper>
      <PostContent data={postData} handleLikeClick={handleLikeClick} />
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
