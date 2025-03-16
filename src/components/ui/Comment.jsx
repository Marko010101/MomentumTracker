import { useState } from "react";
import styled from "styled-components";

import ArrowLeft from "../../assets/svg/arrow-left.svg?react";
import Button from "./Button.jsx";
import CommentTextarea from "./CommentTextarea.jsx";
import { useCreateComment } from "../../hooks/useCreateComment.js";

const Comment = ({ comment, subComment, taskId, openCommentId, setOpenCommentId }) => {
  const [replyText, setReplyText] = useState("");
  const { mutate: createComment, isPending } = useCreateComment();

  const { author_avatar, author_nickname, id, text } = comment;
  const hasSubComment = Boolean(subComment?.length);
  const isSubComment = comment?.parent_id;
  const isTextareaOpen = openCommentId === id;

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    createComment(
      { id: taskId, text: replyText, parent_id: id },
      {
        onSuccess: () => {
          setReplyText("");
          setOpenCommentId(null); // Close text area after submitting
        },
      }
    );
  };

  return (
    <>
      <StyledComment>
        <img src={author_avatar} alt={`${author_nickname} image`} />
        <div>
          <h6>{author_nickname}</h6>
          <p>{text}</p>
          {!hasSubComment && !isSubComment && (
            <StyledButton
              onClick={(e) => {
                e.preventDefault();
                setOpenCommentId(isTextareaOpen ? null : id);
              }}
            >
              <span>
                <ArrowLeft />
              </span>
              უპასუხე
            </StyledButton>
          )}
        </div>
      </StyledComment>
      {hasSubComment && (
        <StyledSubComment isSubComment={isSubComment}>
          <Comment
            key={subComment[0].id}
            comment={subComment[0]}
            subComment={subComment[0].sub_comments}
            taskId={taskId}
            openCommentId={openCommentId}
            setOpenCommentId={setOpenCommentId}
          />
        </StyledSubComment>
      )}
      {isTextareaOpen && (
        <TextAreaWrapper>
          <CommentTextarea
            onSubmit={handleSubmitReply}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            isPending={isPending}
            placeholder="დაწერე პასუხი"
          />
        </TextAreaWrapper>
      )}
    </>
  );
};

export default Comment;

const StyledComment = styled.div`
  display: grid;
  grid-template-columns: 3.8rem 1fr;
  column-gap: 1.2rem;
  margin-top: 3.8rem;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    & > h6 {
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-small);
    }

    & > p {
      color: var(--color-grayish-blue);
    }
  }

  & > img {
    width: 3.8rem;
    height: 3.8rem;
    border-radius: 4rem;
    object-fit: cover;
  }
`;

const StyledSubComment = styled.div`
  margin-left: 5.3rem;

  & > div {
    margin: 2rem 0 1.9rem 0;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 0.2rem;
  width: max-content;
  background-color: inherit;
  border: none;
  gap: 0.6rem;
  border-radius: 0;
  color: var(--color-purple);
  font-size: var(--font-size-micro);
  padding: 0.6rem 0;
  & > svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  &:hover {
    color: var(--color-purple-soft);
  }
  &:hover svg {
    opacity: 0.6;
  }
`;

const TextAreaWrapper = styled.div`
  margin-left: 5.3rem;
`;
