import styled, { css } from "styled-components";
import Colors from "../../../utils/colors";

export const Wrapper = styled.main.attrs(() => ({ id: "main" }))`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => (props.white ? "#FFFFFF" : "#6032f2")};
  min-height: 100vh;
  width: 100vw;
  padding: 4rem;
  overflow-x: visible;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
`;

export const Button = styled.button`
  padding: 0.5rem 2rem;
  border-radius: 4px;
  background-color: #6032f2;
  color: #ffffff;
  border: none;
  box-shadow: 0 2.5px 5px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    cursor: pointer;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.1);
    transform: scale(1.01);
    opacity: 1;
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

export const Content = styled.div`
  max-width: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  ${Title} {
    //  font-family: ApercuPro;
    font-size: 2rem;
    color: #101620;
    margin-top: 2rem;
  }
`;

export const EventContainer = styled.div`
  position: relative;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${Title} {
    // font-family: ApercuPro;
    font-size: 1rem;
    font-weight: bold;
    color: #19212e;
  }
`;

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  height: 100%;
`;

export const Event = styled.div`
  padding: 1rem 2rem;
  border-radius: 4px;
  background-color: #edeff2;
  display: flex;
  align-items: center;
  box-shadow: 0 2.5px 5px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  margin-bottom: 20px;

  span {
    //  font-family: ApercuPro;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.86;
    color: #364256;
    white-space: pre-line;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.1);
    transform: scale(1.01);
  }
`;

export const Details = styled.div`
  position: absolute;
  top: 0;
  left: calc(100% + 50px);
  width: 300px;
  transition: all 0.75s ease-in-out;
  z-index: 1000;

  @media screen and (max-width: 1000px) {
    position: relative;
    left: 0;
  }

  ${props =>
    props.focusing &&
    css`
      left: calc(100vw - 300px);
    `}
`;

export const Detail = styled.div`
  margin-bottom: 50px;

  ${Title} {
    //  font-family: ApercuPro;
    font-size: 1rem;
    font-weight: bold;
    color: #19212e;
  }
`;

export const P = styled.p`
  //  font-family: ApercuPro;
  font-size: 1rem;
  line-height: 1.63;
  color: #7e8288;
  margin-top: 10px;
`;

export const Focus = styled.div.attrs(() => ({ id: "focus" }))`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  left: calc(100%);
  padding: 2rem;
  overflow-y: scroll;
`;

export const Outer = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  overflow: hidden;
`;

export const CreateWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
  transition: all 0.2s ease;
`;

export const CreateOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: rgba(0, 0, 0, 0.4);
`;

export const CreateDialog = styled.div`
  height: 100%;
  width: 400px;
  padding: 2rem;
  background: #ffffff;
`;
