import styled from "styled-components";

const CommentDeleteBtn = ({ commentId }) => {
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
            // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ password }),
        }
      );

      if (!response.ok) {
        throw new Error("댓글 삭제 실패");
      }

      alert("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  return <Button onClick={() => handleDelete}>삭제</Button>;
};

const Button = styled.button``;

export default CommentDeleteBtn;
