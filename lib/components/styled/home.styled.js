import styled from "styled-components";
import Colors from "../../../utils/colors";

export const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #6032f2;
  min-height: 100vh;
  width: 100vw;
  padding: 4rem;
  overflow-x: hidden;
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

export const Title = styled.h1`
  color: #ffffff;
  font-size: 4rem;
  padding: 0;
  margin: 0;
`;

export const Explanation = styled.p`
  color: #ffffff;
  font-size: 1.25rem;
  padding: 0;
  margin: 0;
  margin-bottom: 2rem;
`;

export const WrittenContentWrapper = styled.div`
  width: 100%;
  text-align: left;
  padding: 2rem;
`;

export const Anchor = styled.a`
  color: #ffffff;
  text-decoration: underline;
`;

export const TryMe = styled.button`
  padding: 0 2rem;
  height: 50px;
  border-radius: 4px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s ease;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.3);
  }
`;
