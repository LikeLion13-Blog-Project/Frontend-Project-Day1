import styled from "styled-components";
import HeaderSection from "../components/Home/HeaderSection";
import ListSection from "../components/Home/ListSection";
import { useEffect, useMemo, useState } from "react";

// ✅ TODO
// 1. return 내부 에 있는 mockPosts를 API로 받아온 posts로 변경하기
// 2. API에서 받아온 posts의 createdAt을 formatKoreanDate로 변환하기
// 3. 게시물 클릭하면 해당 게시물로 directing하기 (id 포함해서)
// 4. 글쓰기 버튼 로그인 확인 로직 보강 필요

export default function Home() {
  const [filter, setFilter] = useState("최신순");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // useEffect를 사용하여 컴포넌트가 마운트될 때 API 호출
    async function fetchPosts() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/articles`,
          {
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        setPosts(data.data.reverse());
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  const onChangeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  // 필터링된 게시물 정렬
  // 최신순, 인기순, 댓글순에 따라 정렬된 게시물 목록을 posts에 저장
  // ⭐️ useEffect를 사용했더니 새로고침하면 정렬이 안되서 useMemo로 변경했습니다
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (filter === "최신순") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (filter === "인기순") {
        return b.totalLike - a.totalLike;
      } else if (filter === "댓글순") {
        return b.totalComments - a.totalComments;
      }
      return 0;
    });
  }, [filter, posts]);

  return (
    <HomeContainer>
      <div>
        <HeaderSection filter={filter} onChangeFilter={onChangeFilter} />
        <ListSection posts={sortedPosts} />
      </div>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    width: 100%;
    max-width: 74.4rem;
    display: flex;
    gap: 0.8rem;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }
`;
