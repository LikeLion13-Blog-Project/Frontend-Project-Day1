import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PostEditBtn = ({ data }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/write", { state: { post: data } });
  };
  return <StyledIcon name="pencil-outline" onClick={handleEdit} />;
};

export default PostEditBtn;

const StyledIcon = styled("ion-icon")`
  font-size: 2rem;
  color: var(--icon-tertiary);
  cursor: pointer;
`;
