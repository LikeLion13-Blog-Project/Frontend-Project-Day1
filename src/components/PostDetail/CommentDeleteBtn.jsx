import styled from "styled-components";

const CommentDeleteBtn = ({ commentId, onCommentPosted }) => {
  const handleDelete = async () => {
    const password = prompt("비밀번호를 입력하세요");
    if (!password) {
      alert("비밀번호를 입력하지 않았습니다.");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ password }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert(error.message);
    } finally {
      onCommentPosted();
    }
  };

  return (
    <Button onClick={() => handleDelete()}>
      <StyledIcon name="trash-outline" />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.5rem;

  &:hover {
    background-color: var(--surface-primary);
  }
`;

const StyledIcon = styled("ion-icon")`
  font-size: 2rem;
  color: var(--icon-tertiary);
`;
export default CommentDeleteBtn;
