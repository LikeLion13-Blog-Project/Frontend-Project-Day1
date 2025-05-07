import styled from "styled-components";
import HeaderSection from "../components/Home/HeaderSection";
import ListSection from "../components/Home/ListSection";
import { useEffect, useState } from "react";

// ✅ TODO
// 1. return 내부 에 있는 mockPosts를 API로 받아온 posts로 변경하기
// 2. API에서 받아온 posts의 createdAt을 formatKoreanDate로 변환하기
// 3. 게시물 클릭하면 해당 게시물로 directing하기 (id 포함해서)

export default function Home() {
  const [filter, setFilter] = useState("최신순");
  const [posts, setPosts] = useState([]);

  const onChangeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  // API에서 게시물 목록을 가져오는 함수
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/articles`
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

  // 필터링된 게시물 정렬
  // 최신순, 인기순, 댓글순에 따라 정렬된 게시물 목록을 posts에 저장
  useEffect(() => {
    const sortedPosts = [...posts].sort((a, b) => {
      if (filter === "최신순") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (filter === "인기순") {
        return b.totalLikes - a.totalLikes;
      } else if (filter === "댓글순") {
        return b.totalComments - a.totalComments;
      }
      return 0;
    });
    setPosts(sortedPosts);
  }, [filter]);

  return (
    <HomeContainer>
      <div>
        <HeaderSection filter={filter} onChangeFilter={onChangeFilter} />
        <ListSection posts={posts} />
      </div>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    padding: 2rem;
    width: 100%;
    max-width: 74.4rem;
  }
`;
