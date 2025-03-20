import React from "react";
import { LuLoaderCircle } from "react-icons/lu";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: max-content;
  padding: 0.3rem;
  animation: ${spin} 1s linear infinite;
  color: ${({ color }) => color};
`;

const LoaderMini = ({ color = "var(--color-gray)" }) => {
  return (
    <SpinnerWrapper color={color}>
      <LuLoaderCircle />
    </SpinnerWrapper>
  );
};

export default LoaderMini;
