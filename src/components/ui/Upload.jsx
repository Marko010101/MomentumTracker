import styled from "styled-components";

import Galery from "../../assets/svg/gallery.svg?react";
import Trash from "../../assets/svg/trash.svg?react";

const FileUploadWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 12rem;
  border: 0.1rem dashed ${(props) => (props.isError ? "var(--color-red)" : "var(--color-gray)")};
  border-radius: 0.8rem;

  & > div {
    position: relative;
    display: flex;

    & > span {
      position: absolute;
      right: -0.3rem;
      bottom: -0.3rem;
      border: 0.3px solid #6c757d;
      border-radius: 3rem;
      width: 2.4rem;
      height: 2.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: var(--color-white);
    }
  }

  & img {
    height: 8.8rem;
    width: 8.8rem;
    border-radius: 10rem;
    object-fit: cover;
    margin: 0;
  }

  & > label {
    height: 100%;
    padding: 5rem 0 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    justify-content: center;
    cursor: pointer;

    & > span {
      line-height: normal;
      font-size: var(--font-size-mini);
      color: var(--color-grayish-blue);
    }

    & > svg {
      /* margin: 0.2rem 0.5rem; */
    }
  }

  & input {
    display: none;
  }
`;

const Upload = ({ value, onChange, handleDelete, name, isError, setError }) => {
  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setError(null);
      onChange(file);
    }
  };

  const onDeleteClick = (e) => {
    e.stopPropagation();
    handleDelete();
  };

  return value ? (
    <FileUploadWrapper className="group" isError={isError}>
      <div>
        <img src={value} alt={`${name}`} />
        <span onClick={onDeleteClick}>
          <Trash />
        </span>
      </div>
    </FileUploadWrapper>
  ) : (
    <FileUploadWrapper isError={isError}>
      <label htmlFor={name}>
        <Galery />
        <input id={name} type="file" accept=".png, .jpg, .jpeg, .webp, .avif" onChange={onFileChange} />
        <span>Upload Avatar</span>
      </label>
    </FileUploadWrapper>
  );
};

export default Upload;
