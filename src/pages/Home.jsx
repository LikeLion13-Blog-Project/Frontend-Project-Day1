import styled from "styled-components";
import HeaderSection from "../components/Home/HeaderSection";
import ListSection from "../components/Home/ListSection";

export default function Home() {
  return (
    <HomeContainer>
      <div>
        <HeaderSection />
        <ListSection />
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
