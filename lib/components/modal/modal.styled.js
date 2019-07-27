import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  width: inherit;
  height: inherit;
  background: rgba(0, 0, 0, 0.25);
`;

export const Content = styled.div`
    min-width: 300px;
    width: 50%;
    background: white;
    z-index: 1;
    padding: 2rem;
    border-radius: 4px;
`;
