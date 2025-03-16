import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  backdrop-filter: blur(1rem);
  background-color: rgba(13, 15, 16, 0.15);
  z-index: 9999;
`;
