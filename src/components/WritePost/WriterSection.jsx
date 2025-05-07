import React from "react";
import styled from "styled-components";

export default function WriterSection({
  author,
  onChangeAuthor,
  password,
  onChangePassword,
}) {
  return (
    <WriterSectionWrapper>
      <div>
        <label htmlFor="writerInput">작성자</label>
        <input
          id="writerInput"
          placeholder="작성자 입력"
          value={author}
          onChange={onChangeAuthor}
        />
      </div>
      <div>
        <label htmlFor="passwordInput">비밀번호</label>
        <input
          id="passwordInput"
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={onChangePassword}
        />
      </div>
    </WriterSectionWrapper>
  );
}

const WriterSectionWrapper = styled.section`
  display: flex;
  gap: 0.8rem;
  width: 100%;
  max-width: 74.4rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;

    > label {
      color: var(--text-tertiary, #878a93);

      /* label/medium-bold */
      font-family: Pretendard;
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 700;
      line-height: 142.9%; /* 2.0006rem */
      letter-spacing: 0.0203rem;
    }

    > input {
      width: 100%;
      display: flex;
      padding: 1.2rem 1.6rem;
      align-items: center;
      align-self: stretch;

      border-radius: 1rem;
      border: 1px solid var(--surface-secondary, rgba(112, 115, 124, 0.16));
    }
  }
`;
