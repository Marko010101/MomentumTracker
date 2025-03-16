import { useState } from "react";
import styled from "styled-components";

import { useComments } from "../hooks/useComments.js";
import { useCreateComment } from "../hooks/useCreateComment.js";
import Comment from "./ui/Comment.jsx";
import Loader from "./ui/Loader.jsx";
import CommentTextarea from "./ui/CommentTextarea.jsx";

const CommentsSection = ({ taskId }) => {
  const { comments, isLoading, error } = useComments(taskId);
  const [commentText, setCommentText] = useState("");
  const { mutate: createComment, isPending } = useCreateComment();

  const [openCommentId, setOpenCommentId] = useState(null);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    createComment(
      { id: taskId, text: commentText, parent_id: null },
      {
        onSuccess: () => {
          setCommentText("");
        },
      }
    );
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  const sortedComments = [...comments].sort((a, b) => b.id - a.id);
  const topLevelComments = sortedComments.filter((comment) => comment.parent_id === null);
  const commentsLength = comments.length + comments.filter((comment) => comment.sub_comments.length > 0).length;

  return (
    <StyledComments>
      <CommentTextarea
        onSubmit={handleSubmitComment}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        isPending={isPending}
        placeholder="დაწერე კომენტარი"
      />
      <CommentsHeader>
        <h5>კომენტარები</h5>
        <span>{commentsLength}</span>
      </CommentsHeader>
      <CommentsBox>
        {topLevelComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            subComment={comment.sub_comments}
            taskId={taskId}
            openCommentId={openCommentId}
            setOpenCommentId={setOpenCommentId}
          />
        ))}
      </CommentsBox>
    </StyledComments>
  );
};

export default CommentsSection;

const StyledComments = styled.section`
  padding: 4rem 4.5rem 5.2rem;
  background-color: var(--color-purple-light);
  border: 0.3px solid #ddd2ff;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`;
const CommentsHeader = styled.div`
  margin-top: 6.6rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;

  & > h5 {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-medium);
    color: var(--color-black);
  }

  & > span {
    width: 3rem;
    height: 2.2rem;
    justify-content: center;
    display: flex;
    align-items: center;
    background-color: var(--color-purple);
    border-radius: 3rem;
    font-size: var(--font-size-mini);
    color: var(--color-white);
  }
`;

const CommentsBox = styled.div`
  display: flex;
  flex-direction: column;
`;
