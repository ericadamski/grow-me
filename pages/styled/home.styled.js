import styled from "styled-components";
import Colors from "../../utils/colors";

export const Wrapper = styled.main`
  background-color: ${Colors.white};
  min-height: 100vh;
  width: 100vw;
  padding: 4rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  border-bottom: 2px solid ${Colors.blue};
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  transition: border, background-color 0.2s ease;
  will-change: border, background-color;
  border-radius: 2px;

  &:hover,
  &:focus {
    cursor: pointer;
    border-color: transparent;
    outline: none;
    background-color: ${Colors.blue}3f;
  }
`;

export const AvatarWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`;

export const Avatar = styled.img``;

export const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled.p`
  padding: 0;
  margin: 0;
  margin-right: 1rem;
`;
