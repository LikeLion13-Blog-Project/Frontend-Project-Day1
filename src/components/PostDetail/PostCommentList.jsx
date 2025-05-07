// import CommentDeleteBtn from "../postDetail/CommentDeleteBtn";

// 댓글 목록 섹션 컴포넌트
const PostCommentList = ({ commentList }) => {
  return (
    <div>
      {commentList.map((el, idx) => (
        <div key={idx}>
          <h1 style={{ fontSize: "16px" }}>{el.author}</h1>
          <div>{el.content}</div>
          <div>{el.createdAt}</div>
          {/* <CommentDeleteBtn commentId={el.id} /> */}
        </div>
      ))}
    </div>
  );
};

export default PostCommentList;
