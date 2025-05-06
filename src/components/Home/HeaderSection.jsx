import React, { useState } from "react";
import styled from "styled-components";
import CaretDown from "../../../assets/icons/Home/caret-down.svg?react";

export default function HeaderSection({ filter, onChangeFilter }) {
  const [showOrders, setShowOrders] = useState(false);

  const onClickOrder = () => {
    setShowOrders(!showOrders);
  };

  return (
    <HeaderSectionWrapepr>
      <div className="title">게시판</div>
      <div className="order" onClick={onClickOrder}>
        <span>{filter}</span> <StyledCaretDown $showOrders={showOrders} />
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
    </HeaderSectionWrapepr>
  );
}

const HeaderSectionWrapepr = styled.section`
  width: 100%;
  max-width: 74.4rem;
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

const StyledCaretDown = styled(CaretDown)`
  transform: rotate(${({ $showOrders }) => ($showOrders ? "180deg" : "0deg")});
  transition: transform 0.2s ease;
`;
