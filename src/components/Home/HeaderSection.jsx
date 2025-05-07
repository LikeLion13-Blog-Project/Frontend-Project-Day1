import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function HeaderSection({ filter, onChangeFilter }) {
  const accessToken = localStorage.getItem("access_token");
  const isLogin = accessToken !== null;
  const [showOrders, setShowOrders] = useState(false);
  const navigate = useNavigate();

  const onClickOrder = () => {
    setShowOrders(!showOrders);
  };

  const onClickWriteButton = () => {
    // 로그인 검증 기능 추가하기
    navigate("/write");
  };

  return (
    <HeaderSectionWrapepr>
      <div>
        <div className="title">게시판</div>
        <div className="order" onClick={onClickOrder}>
          <span>{filter}</span>
          <CaretDownWrapper $showOrders={showOrders}>
            <ion-icon name="caret-down-outline" />
          </CaretDownWrapper>
          {showOrders && (
            <OrderList className="orders">
              <div
                className="order-item"
                onClick={() => {
                  onChangeFilter("최신순");
                  setShowOrders(false);
                }}
              >
                최신순
              </div>
              <div
                className="order-item"
                onClick={() => {
                  onChangeFilter("인기순");
                  setShowOrders(false);
                }}
              >
                인기순
              </div>
              <div
                className="order-item"
                onClick={() => {
                  onChangeFilter("댓글순");
                  setShowOrders(false);
                }}
              >
                댓글순
              </div>
            </OrderList>
          )}
        </div>
      </div>
      {isLogin && (
        <WriteButton onClick={onClickWriteButton}>글쓰기</WriteButton>
      )}
    </HeaderSectionWrapepr>
  );
}

const HeaderSectionWrapepr = styled.section`
  width: 100%;
  max-width: 74.4rem;
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    gap: 1.2rem;
    .title {
      color: var(--text-primary, #171719);
      font-family: Pretendard;
      font-size: 2rem;
      font-style: normal;
      font-weight: 700;
      line-height: 140%;
      letter-spacing: -0.024rem;
    }

    .order {
      position: relative;
      border-radius: 0.8rem;
      border: 1px solid var(--line-secondary, rgba(112, 115, 124, 0.16));
      display: flex;
      gap: 0.4rem;
      padding: 0.6rem;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`;

const OrderList = styled.div`
  width: 100%;
  position: absolute;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  left: 0;
  top: 100%;

  border-radius: 0.8rem;
  border: 1px solid var(--line-secondary, rgba(112, 115, 124, 0.16));
  background-color: white;
`;

const CaretDownWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(${({ $showOrders }) => ($showOrders ? "180deg" : "0deg")});
  transition: transform 0.2s ease;
`;

const WriteButton = styled.button`
  display: flex;
  padding: 0.7rem 1.4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--text-brand-invert, #fff);

  /* label/medium-bold */
  font-family: Pretendard;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 142.9%; /* 2.0006rem */
  letter-spacing: 0.0203rem;

  border: none;
  cursor: pointer;
  border-radius: 0.8rem;
  background: var(--button-primary, #06f);
`;
