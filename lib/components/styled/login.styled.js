import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #6032f2;
`;

export const ButtonInner = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  //   font-family: ApercuPro;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  color: #19212e;

  svg {
    margin-right: 10px;
  }
`;

export const Button = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 4px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.3);
  }
`;

export const LogoWrapper = styled.a`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.3;
  transition: opacity 0.2s linear;

  &:hover {
      cursor: pointer;
      opacity: 0.9;
  }
`;
