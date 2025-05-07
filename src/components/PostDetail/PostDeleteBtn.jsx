import React, { useState } from "react";
import styled from "styled-components";
import DeleteModal from "../common/DeleteModal";
import { useNavigate } from "react-router-dom";

const PostDeleteBtn = ({ data }) => {
  const [renderMoadal, setRenderModal] = useState(false);
  const navigate = useNavigate();

  const deletePost = async () => {
    let password = prompt("비밀번호를 입력하세요.");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/articles/${data?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            password: password,
          }),
        }
      );

      const parsedData = await response.json();

      if (!response.ok) {
        throw new Error(parsedData.message || "something went wrong");
      }
      alert(parsedData.message);
      setRenderModal(false);
      navigate("/");
    } catch (error) {
      console.error("Error deleting article data:", error);
      alert(error.message);
      setRenderModal(false);
    }
  };
  const handleDelete = () => {
    setRenderModal(true);
  };

  const handleCancelBtn = () => {
    setRenderModal(false);
  };
  return (
    <>
      <StyledModal>
        {renderMoadal && (
          <DeleteModal
            isPost={true}
            handleDeleteBtn={deletePost}
            handleCancelBtn={handleCancelBtn}
          />
        )}
      </StyledModal>
      <StyledIcon name="trash-outline" onClick={handleDelete} />
    </>
  );
};

export default PostDeleteBtn;

const StyledIcon = styled("ion-icon")`
  font-size: 2rem;
  color: var(--icon-tertiary);
  cursor: pointer;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
