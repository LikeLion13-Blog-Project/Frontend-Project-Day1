import React from "react";
import styled from "styled-components";

const PasswordInputModal = () => {
  return (
    <ModalContainer>
      <Information />
    </ModalContainer>
  );
};

export default PasswordInputModal;

const ModalContainer = styled.div`
  width: 32rem;
  display: flex;
  flex-direction: column;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 2rem;
  &:first-child {
    color: var(--text-primary);
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 150%;
  }
  &:last-child {
    color: var(--text-tertiary);
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 150%;
  }
`;
